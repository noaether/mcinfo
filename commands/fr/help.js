const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, msg, args) => {
  const helpEmbed = new Discord.MessageEmbed()
    .setColor("#FF00FF")
    .setTitle("Page d'aide du bot MC INFO")
    .addField("~help", "Affiche cette page d'aide")
    .addField(
      "~online",
      "Affiche le nombre de joueurs connectés sur le serveur donné"
    )
    .addField("~ping", "Affiche le ping du serveur donné")
    .addField("~ip", "Affiche le ip directe du serveur donné")
    .setFooter("Made with love by Pocoyo", " ");

  msg.channel.send(helpEmbed);
};

module.exports.help = {
	name: "help-fr",
  language: "fr"
};
