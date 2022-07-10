/* eslint-disable @typescript-eslint/no-explicit-any */
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import envTokens from './config/env-check';
import * as commandModules from './commands';

type Command = {
  data: any;
};

const { DISCORD_TOKEN, CLIENT_TOKEN, GUILD_ID } = envTokens;
const commands: any = [];

for (const module of Object.values<Command>(commandModules)) {
  commands.push(module.data);
}

const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);

rest
  .put(Routes.applicationGuildCommands(CLIENT_TOKEN, GUILD_ID), {
    body: commands,
  })
  .then(() => {
    console.log('Macaron has successfully registered commands!');
  })
  .catch(console.error);
