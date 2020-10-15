const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, msg, args) => {

  try {

    let skinEmbed = new Discord.MessageEmbed()
      .setColor("#FF00FF")
      .setTitle("Skin Minecraft")
      .setImage(`https://cravatar.eu/3d/${args[0]}/250`)
      .setFooter("Made with love by Pocoyo", " ");

      msg.channel.send(skinEmbed);

  } catch (e) {
    const helpEmbed = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setTitle("Erreur")
      .addField("Une erreur est survenue", "Nous n'avons pas réussi à rejoindre le serveur Mojang, ou vous avez le mauvais pseudonyme")
      .setFooter("Made with love by Pocoyo", " ");
  };
};

module.exports.help = {
	name: "skin-fr",
  language: "fr"
};

