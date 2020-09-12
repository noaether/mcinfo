const Discord = require("discord.js");

const fs = require("fs");
const FreshDB = require("fresh.db");
const emoji = require("emoji-log");
const loop = require("repeat");
const config = require("./config.json");
const keepAlive = require("./server.js");
const { Webhook, MessageBuilder } = require('discord-webhook-node');

const hook = new Webhook(process.env.WEBHOOK);
let db = new FreshDB();
const client = new Discord.Client();
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
client.commands = new Discord.Collection();
let date_ob = new Date();

// COMMAND HANDLER

const loadCommands = (dir = "./commands/") => {
  fs.readdirSync(dir).forEach((dirs) => {
    const commands = fs
      .readdirSync(`${dir}/${dirs}/`)
      .filter((files) => files.endsWith(".js"));

    for (const file of commands) {
      const getFileName = require(`${dir}/${dirs}/${file}`);
      client.commands.set(getFileName.help.name, getFileName);
      console.emoji(
        "✅ ",
        ` : ${getFileName.help.name} --- ${getFileName.help.language}`
      );
    }
  });
};

loadCommands();

// BOT - ON READY

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}! ${date_ob}`);
  client.user.setActivity("~lang fr/en/es");
});

// BOT - ON MESSAGE

client.on("message", async (msg) => {
  if (!msg.content.startsWith(config.prefix)) return;

  let prefix = config.prefix;

  let messageArray = msg.content.split(" ");

  let args = messageArray.slice(1);

  if (msg.content.startsWith("~lang")) {
    if (
      !msg.guild.member(msg.author).hasPermission("ADMINISTRATOR") &&
      msg.author.id !== "370367253205745667"
    ) {
      msg.channel.send(
        "The required permission to change this setting is Administrator."
      );
    }
    
    switch(args[0]) {
      case en:
        db.set(msg.guild.id, 'en')
        msg.channel.send(
          "The chosen language is **english**. Thank you for using MCINFO !"
          );
        break;
      case es:
        db.set(msg.guild.id,'es');
        msg.channel.send(
        "El idioma elegido es el español. ¡Gracias por usar MCINFO!"
        );
        break;
      case fr: 
      db.set(msg.guild.id, 'fr');
      msg.channel.send(
        "El idioma elegido es el español. ¡Gracias por usar MCINFO!"
      );
      default: 
        msg.channel.send('Please choose a language. The default language is **en**')
        db.set(msg.guild.id, 'en');

    }
  }

  let command = `${messageArray[0]}-${db.get(`${msg.guild.id}`)}`;

  if (!db.get(`${msg.guild.id}`)) {
    msg.channel.send(
      "Choose your language by doing **~lang en**" +
      "\n" +
      "Choissisez votre language en           envoyant **~lang fr**" +
      "\n" +
      "Elija su idioma haciendo **~lang es**"
    );
  }

  console.log("COMMAND" + command);

  let commandFile = client.commands.get(command.slice(prefix.length));
  if (commandFile) commandFile.run(client, msg, args);
});

client.on("guildCreate", (guild) => {
  const IMAGE_URL = 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/259/new-button_1f195.png';
  hook.setUsername('New Server !');
  hook.setAvatar(IMAGE_URL);

const newServerEmbed = new MessageBuilder()
.setTitle('New Server Joined !')
.addField('New server', guild.name)
.setColor('#00b0f4')
.setTimestamp();

hook.send(newServerEmbed);


  setTimeout(function() {
    const channel = guild.channels.cache.find(
      (channel) =>
        channel.type === "text" &&
        channel.permissionsFor(guild.me).has("SEND_MESSAGES")
    );
    channel.send(
      "Hey ! Thanks for adding me on your server ! Choose your language by doing **~lang en**" +
      "\n" +
      "Salut ! Merci de m'avoir ajouté sur votre serveur ! Choissisez votre language en envoyant **~lang fr** (pour français) !" + '\n' + 
      "¡Hola! ¡Gracias por agregarme a su servidor! ¡Elija su idioma enviando **~lang es** (para español)"
    );
    console.log("New server joined !");
  }, 3000);
});

keepAlive();

client.login(process.env.TOKEN);

