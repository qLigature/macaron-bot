import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export const data = {build: new SlashCommandBuilder()
  .setName('resume')
  .setDescription('Resumes the music'),
  info: {category: "Music", emoji: "▶️"}
}

export async function execute(interaction: CommandInteraction) {
  const queue = interaction.client.player.getQueue(interaction.guildId!);

  await interaction.reply('Playing something...');

  if (!queue)
    return await interaction.editReply('There are no songs in the queue');

  queue.setPaused(false);
  await interaction.editReply('Music has been resumed!');
}
