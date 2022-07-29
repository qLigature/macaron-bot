import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export const data = {
  build: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pauses the music'),
  info: { category: 'Music', emoji: '⏸️' },
};

export async function execute(interaction: CommandInteraction) {
  const queue = interaction.client.player.getQueue(interaction.guildId!);

  await interaction.reply('Playing something...');

  if (!queue)
    return await interaction.editReply('Beep boop! No song detected.');

  queue.setPaused(true);
  await interaction.editReply(
    'Music has been paused! Use `/resume` to resume the music',
  );
}
