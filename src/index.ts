import { Client, Interaction, Message, Intents } from 'discord.js';
import envTokens from './config/env-check';
import * as commandModules from './commands';
import * as fs from 'fs';

const commands = Object(commandModules);

export const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
});

client.once('ready', () => {
  console.log('Beep boop! Macaron is ready to clean!');
});


client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  commands[commandName].execute(interaction, client);
});

fs.readdir("./build/events/", (err: NodeJS.ErrnoException | null, files: string[]) => {
  if (err) return console.error(err);

  console.log(`Loading ${files.length} Events!\n`);
  console.log(files);
  files.forEach((f, i) => {
    if (!f.endsWith(".js")) return;

    const event = require(`./events/${f}`);

    console.log(`${i + 1}: ${f} loaded!\n`);
    console.log(event)
  
    let eventName = f.split(".")[0];

    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${f}`)];
  });
});

client.login(envTokens.CLIENT_TOKEN);
