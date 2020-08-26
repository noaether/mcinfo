const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, msg, args) => {
  const helpEmbed = new Discord.MessageEmbed()
    .setColor("#FF00FF")
    .setTitle("Página de ayuda")
    .addField("~help", "Muestra esta página de ayuda")
    .addField(
      "~online",
      "Envía el número de jugadores en línea en el servidor dado"
    )
    .addField("~ping", "Muestra el ping del servidor dado")
    .addField("~ip", "Envía la IP directa del servidor dado")
    .setFooter("Hecho con amor por Pocoyó", " ");

  msg.channel.send(helpEmbed);
};

module.exports.help = {
	name: "help-es",
  language: "es"
};
