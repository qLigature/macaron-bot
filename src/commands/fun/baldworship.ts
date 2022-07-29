import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { emojis } from '../../config/config.json';

export const data = {build: new SlashCommandBuilder()
  .setName('baldworship')
  .setDescription('a bless from bald harugo characters'),
  info: {category: "Fun", emoji: "<:baldmikageshock:976646227888336906>"}};

export async function execute(interaction: CommandInteraction) {
  return interaction.reply(
    `May the light of emotes shine through the forest of bald ${emojis.baldmikageshock}`,
  );
}
