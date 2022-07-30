import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { images } from '../../config/config.json';

export const data = {
  build: new SlashCommandBuilder()
    .setName('anyscript')
    .setDescription('descride your frustration to typescript'),
  info: { category: 'Fun', emoji: '❓' },
};

export async function execute(interaction: CommandInteraction) {
  return interaction.reply(
    `fuck typescript all my\nhomies hate typescript. declare\nall types as any!\n${images.anyscript}`,
  );
}
