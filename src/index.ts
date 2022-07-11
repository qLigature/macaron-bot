import { Client, Interaction, ClientEvents } from 'discord.js';
import envTokens from './config/env-check';
import * as commandModules from './commands';
import * as fs from 'fs';

const commands = Object(commandModules);

export const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES'],
});

client.once('ready', () => {
  console.log('Beep boop! Macaron is ready to clean!');
});

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  commands[commandName].execute(interaction, client);
});

const eventFolderPath = __dirname + '/events/';

fs.readdir(eventFolderPath, async (err, files) => {
  if (err) return console.error(err);

  for (const file of files) {
    const event = await import(eventFolderPath + file);
    const eventName = file.split('.')[0];
    client.on(<keyof ClientEvents>eventName, event.default.bind(null, client));

    console.log(`Macaron has successfully loaded ${file}!`);
  }
});

client.login(envTokens.CLIENT_TOKEN);
