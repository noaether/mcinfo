const Discord = require(`discord.js`);
const fetch = require(`node-fetch`);
const { json } = require("express");

module.exports.run = async (client, msg, args) => {
  try {
    const ping = await fetch(
      `https://api.minetools.eu/ping/${args[0]}/25565`
    )
      .then((res) => res.json())
      .then((json) => json.latency);

    // Embed Message
    const pingEmbed = new Discord.MessageEmbed()
      .setThumbnail(`https://eu.mc-api.net/v3/server/favicon/${args[0]}`)
      .setColor(`#0099ff`)
      .addField(`Ping`, ping + ` ms`)
      .setFooter(`Made with love by Pocoyo`, ` `);

    msg.channel.send(pingEmbed);
  } catch(e) {

    console.log(e);

    const errorEmbed = new Discord.MessageEmbed()
      .setColor(`#FF0000`)
      .setTitle(`Erreur`)
      .addField(
        `Une erreur est survenue`,
        `Nous n'avons pas réussi à rejoindre le serveur, soit celui-ci est hors-ligne, ou vous avez la mauvaise IP`
      )
      .setFooter(`Made with love by Pocoyo`, ` `);

      msg.channel.send(errorEmbed)
  }
};

module.exports.help = {
  name: `ping`,
};
