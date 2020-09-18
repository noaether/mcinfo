const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, msg, args) => {

  try {

    let skinEmbed = new Discord.MessageEmbed()
      .setColor("#FF00FF")
      .setTitle("Skin Minecraft")
      .setImage(`https://cravatar.eu/3d/${args[0]}/250`)
      .setFooter("Hecho con amor por Pocoyó", " ");

      msg.channel.send(skinEmbed);

  } catch (e) {

    const errorEmbed = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setTitle("Erreur")
      .addField(
        "Ocurrió un error",
        "Lamentablemente, no logramos llegar al servidor solicitado. Está apagado o no tiene la dirección correcta. Si cree que esto no es normal, comuníquese con pocoyo # 8008"
      )
      .setFooter("Hecho con amor por Pocoyó", " ");
    msg.channel.send(errorEmbed);
  };
};

module.exports.help = {
	name: "skin-en",
  language: "en"
};


