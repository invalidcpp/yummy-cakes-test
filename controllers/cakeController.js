const cakeSchema = require("../schemas/cakeSchema");
const commentSchema = require("../schemas/commentSchema");

/**
* @func findCakes
* @desc finds all cakes from mongoose database
* @return returns a promise, either resolving with an array of cakes or rejecting with an error message
*/
function findCakes() {
    return new Promise((resolve, reject) => {
        cakeSchema.find({})
        .then((cakes) => {
           resolve(cakes)
        }).catch((err) => {
            reject("Unable to get all cakes")
        })
    });
}

/**
* @func findCake
* @desc finds a cake by ID
* @param ID - ID of cake
* @return returns a promise, either resolving with a cake or rejecting with an error message
*/
function findCake(id){
    return new Promise((resolve, reject) => {
        cakeSchema.findOne({_id: id})
        .then((cake) => {
            resolve(cake)
        }).catch((err) => {
            reject("Unable to find cake");
        })
    })
}

/**
* @func createCake
* @desc Create a cake in the mongoose database
* @param Name - Name of the cake
* @param ImageURL - Image URL of the cake
* @param yumFactor - A numerical rating of the cake
* @return returns a promise, either resolving with a success message or rejecting with an error message
*/
function createCake(name, img, yum) {
    return new Promise(async (resolve, reject) => {
        const cake = new cakeSchema({
            name: name,
            imageURL: img,
            yumFactor: yum,
            comments: []
        })
        await cake.save((err, results) => {
            if(err) reject("Unable to create cake");
            resolve(`Created Cake: ${JSON.stringify(cake._id)}`)
        });
    })
}

/**
* @func updateCake
* @desc Update a cake in the mongoose database
* @param Comment - Comment data to add to cake
* @param Name - The name on the comment
* @param Message - The comment message
* @param Yum - The rating the comment made
* @param body - The req.body
* @param ID - The ID of the cake
* @return returns a promise, either resolving with a success message or rejecting with an error message
*/
function updateCake(comment = undefined, name = undefined, message = undefined, yum = undefined, body = undefined, id) {
    return new Promise(async (resolve, reject) => {
        if(comment) {
            const comment = new commentSchema({
                name: name,
                message: message,
                yumFactor: yum
            })
            await comment.save((err, results) => {
                if(err) reject("Unable to update cake comments")
                cakeSchema.findOneAndUpdate({_id: id}, {$push: {comments: comment}}, {new: true})
                .then((updatedCake) => { resolve("Updated cake") })
                .catch((err) => { reject("Unable to update cake comments") })
            })
    
        } else {
            if(body && body.name.length > 0 && body.imageURL.length > 0 && parseInt(body.yumFactor) > 0){
                cakeSchema.findOneAndUpdate({_id: id}, {$set: body}, {new: true})
                .then((updatedCake) => { resolve("Updated cake") })
                .catch((err) => { reject("Unable to update cake") })
            }else {
                reject("Missing required fields");
            }
        }
    })
}

/**
* @func deleteCake
* @desc delete a cake by ID
* @param ID - ID of cake
* @return returns a promise, either resolving with a success message or rejecting with an error message
*/
function deleteCake(id) {
    return new Promise(async (resolve, reject) => {
        const cake = await cakeSchema.findOne({_id: id})
        cake.delete()
        .then(() => { resolve("Deleted cake") })
        .catch((err) => {
            reject("Unable to delete cake") 
        })
    });
}

/**
* @func getComments
* @desc finds all comments on cake by ID
* @param ID - ID of cake
* @return returns a promise, either resolving with a cakes comments or rejecting with an error message
*/
function getComments(id) {
    return new Promise((resolve, reject) => {
        cakeSchema.findOne({_id: id})
        .then((cake) => { resolve(cake.comments) })
        .catch((err) => { reject("Unable to get comments") })
    })
}

// export functions
module.exports = {
    createCake,
    findCakes,
    findCake,
    updateCake,
    deleteCake,
    getComments
}