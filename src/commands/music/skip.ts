import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export const data = {
  build: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the current playing song'),
  info: { category: 'Music', emoji: '⏩' },
};

export const execute = async (interaction: CommandInteraction) => {
  const queue = interaction.client.player.getQueue(interaction.guildId!);

  if (!queue) return await interaction.reply('Beep Boop! No songs detected.');

  queue.skip();
  interaction.reply('Song skipped');
};
