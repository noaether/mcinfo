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
      .setFooter(`Made with love by Pocoyo`, ` `);

    msg.channel.send(pingEmbed);
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
	name: "ping-en",
  language: "en"
};
