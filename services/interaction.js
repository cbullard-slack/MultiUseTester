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

let deleteMessages = async (channelId) => {
  const data = await axios
    .get("https://slack.com/api/conversations.list")
    .catch((err) => {
      console.error(err);
    });
  console.log(data);
};

module.exports = {
  deleteMessages,
};
