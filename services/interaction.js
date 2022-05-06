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
    .get(`https://multiusetester.herokuapp.com/slack/v1/test`,{ headers: axiosEncodedHeaderparams, params: { channel: channelId } })
    .catch((err) => {
      console.error(err);
    });
    try {
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  
};

//https://slack.com/api/conversations.history

module.exports = {
  deleteMessages,
};
