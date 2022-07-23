/* eslint-disable @typescript-eslint/no-explicit-any */
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import envTokens from './config/env-check';
import * as commandModules from './commands';

// type Command = {
//   data: any;
// };

const commands: any = [];

const { CLIENT_TOKEN, CLIENT_ID, GUILD_ID } = envTokens;

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
