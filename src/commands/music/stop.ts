import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export const data = {build: new SlashCommandBuilder()
  .setName('stop')
  .setDescription('Stops the bot and clears the queue'),
  info: {category: "Music", emoji: "⏹️"}};

export async function execute(interaction: CommandInteraction) {
  const queue = interaction.client.player.getQueue(interaction.guildId!);

  await interaction.reply('Playing something...');

  if (!queue) return await interaction.editReply('Burning queue.');

  queue.destroy();
  return interaction.editReply('Macaron was thrown off the tower.');
}
