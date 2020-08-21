const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, msg, args) => {
  let verification = await fetch("https://api.mcsrvstat.us/2/" + args[0])
    .then((res) => res.json())
    .then((json) => json.online);

  try{

    let ip = await fetch("https://api.mcsrvstat.us/2/" + args[0])
    .then((res) => res.json())
    .then((json) => json.ip);

    const ipEmbed = new Discord.MessageEmbed()
    .setColor("#FF00FF")
    .setImage("https://eu.mc-api.net/v3/server/favicon/" + args[0])
    .addField("IP" , ip)
    .setFooter("Made with love by Pocoyo", " ");

  } catch(e) {
    const errorEmbed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Erreur")
    .addField("Une erreur est survenue" , "Nous n'avons pas réussi à rejoindre le serveur, soit celui-ci est hors-ligne, ou vous avez la mauvaise IP")
    .setFooter("Made with love by Pocoyo", " ");
    msg.channel.send(errorEmbed);
  };
};

module.exports.help = {
  name: "ip",
};
