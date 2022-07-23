/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import envTokens from './config/env-check';
import * as commandModules from './commands';
import { Player } from 'discord-player';

type Command = {
  data: any;
};

const commands: any = [];

const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'],
});

const { CLIENT_TOKEN, CLIENT_ID, GUILD_ID } = envTokens;

client.player = new Player(client, {
  ytdlOptions: {
    quality: 'highestaudio',
    highWaterMark: 1 << 25,
  },
});

for (const module of Object.values<any>(commandModules)) {
  commands.push(module.data);
}

const rest = new REST({ version: '9' }).setToken(CLIENT_TOKEN);

rest
  .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
    body: commands,
  })
  .then(() => {
    console.log('Macaron has successfully registered commands!');
  })
  .catch(console.error);
