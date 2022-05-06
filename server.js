//Start of the Node Express Template
const express = require("express");
const app = express();

const v1 = express.Router();

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

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});