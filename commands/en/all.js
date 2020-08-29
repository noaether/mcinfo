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
    .setTitle("Help page")
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
        "An error occured",
        "Sadly, we didnt manage to get to the requested server. It either is off, or you dont have the correct adress. If you beleive this is not normal, please contact pocoyo#8008"
      )
      .setFooter("Made with love by Pocoyo", " ");
    msg.channel.send(errorEmbed);
  }
};

module.exports.help = {
  name: "all-en",
  language: "en"
};
