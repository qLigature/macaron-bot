import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('harugang')
  .setDescription('A family picture of harumaki gohan server');

export async function execute(interaction: CommandInteraction) {
  return interaction.reply(
    'https://cdn.discordapp.com/attachments/723119279574220862/800610556133769226/HaruGang_Family_Tree_EXTENDED_1.12.png',
  );
}
