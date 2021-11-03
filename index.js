const keepAlive = require(`./public/server.js`)
const Discord = require(`discord.js`);

// PACKAGES FOR THE BOT
const fs = require(`fs`);
const FreshDB = require(`fresh.db`);
const emoji = require(`emoji-log`);
const config = { prefix: `~` };
const timer = require(`@calipsa/timer`);
const { Webhook, MessageBuilder } = require(`discord-webhook-node`);

// CUSTOM OBJECTS AND PROMISES
const hook = new Webhook(process.env.WEBHOOK);
let db = new FreshDB();
const client = new Discord.Client();
client.commands = new Discord.Collection();
let timeStart = new Date().toISOString()
  .replace(/T/, ' ')
  .replace(/\..+/, '')

/*
 The following code is under MIT license and should be treated like so. Refer to legal information for more about the MIT license
*/

/*
  Bot`s code, and everything DiscordJS related
*/

// COMMAND HANDLER

const loadCommands = (dir = `./commands/`) => {
  let totalTime = 0;
  fs.readdirSync(dir).forEach((dirs) => {
    const commands = fs
      .readdirSync(`${dir}/${dirs}/`)
      .filter((files) => files.endsWith(`.js`));
    for (const file of commands) {
      let end = timer();
      const getFileName = require(`${dir}/${dirs}/${file}`);
      client.commands.set(getFileName.help.name, getFileName);
      let duration = end();
      duration = duration * 1000;
      duration = Math.round(duration);
      duration = duration / 1000;
      let partialTime = duration;
      totalTime = partialTime + totalTime;
      console.emoji(`✅ `, ` : ${getFileName.help.name} --- ${duration} ms`);
    }
  });
  totalTime = totalTime * 1000;
  totalTime = Math.round(totalTime);
  totalTime = totalTime / 1000;
  console.emoji(`🌍 `, ` : ${totalTime} ms`);
};

loadCommands();

// BOT - ON READY

client.on(`ready`, async () => {
  console.log(`Logged in as ${client.user.tag}! ${timeStart} - UTC(0)`);
  client.user.setActivity(`~lang fr/en/es`);
});

// BOT - ON MESSAGE

client.on(`message`, async (msg) => {
  if (!msg.content.startsWith(config.prefix)) return;

  let prefix = config.prefix;

  let messageArray = msg.content.split(` `);

  let args = messageArray.slice(1);

  // LANGUAGE MICRO PROGRAM

  if (msg.content.startsWith(`~lang`)) {
    let end2 = timer();

    if (
      !msg.guild.member(msg.author).hasPermission(`ADMINISTRATOR`) &&
      msg.author.id !== `370367253205745667`
    ) {
      msg.channel.send(
        `The required permission to change this setting is Administrator.`
      );
      return;
    }
    if (args[0] === `en`) {
      db.set(msg.guild.id, `en`);
      msg.channel.send(
        `The chosen language is **english**. Thank you for using MCINFO !`
      );
    } else if (args[0] === `es`) {
      db.set(msg.guild.id, `es`);
      msg.channel.send(
        `El idioma elegido es el español. ¡Gracias por usar MCINFO!`
      );
    } else if (args[0] === `fr`) {
      db.set(msg.guild.id, `fr`);
      msg.channel.send(
        `La langue choisie est Français ! Merci d'utiliser MCINFO!`
      );
    } else {
      msg.channel.send(
        `Please choose a valid language. The default language is **en**`
      );
      db.set(msg.guild.id, `en`);
      return;
    }
    let duration2 = end2();
    duration2 = duration2 * 1000;
    duration2 = Math.round(duration2);
    duration2 = duration2 + 1;
    duration2 = duration2 / 1000;
    console.log(`~lang-` + args[0] + ` ` + duration2 + ` ` + `ms`);
  }

  // CHECK IF SERVER HAS ASSIGNED LANGUAGE

  if (!db.get(`${msg.guild.id}`)) {
    msg.channel.send(
      `Choose your language by doing **~lang en**` +
        `\n` +
        `Choissisez votre language en envoyant **~lang fr**` +
        `\n` +
        `Elija su idioma haciendo **~lang es**`
    );
  }

  // GET THE REQUESTED COMMAND WITH REQUESTED LANGUAGE

  let command = `${messageArray[0]}-${db.get(`${msg.guild.id}`)}`;

  // TIME CALCULATING FOR DEBUGGING

  let end1 = timer();
  let commandFile = client.commands.get(command.slice(prefix.length));
  if (commandFile) {
    commandFile.run(client, msg, args);
    let duration1 = end1();
    let consoleDuration = `${duration1}`
    duration1 = duration1 * 1000;
    duration1 = Math.round(duration1);
    duration1 = duration1 + 1;
    duration1 = duration1 / 1000;
    console.log(command + ` ` + duration1 + ` ms`);
  }
});

// BOT - ON JOIN SERVER

client.on(`guildCreate`, (guild) => {
  const IMAGE_URL = `https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/259/new-button_1f195.png`;
  hook.setUsername(`New Server !`);
  hook.setAvatar(IMAGE_URL);

  const newServerEmbed = new MessageBuilder()
    .setTitle(`New Server Joined !`)
    .addField(`New server`, `${guild.name} - ${guild.invi}`)
    .addField(`Information`, `${guild.memberCount} members `)
    .setColor(`#00b0f4`)
    .setTimestamp();

  hook.send(newServerEmbed);

  setTimeout(function () {
    const channel = guild.channels.cache.find(
      (channel) =>
        channel.type === `text` &&
        channel.permissionsFor(guild.me).has(`SEND_MESSAGES`)
    );
    channel.send(
      `Hey ! Thanks for adding me on your server ! Choose your language by doing **~lang en**` +
        `\n` +
        `Salut ! Merci de m'avoir ajouté sur votre serveur ! Choissisez votre language en envoyant **~lang fr** (pour français) !` +
        `\n` +
        `¡Hola! ¡Gracias por agregarme a su servidor! ¡Elija su idioma enviando **~lang es** (para español)`
    );
    console.log(`New server joined !`);
  }, 3000);
});

client.login(process.env.TOKEN);
