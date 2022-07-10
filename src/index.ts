import { Client, Interaction } from 'discord.js';
import envTokens from './config/env-check';
import * as commandModules from './commands';

const commands = Object(commandModules);

export const client = new Client({
  intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
});

client.once('ready', () => {
  console.log('Beep boop! Macaron is ready to clean!');
});

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  commands[commandName].execute(interaction, client);
});

client.login(envTokens.CLIENT_TOKEN);
