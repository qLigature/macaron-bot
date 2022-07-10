import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('nomoresteak')
  .setDescription(
    'when you lost your steak after put it in the freezer for 2 days',
  );

export async function execute(interaction: CommandInteraction) {
  return interaction.reply(
    'My steak in duolingo is no more <:baldtina:975234600160870422>',
  );
}
