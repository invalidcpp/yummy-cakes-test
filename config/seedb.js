const mongoose = require("mongoose");
const cakeController = require("../controllers/cakeController");

cakePictures = [
    "https://images.immediate.co.uk/production/volatile/sites/2/2019/04/Choc-Fudge-Cake-b2d1909.jpg?quality=45&resize=768,574",
    "https://img.taste.com.au/mPye20Yz/taste/2016/11/amazing-maltesers-cake-74777-1.jpeg",
    "https://i.ytimg.com/vi/qtlhdIfojmc/maxresdefault.jpg",
    "https://food-images.files.bbci.co.uk/food/recipes/easy_chocolate_cake_31070_16x9.jpg"
]

randomComment = [
    "What a lovely cake!",
    "This cake looks great!"
]

randomName = [
    "Jordan",
    "Philip",
    "Claudia",
    "George",
    "Frank"
]

module.exports.seedb = async function(amountofCakes, amountofComments) {
    for(var i = 0; i < amountofCakes; i++){
        await cakeController.createCake("Cake-" + i, cakePictures[Math.floor(Math.random()*cakePictures.length)], Math.floor(Math.random() * 11) / 2)
        .then(async (res) => {
            cakeID = res.replace("Created Cake: ", "");
            cakeID = JSON.parse(cakeID)
            for(var j = 0; j < amountofComments; j++) {
                const comment = {
                    "name":  randomName[Math.floor(Math.random()*randomName.length)],
                    "message": randomComment[Math.floor(Math.random()*randomComment.length)],
                    "yumFactor": Math.floor(Math.random() * 11) / 2
                }
                await cakeController.updateCake(comment, comment.name, comment.message, comment.yumFactor, undefined, cakeID.toString())
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
}