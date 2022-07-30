/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import envTokens from './config/env-check';
import * as path from 'path';
import * as recursive from 'recursive-readdir';

export const deployCommands = async function (client: Client) {
  const commandFolderPath = path.join(__dirname, 'commands');

  recursive.default(commandFolderPath, async (err: any, files: any) => {
    if (err) console.error(err);
    const jsfiles = files.filter((f: any) => f.split('.').pop() === 'js');
    if (jsfiles.length <= 0) {
      return;
    }

    console.log(`\nLoading ${jsfiles.length} commands!`);

    jsfiles.forEach((f: string, i: number) => {
      if (f.endsWith('index.js')) return;
      f = f.split('\\dist').pop()!;
      delete require.cache[require.resolve(`.\\${f}`)];

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const props = require(`.\\${f}`);

      if (!props || !props.data || !props.data.dist)
        return console.log(
          `[FAIL] ${
            i + 1
          }: ${f} has failed to load! Did you format the "data" variable correctly?`,
        );

      console.log(`${i + 1}: ${f} loaded!`);
      client.commands.set(props.data.dist.name, props);
    });

    await registerSlash(client);
  });
};

function registerSlash(client: Client) {
  const commands: any = [];

  const { NODE_ENV, CLIENT_TOKEN, CLIENT_ID, GUILD_ID } = envTokens;
  const iterator = Array.from(client.commands.values());
  iterator.forEach((i: any) => {
    commands.push(i.data.dist);
  });

  const rest = new REST({ version: '9' }).setToken(CLIENT_TOKEN);

  (async () => {
    try {
      if (NODE_ENV === 'production') {
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
          body: commands,
        });

        console.log(
          'Buff Macaron has successfully registered commands globally!',
        );
      } else if (NODE_ENV === 'development') {
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
          body: commands,
        });

        console.log(
          'Test Macaron has successfully registered commands locally!',
        );
      } else {
        throw new Error(
          'Macaron jumped off the tower in confusion! Please check your NODE_ENV variable and try again.',
        );
      }
    } catch (error) {
      console.error(error);
    }
  })();
}
