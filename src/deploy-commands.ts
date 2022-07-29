/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import envTokens from './config/env-check';
import * as recursive from 'recursive-readdir';

export const handle_commands = async function (client: Client) {
  recursive.default(__dirname + '/commands', async (err: any, files: any) => {
    if (err) console.error(err);
    const jsfiles = files.filter((f: any) => f.split('.').pop() === 'js');
    if (jsfiles.length <= 0) {
      return;
    }

    console.log(`\nLoading ${jsfiles.length} commands!`);

    jsfiles.forEach((f: string, i: number) => {
      if (f.endsWith('index.js')) return;
      f = f.split('\\build').pop()!;
      delete require.cache[require.resolve(`.\\${f}`)];
      const props = require(`.\\${f}`);
      console.log(`${i + 1}: ${f} loaded!`);
      client.commands.set(props.data.build.name, props);
    });
    await register_slash(client);
  });
};

function register_slash(client: Client) {
  const commands: any = [];

  const { CLIENT_TOKEN, CLIENT_ID, GUILD_ID } = envTokens;
  const iterator = Array.from(client.commands.values());
  iterator.forEach((i: any) => {
    commands.push(i.data.build);
  });

  const rest = new REST({ version: '9' }).setToken(CLIENT_TOKEN);
  rest
    .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    })
    .then(() => {
      console.log('Macaron has successfully registered commands!');
    })
    .catch(console.error);
}
