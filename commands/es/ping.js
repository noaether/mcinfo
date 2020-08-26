const Discord = require(`discord.js`);
const fetch = require(`node-fetch`);
const { json } = require("express");

module.exports.run = async (client, msg, args) => {
  try {
    const ping = await fetch(`https://api.minetools.eu/ping/${args[0]}/25565`)
      .then((res) => res.json())
      .then((json) => json.latency);

    if(!ping) {
      throw 'Error'
    return;
    }

    if(json.error) {
      throw 'Error'
    return;
    }

    // Embed Message
    const pingEmbed = new Discord.MessageEmbed()
      .setImage(`https://eu.mc-api.net/v3/server/favicon/${args[0]}`)
      .setColor(`#FF00FF`)
      .addField(`Ping`, ping + ` ms`)
      .setFooter(`Hecho con amor por Pocoyó`, ` `);

    msg.channel.send(pingEmbed);
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
	name: "ping-es",
  language: "es"
};