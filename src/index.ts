import { Client, ClientEvents } from 'discord.js';
import envTokens from './config/env-check';
import * as fs from 'fs';
import { Player } from 'discord-player';
import { deployCommands } from './deploy-commands';

const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'],
});

client.player = new Player(client, {
  ytdlOptions: {
    quality: 'highestaudio',
    highWaterMark: 1 << 25,
  },
});

client.commands = new Map();
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

deployCommands(client);

client.login(envTokens.CLIENT_TOKEN);
