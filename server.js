//Start of the Node Express Template
const express = require("express");
const int = require("./services/interaction");
const axios = require("axios");
const app = express();
const qs = require("querystring");

const v1 = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/slack/v1", v1);

// Make all the files in 'public' available
app.use(express.static("public"));

// Static Home Route
app.get("/", (req, res) => {
  req.sendFile(__dirname + "/views/404.html");
});

v1.post("/interactive", async (req, res) => {
  const body = JSON.parse(req.body.payload);
  const user_id = body.user.id;
  const channel_id = body.channel.id;
  console.log(body);
  const isMember = await int.checkUserIsMember(user_id, channel_id);
  //console.log(isMember);
  if (!isMember) await int.joinChannel(channel_id);
  const messages = await int.getAllMessages(body.user.id, body.channel.id);
  const timestamps = [];
  messages.forEach((message) => {
    console.log(message)
    timestamps.push(message.ts)
  });
  console.log(timestamps)
  await int.deleteAllMessages(timestamps,channel_id)
  res.sendStatus(200);
});

v1.post("/clear", (req, res) => {
  console.log(req.body);
  res.status(200).send(areYouSureDelete);
});

v1.post("/auth", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

v1.get("/test", (req, res) => {
  console.log(req.query);
  res.sendStatus(200);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

// Response Templates

const areYouSureDelete = {
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: ":warning: This will delete *all messages* in this channel! :warning:\n\nAre you sure you wish to proceed?",
      },
    },
    {
      type: "divider",
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Decline",
            emoji: true,
          },
          style: "primary",
          action_id: "decline-delete-action",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Confirm",
            emoji: true,
          },
          style: "danger",
          action_id: "confirm-delete-action",
        },
      ],
    },
  ],
};
