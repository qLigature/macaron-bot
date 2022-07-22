import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { images } from '../../config/config.json';

export const data = new SlashCommandBuilder()
  .setName('harugang')
  .setDescription('A family picture of harumaki gohan server');

export async function execute(interaction: CommandInteraction) {
  return interaction.reply(images.harugang);
}
