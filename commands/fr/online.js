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
        "Joueurs en ligne",
        `${onlineNow}/${onlineMax} joueurs sont en ligne sur ` + args[0]
      )
      .setFooter("Made with love by Pocoyo", " ");

    msg.channel.send(onlineEmbed);
  } catch (e) {
    const errorEmbed = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setTitle("Erreur")
      .addField(
        "Une erreur est survenue",
        "Nous n'avons pas réussi à rejoindre le serveur, soit celui-ci est hors-ligne, ou vous avez la mauvaise IP"
      )
      .setFooter("Made with love by Pocoyo", " ");
    msg.channel.send(errorEmbed);
  }
};

module.exports.help = {
	name: "online-fr",
  language: "fr"
};
