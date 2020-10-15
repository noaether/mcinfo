const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, msg, args) => {

  try {

    let headEmbed = new Discord.MessageEmbed()
      .setColor("#FF00FF")
      .setTitle("Minecraft Head")
      .setImage(`https://cravatar.eu/helmhead/${args[0]}`)
      .setFooter("Made with love by Pocoyo", " ");

      msg.channel.send(headEmbed);

  } catch (e) {

    const errorEmbed = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setTitle("Erreur")
      .addField(
        "An error occured",
        "Sadly, we didnt manage to get to the requested server. It either is off, or you dont have the correct username. If you beleive this is not normal, please contact pocoyo#8008"
      )
      .setFooter("Made with love by Pocoyo", " ");
    msg.channel.send(errorEmbed);
  };
};

module.exports.help = {
	name: "head-en",
  language: "en"
};

