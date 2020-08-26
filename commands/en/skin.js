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

    const errorEmbed = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setTitle("Erreur")
      .addField(
        "An error occured",
        "Sadly, we didnt manage to get to the requested server. It either is off, or you dont have the correct adress. If you beleive this is not normal, please contact pocoyo#8008"
      )
      .setFooter("Made with love by Pocoyo", " ");
    msg.channel.send(errorEmbed);
  };
};

module.exports.help = {
	name: "skin-en",
  language: "en"
};

