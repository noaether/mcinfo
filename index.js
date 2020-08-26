const Discord = require("discord.js");

const fs = require("fs");
const FreshDB = require("fresh.db");
const emoji = require("emoji-log");
const loop = require("repeat");
const config = require("./config.json");
const keepAlive = require("./server.js");

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
        "The required permission to change this setting is Administrator." +
          "\n" +
          "La permission requise pour changer cette confirguration est Administrateur"
      );
    }

    if (args[0] === "en") {
      db.set(msg.guild.id, args[0]);
      msg.channel.send(
        "The chosen language is **english**. Thank you for using MCINFO !"
      );
      return;
    } else if (args[0] === "fr") {
      db.set(msg.guild.id, args[0]);
      msg.channel.send(
        "Le language choisit est **français**. Merci d'utiliser MCINFO !"
      );
      return;
    } else if (args[0] === "es") {
      db.set(msg.guild.id, args[0]);
      msg.channel.send(
        "El idioma elegido es el español. ¡Gracias por usar MCINFO!"
      );
    } else {
      msg.channel.send("Invalid argument" + "\n" + "Argument invalide" + "\n" + "Argumento no válido");
      return;
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
  setTimeout(function () {
    const channel = guild.channels.cache.find(
      (channel) =>
        channel.type === "text" &&
        channel.permissionsFor(guild.me).has("SEND_MESSAGES")
    );
    channel.send(
      "Hey ! Thanks for adding me on your server ! Choose your language by doing **~lang en** (for english), or **~lang fr** (for french)" +
        "\n" +
        "Salut ! Merci de m'avoir ajouté sur votre serveur ! Choissisez votre language en envoyant **~ lang en** (pour anglais) ou **~lang fr** (pour français) !"
    );
    console.log("New server joined !");
  }, 3000);
});

keepAlive();

client.login(process.env.TOKEN);
