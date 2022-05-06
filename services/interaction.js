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

let deleteMessages = async (userId,channelId) => {
    const authed_users = ["U039C0Y3W8M"]
    console.log(`User ID parsed: ${userId}\nChannel ID parsed: ${channelId}\n\n`)
    console.log(authed_users.includes(userId))
    if (authed_users.includes(userId) != true) return
  const data = await axios
    .get("https://slack.com/api/conversations.list",axiosEncodedHeader)
    .catch((err) => {
      console.error(err);
    });
  console.log(data);
};

module.exports = {
  deleteMessages,
};
