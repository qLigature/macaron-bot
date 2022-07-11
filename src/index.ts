import { Client, Interaction } from 'discord.js';
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

fs.readdir(
  './build/events/',
  (err: NodeJS.ErrnoException | null, files: string[]) => {
    if (err) return console.error(err);

    files.forEach((fileName) => {
      if (!fileName.endsWith('.js')) return;

      // TODO: fix this so it doesnt need to store require inside var
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const event = require(`./events/${fileName}`);

      console.log(`Macaron has successfully loaded ${fileName}!\n`);

      const eventName = fileName.split('.')[0];
      client.on(eventName, event.bind(null, client));

      delete require.cache[require.resolve(`./events/${fileName}`)];
    });
  },
);

client.login(envTokens.CLIENT_TOKEN);
