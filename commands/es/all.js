const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, msg, args) => {
  try {
    let info = await fetch("https://api.mcsrvstat.us/2/" + args[0])
      .then((res) => res.json())

    const ping = await fetch(`https://api.minetools.eu/ping/${args[0]}/25565`)
      .then((res) => res.json())
      .then((json) => json.latency);


  const infoEmbed = new Discord.MessageEmbed()
    .setColor("#FF00FF")
    .setTitle("Página de información")
    .setImage(`https://eu.mc-api.net/v3/server/favicon/${args[0]}`)
    .addField("IP", info.ip)
    .addField(
      "JUGADORES EN LÍNEA",
      info.players.online + '/' + info.players.max
    )
    .addField("PING", ping + " ms")
    .setFooter("Hecho con amor por Pocoyó", " ");

  msg.channel.send(infoEmbed);    
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
  name: "all-es",
  language: "es"
};