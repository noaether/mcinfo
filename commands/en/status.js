const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, msg, args) => {
    if (
      msg.author.id !== `370367253205745667`
    ) {
      msg.channel.send(
        `You cannot change the status of the bot.`
      );
      return;
    } else {
      let status = msg.content.slice(8)
        client.user.setActivity(status);
    }
};

module.exports.help = {
  name: "status-en",
  language: "en"
};
