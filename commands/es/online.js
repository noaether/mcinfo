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
        "Jugadores en línea",
        `${onlineNow}/${onlineMax} están en línea en ` + args[0]
      )
      .setFooter("Hecho con amor por Pocoyó", " ");

    msg.channel.send(onlineEmbed);
  } catch (e) {
    const errorEmbed = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setTitle("Erreur")
      .addField(
        "Ocurrió un error",
        "Lamentablemente, no logramos llegar al servidor solicitado. O está apagado o no tiene la dirección correcta. Si cree que esto no es normal, comuníquese con Pocoyo#8008"
      )
      .setFooter("Hecho con amor por Pocoyó", " ");
    msg.channel.send(errorEmbed);
  }
};

module.exports.help = {
	name: "online-es",
  language: "es"
};
