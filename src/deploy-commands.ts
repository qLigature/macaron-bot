/* eslint-disable @typescript-eslint/no-explicit-any */
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import config from './config';
import * as commandModules from './commands';

type Command = {
  data: any; // ANYSCRIPT LETS GOOOOOO
};

const commands: any = [];

for (const module of Object.values<Command>(commandModules)) {
  commands.push(module.data);
}

const rest = new REST({ version: '9' }).setToken(config.DISCORD_TOKEN);

rest
  .put(Routes.applicationGuildCommands(config.CLIENT_TOKEN, config.GUILD_ID), {
    body: commands,
  })
  .then(() => {
    console.log('Macaron has successfully registered commands!');
  })
  .catch(console.error);
