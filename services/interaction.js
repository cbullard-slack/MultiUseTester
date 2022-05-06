const axios = require("axios");

const axiosJsonHeader = {
  headers: {
    // Overwrite Axios's automatically set Content-Type
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.BOT_TOKEN,
  },
};

const axiosEncodedHeader = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Bearer " + process.env.BOT_TOKEN,
  },
};

let deleteMessages = async (userId, channelId) => {
  const authed_users = ["U039C0Y3W8M"];
  console.log(`User ID parsed: ${userId}\nChannel ID parsed: ${channelId}\n\n`);
  console.log(authed_users.includes(userId));
  if (authed_users.includes(userId) != true) return;
  const data = await axios
    .get(
      `https://slack.com/api/conversations.history?channel=${channelId}`,
      axiosEncodedHeader
    )
    .catch((err) => {
      console.error(err);
    });
  try {
    console.log(data.data);
  } catch (error) {
    console.error(error);
  }
};

let checkUserIsMember = async (userId, channelId) => {
  const response = await axios
    .get(`https://slack.com/api/users.conversations`, axiosEncodedHeader)
    .catch((err) => {
      console.error(err);
    });

  try {
    const channels = [];
    if (typeof response.data.channels !== "undefined") {
      response.data.channels.forEach((element) => {
        channels.push(element.id);
      });
    }
    console.log(
      `Channel Data: ${channels} is of type ${typeof response.data.channels}`
    );
    if (channels.includes(channelId)) return true;
    else return false;
  } catch (err) {
    console.error(err);
    return false;
  }
  //console.log(response.data.channels);
};

let joinChannel = async (channelId) => {
  const response = await axios.post(
    `https://slack.com/api/conversations.join?channel=${channelId}`,
    axiosEncodedHeader
  );
  try {
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

//https://slack.com/api/conversations.history

module.exports = {
  deleteMessages,
  checkUserIsMember,
  joinChannel,
};
