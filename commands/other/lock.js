const Discord = require("discord.js");
const fetch = require("node-fetch");
const FreshDB = require('fresh.db')

let db = new FreshDB();

module.exports.run = async (client, msg, args) => {
  db.set(msg.guild.id, "en");
};

module.exports.help = {
	name: "help-es",
  language: "es"
};
