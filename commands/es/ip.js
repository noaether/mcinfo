const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, msg, args) => {
  let verification = await fetch("https://api.mcsrvstat.us/2/" + args[0])
    .then((res) => res.json())
    .then((json) => json.online);

  try {
    let ip = await fetch("https://api.mcsrvstat.us/2/" + args[0])
      .then((res) => res.json())
      .then((json) => json.ip);

    const ipEmbed = new Discord.MessageEmbed ()
      .setColor ("# FF00FF")
      .setImage (`https://eu.mc-api.net/v3/server/favicon/${args[0]}`)
      .addField ("IP", ip)
      .setFooter ("Hecho con amor por Pocoyó", "");

    msg.channel.send(ipEmbed);
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
	name: "ip-es",
  language: "es"
};
