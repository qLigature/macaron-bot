import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { emojis } from '../../config/config.json';

export const data = new SlashCommandBuilder()
  .setName('riceball')
  .setDescription('Lures wild riceball eaters');

export async function execute(interaction: CommandInteraction) {
  return interaction.reply(emojis.baldlilihuh);
}
