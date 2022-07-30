import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { images } from '../../config/config.json';

export const data = {
  build: new SlashCommandBuilder()
    .setName('harugang')
    .setDescription('A family picture of harumaki gohan server'),
  info: { category: 'Image', emoji: '<:MelTina:769576145120788522>' },
};

export async function execute(interaction: CommandInteraction) {
  return interaction.reply(images.harugang);
}
