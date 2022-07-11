import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { images } from '../config/config.json';

export const data = new SlashCommandBuilder()
  .setName('bonk')
  .setDescription('a picture of Giita about to slam Nana with her guitar.');

export async function execute(interaction: CommandInteraction) {
  return interaction.reply(images.giitaBonk);
}
