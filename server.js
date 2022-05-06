//Start of the Node Express Template
const express = require("express");
const int = require("./public/interaction");
const axios  = require("axios");
const app = express();

const v1 = express.Router();

app.use(express.json)
app.use(express.urlencoded({extended:true}));

app.use("/slack/v1", v1);

// Make all the files in 'public' available
app.use(express.static("public"));

// Static Home Route
app.get("/", (req, res) => {
  req.sendFile(__dirname + "/views/404.html");
});

v1.post("/interactive", (req,res) => {
  console.log(req.body)
  res.sendStatus(200)
});

v1.post("/clear",(req,res) => {
  console.log(req.body)
  res.status(200).send(req)
});

v1.post("/auth", (req,res) => {
  console.log(req.body)
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});