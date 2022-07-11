import { Client, ClientEvents } from 'discord.js';
import envTokens from './config/env-check';
import * as fs from 'fs';

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

const eventFolderPath = __dirname + '/events/';

fs.readdir(eventFolderPath, async (err, files) => {
  if (err) return console.error(err);

  for (const file of files) {
    const event = await import(eventFolderPath + file);
    const eventName = file.split('.')[0];

    if (eventName === 'ready') {
      client.once('ready', event.default.bind(null, client));
    } else {
      client.on(
        <keyof ClientEvents>eventName,
        event.default.bind(null, client),
      );
    }

    console.log(`Macaron has successfully loaded ${file}!`);
  }
});

client.login(envTokens.CLIENT_TOKEN);