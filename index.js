const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();
const Vot = new Discord.Client();
const self = new Discord.Client();
//const config = require("./config.json");

//client.config = config;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`loading event: ${eventName}`)
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`loading command: ${process.env.DISCORD_PREFIX}${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(process.env.DISCORD_TOKEN);
Vot.login(process.env.SELF_TOKEN);
self.login(process.env.SELFF_TOKEN);
//client.login(config.token);
