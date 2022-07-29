import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { emojis } from '../../config/config.json';

export const data = {
  build: new SlashCommandBuilder()
    .setName('riceball')
    .setDescription('Lures wild riceball eaters'),
  info: { category: 'Fun', emoji: '<:baldnanahuh:974796482081329182>' },
};

export async function execute(interaction: CommandInteraction) {
  return interaction.reply(emojis.baldlilihuh);
}
