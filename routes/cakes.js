const path = require("path")
const router = require("express").Router();
const cakeController = require("../controllers/cakeController");

router.get("/", (req, res) => {
    // return all cakes
    cakeController.findCakes()
    .then((cakes) => {
        return res.status(200).json({cakes: cakes});
    })
    .catch((err) => {
        return res.status(500).json({error: err});
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    cakeController.findCake(id)
    .then((cake) => {
        if(cake == null) throw "Missing cake";
        return res.status(200).render("cake.html", { cake: cake })
    })
    .catch((err) => { 
        return res.status(404).send(`404 - cake ID: ${id} doesn't exist. Redirecting... <script> setTimeout(function () {
            window.location = "/";
         }, 2000) </script>`)
     })
});

router.post("/", (req, res) => {
    // add a cake to db
    if(req.body.name && req.body.imageURL && req.body.yumFactor){
        cakeController.createCake(req.body.name, req.body.imageURL, req.body.yumFactor)
        .then((response) => { return res.status(200).json({success: response}) })
        .catch((err) => { return res.status(500).json({error: err}) })
    } else {
        return res.status(400).json({error: "Missing Parameters"});
    } 
});


router.put("/:id", (req, res) => {
    const id = req.params.id;
    // edit cake by ID
    if(req.body.comment){
        cakeController.updateCake(req.body.comment, req.body.comment.name, req.body.comment.message, req.body.comment.yumFactor, req.body, id)
        .then((response) => { return res.status(200).json({success: response}) })
        .catch((err) => { return res.status(500).json({error: err}) })
    }else {
        cakeController.updateCake(undefined, undefined, undefined, undefined, req.body, id)
        .then((response) => { return res.status(200).json({success: response}) })
        .catch((err) => { return res.status(500).json({error: err}) })
    }
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    // delete cake by id
    cakeController.deleteCake(id)
    .then((response) => { return res.status(200).json({success: response}) })
    .catch((err) => { return res.status(500).json({error: err}) })
});

router.get("/:id/comments", (req, res) => {
    const id = req.params.id;
    cakeController.getComments(id)
    .then((comments) => { return res.status(200).json({comments: comments}) })
    .catch((err) => { return res.status(500).json({error: err}) })
})


module.exports = router;