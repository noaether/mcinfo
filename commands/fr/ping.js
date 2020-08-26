const Discord = require(`discord.js`);
const fetch = require(`node-fetch`);
const { json } = require("express");

module.exports.run = async (client, msg, args) => {
  try {
    const ping = await fetch(`https://api.minetools.eu/ping/${args[0]}/25565`)
      .then((res) => res.json())
      .then((json) => json.latency);

    if(!ping) {
    const errorEmbed = new Discord.MessageEmbed()
      .setColor(`#0000FF`)
      .setTitle(`Erreur`)
      .addField(
        `Une erreur est survenue`,
        `Nous n'avons pas réussi à rejoindre le serveur, soit celui-ci est hors-ligne, ou vous avez la mauvaise IP`
      )
      .setFooter(`Made with love by Pocoyo`, ` `);

    msg.channel.send(errorEmbed);
    return;
    }

    if(json.error) {
    const errorEmbed = new Discord.MessageEmbed()
      .setColor(`#0000FF`)
      .setTitle(`Erreur`)
      .addField(
        `Une erreur est survenue`,
        `Nous n'avons pas réussi à rejoindre le serveur, soit celui-ci est hors-ligne, ou vous avez la mauvaise IP`
      )
      .setFooter(`Made with love by Pocoyo`, ` `);

    msg.channel.send(errorEmbed);
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
      .setColor(`#0000FF`)
      .setTitle(`Erreur`)
      .addField(
        `Une erreur est survenue`,
        `Nous n'avons pas réussi à rejoindre le serveur, soit celui-ci est hors-ligne, ou vous avez la mauvaise IP`
      )
      .setFooter(`Made with love by Pocoyo`, ` `);

    msg.channel.send(errorEmbed);
  }
};

module.exports.help = {
	name: "ping-fr",
  language: "fr"
};
