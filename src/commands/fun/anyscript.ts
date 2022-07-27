import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { images } from '../../config/config.json';

export const data = new SlashCommandBuilder()
  .setName('anyscript')
  .setDescription('descride your frustration to typescript');

export async function execute(interaction: CommandInteraction) {
  return interaction.reply(
    // eslint-disable-next-line prettier/prettier
    `fuck typescript all my\nhomies hate typescript. declare\nall types as any!\n${images.anyscript}`,
  );
}
