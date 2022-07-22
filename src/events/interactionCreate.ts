import { Client, Interaction } from 'discord.js';
import * as commandModules from '../commands';

module.exports = async (client: Client, interaction: Interaction) => {
  const commands = Object(commandModules);
  if (!interaction.isCommand()) return;

  const command = commands[interaction.commandName];
  if (!command) return;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);

    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
};
