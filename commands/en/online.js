const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, msg, args) => {

  try {
    const onlineNow = await fetch(
      "https://mcapi.xdefcon.com/server/" + args[0] + "/full/json"
    )
      .then((res) => res.json())
      .then((json) => json.players);

    const onlineMax = await fetch(
      "https://mcapi.xdefcon.com/server/" + args[0] + "/full/json"
    )
      .then((res) => res.json())
      .then((json) => json.maxplayers);

    // Embed Message
    const onlineEmbed = new Discord.MessageEmbed()
      .setImage(`https://eu.mc-api.net/v3/server/favicon/${args[0]}`)
      .setColor("#FF00FF")
      .addField(
        "Players online",
        `${onlineNow}/${onlineMax} players are online on ` + args[0]
      )
      .setFooter("Made with love by Pocoyo", " ");

    msg.channel.send(onlineEmbed);
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
  }
  }
module.exports.help = {
	name: "online-en",
  language: "en"
};
