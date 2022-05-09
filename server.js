//Start of the Node Express Template
const express = require("express");
const int = require("./services/interaction");
const axios = require("axios");
const app = express();
const qs = require("querystring");

const v1 = express.Router();

const application_name = "Node Multi Use App";
const webhook_url =
  "https://hooks.slack.com/services/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";

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
  const interactiveActions = body.actions;
  const responseUrl = body.response_url;
  const numberOfActions = Object.keys(interactiveActions).length;
  let action_id = "";
  console.log(body);
  if (numberOfActions > 1) {
    interactiveActions.forEach((actionBody) => {
      action_id = actionBody.action_id;
    });
  } else {
    action_id = interactiveActions[0].action_id;
  }

  switch (action_id) {
    case "decline-delete-action":
      res.sendStatus(200);
      await int.deleteEphemeralPopup(responseUrl);
      break;

    case "confirm-delete-action":
      res.sendStatus(200);
      const isMember = await int.checkUserIsMember(user_id, channel_id);
      //console.log(isMember);
      if (!isMember) await int.joinChannel(channel_id);
      const messages = await int.getAllMessages(user_id, channel_id);
      const timestamps = [];
      messages.forEach((message) => {
        console.log(message);
        timestamps.push(message.ts);
      });
      console.log(timestamps);
      await int.deleteAllMessages(timestamps, channel_id);
      await int.deleteEphemeralPopup(responseUrl);
      break;

    default:
      res.sendStatus(200);
      await int.deleteEphemeralPopup(responseUrl);
      break;
  }
});

v1.post("/clear", (req, res) => {
  console.log(req.body);
  res.status(200).send(areYouSureDelete);
});

v1.post("/auth", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

v1.post("/test-webhook", (req, res) => {
  res.status(200).send({
    delete_original: "true",
  });
  axios.post(webhook_url, webhook_payload, axiosJsonHeader);
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

const webhook_payload = {
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `This message was sent from the ${application_name} into the ${webhook_url}\n*Thanks for playing*`,
      },
    },
  ],
};

const axiosJsonHeader = {
  headers: {
    // Overwrite Axios's automatically set Content-Type
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.BOT_TOKEN,
  },
};
