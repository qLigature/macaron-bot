import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { emojis } from '../config/config.json';

export const data = new SlashCommandBuilder()
  .setName('baldworship')
  .setDescription('a bless from bald harugo characters');

export async function execute(interaction: CommandInteraction) {
  return interaction.reply(
    `May the light of emotes shine through the forest of bald ${emojis.baldmikageshock}`,
  );
}
