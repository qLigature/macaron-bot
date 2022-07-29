import { Client, Interaction } from 'discord.js';

module.exports = async (client: Client, interaction: Interaction) => {
  const commands = client.commands
  if (!interaction.isCommand()) return;

  const command = commands.get(interaction.commandName);
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
