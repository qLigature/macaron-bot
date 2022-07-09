import { Client, Intents } from "discord.js";
import config from "./config";

export const client = new Client({
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "DIRECT_MESSAGES",
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

client.once("ready", () => {
  console.log("Beep boop! Macaron is ready to clean!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  const { commandName } = interaction;

  if (commandName === "riceball") {
    return interaction.reply("<:baldlilihuh:974796458651971585>");
  }
});

client.login(config.DISCORD_TOKEN);
