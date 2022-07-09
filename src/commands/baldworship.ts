import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('baldworship')
  .setDescription('a bless from bald harugo characters');

export async function execute(interaction: CommandInteraction) {
  return interaction.reply(
    'May the light of emotes shine through the forest of bald <:baldmikageshock:976646227888336906>',
  );
}
