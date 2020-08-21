const Discord = require("discord.js");
const client = new Discord.Client();
const fetch = require("node-fetch");
const fs = require("fs");
const config = require("./config.json");
const keepAlive = require('./server.js');

client.commands = new Discord.Collection();

let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();

const time = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);

  let jsFile = files.filter((f) => f.split(".").pop() === "js");
  if (jsFile.length <= 0) {
    console.log("Aucune commande à ce nom");
    return;
  }

  jsFile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    client.commands.set(props.help.name, props);
  });
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}! ${time}`);
  client.user.setActivity("Version Française ! Do ~en to invite the english bot !")
});

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

client.on("message", async (msg) => {
  if (!msg.content.startsWith(config.prefix || "j!")) return;

  let prefix = config.prefix

  let messageArray = msg.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  let commandFile = client.commands.get(command.slice(prefix.length));
  if (commandFile) commandFile.run(client, msg, args, time);
});

keepAlive();

client.login(process.env.TOKEN);
