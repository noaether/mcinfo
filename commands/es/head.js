const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, msg, args) => {

  try {

    let headEmbed = new Discord.MessageEmbed()
      .setColor("#FF00FF")
      .setTitle("Minecraft Jugador")
      .setImage(`https://cravatar.eu/helmhead/${args[0]}/250`)
      .setFooter("Hecho con amor por Pocoyó", " ");

      msg.channel.send(headEmbed);

  } catch (e) {

    const errorEmbed = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setTitle("Erreur")
      .addField(
        "Ocurrió un error",
        "Lamentablemente, no logramos llegar al servidor solicitado. Está apagado o no tiene el jugador correcta. Si cree que esto no es normal, comuníquese con pocoyo#8008"
      )
      .setFooter("Hecho con amor por Pocoyó", " ");
    msg.channel.send(errorEmbed);
  };
};

module.exports.help = {
	name: "head-es",
  language: "es"
};

