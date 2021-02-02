const discord = require("discord.js");
const client = new discord.Client();
require("dotenv").config();
client.login(process.env.TOKEN);
const fs = require("fs");

dispatcher = { dispatcher: null, q: [] };

const prefix = "~";

client.commands = new discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("rmh says hi!");
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "hello") {
    client.commands.get("greet").execute(message, args);
  } else if (command === "bestsong") {
    dispatcher = client.commands.get("bestsong").execute(message, args);
  } else if (command === "play") {
    if (args.length)
      client.commands.get("play").execute(dispatcher, message, args);
    else client.commands.get("resume").execute(dispatcher, message);
  } else if (command === "pause") {
    client.commands.get("pause").execute(dispatcher, message);
  } else if (command === "resume") {
    client.commands.get("resume").execute(dispatcher, message);
  } else if (command === "skip" || command === "next") {
    client.commands.get("skip").execute(dispatcher, message);
  } else if (command === "stop") {
    client.commands.get("stop").execute(dispatcher, message);
  }
});
