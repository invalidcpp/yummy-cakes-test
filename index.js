const express = require("express");
const path = require("path");
const db = require("./config/db");
const seedb = require("./config/seedb");
const cakes = require("./routes/cakes");

const app = express();

app.use(express.static(path.join(__dirname, "/public")))
app.set('views', __dirname + '/public');
app.engine('html', require("ejs").renderFile);
app.set('view engine', 'html');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/cakes", cakes);

app.get("/", (req, res) => {
    return res.render("index.html")
});

app.get("/seed", async (req, res) => {
    await seedb.seedb(10, 5);
    return res.redirect("/");
});

app.listen(3000, () => {
    db.connect(); // connect to mongoose database
    console.log("Running yummy cake server on port 3000")
});