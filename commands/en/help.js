const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, msg, args) => {
  const helpEmbed = new Discord.MessageEmbed()
    .setColor("#FF00FF")
    .setTitle("Help page")
    .addField("~help", "Shows this help page")
    .addField(
      "~online <server>",
      "Sends the number of players online on the given server"
    )
    .addField("~ping <server>", "Shows the ping of the given server")
    .addField("~ip <server>", "Sends the direct IP of given server")
    .addField("~all <server>", "Sends all the information about given server")
    .addField("~skin <player>", "Sends the skin of the given player")
    .setFooter("Made with love by Pocoyo", " ");

  msg.channel.send(helpEmbed);
};

module.exports.help = {
	name: "help-en",
  language: "en"
};
