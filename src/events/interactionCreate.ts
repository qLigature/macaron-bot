import { Client, Interaction } from 'discord.js';
import * as commandModules from '../commands';

module.exports = (client: Client, interaction: Interaction) => {
  const commands = Object(commandModules);

  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  commands[commandName].execute(interaction, client);
};
