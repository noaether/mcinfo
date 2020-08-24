const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, msg, args) => {

  try {

    let uuid = await fetch("https://playerdb.co/api/player/minecraft/" + args[0])
    .then((res) => res.json())
    .then((json) => json.data.player.raw_id);

    let skinEmbed = new Discord.MessageEmbed()
      .setColor("#FF00FF")
      .setTitle("Skin Minecraft")
      .setImage("https://crafatar.com/renders/body/" + uuid)
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
  name: "skin",
};

