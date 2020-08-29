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
    .setTitle("Page d'information")
    .addField("IP", info.ip)
    .addField(
      "ONLINE",
      info.players.online + '/'  + info.players.max
    )
    .addField("PING", ping + " ms")
    .setFooter("Made with love by Pocoyo", " ");

  msg.channel.send(infoEmbed);    
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
  name: "all-fr",
  language: "fr"
};