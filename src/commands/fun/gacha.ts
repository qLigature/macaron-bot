import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import common from '../gacha/common.json';
import rare from '../gacha/rare.json';
import ultra from '../gacha/ultra rare.json';

export const data = new SlashCommandBuilder()
  .setName('gacha')
  .setDescription('try your luck and see how long you get malding');

const filter = () => {
  const number = Math.ceil(Math.random() * 100);
  if (number === 100) {
    return `[ULTRA] ` + ultra[Math.floor(Math.random() * ultra.length)];
  } else if (number >= 80 && number < 100) {
    return `[RARE] ` + rare[Math.floor(Math.random() * rare.length)];
  } else {
    return `[COMMON] ` + common[Math.floor(Math.random() * common.length)];
  }
};

export async function execute(interaction: CommandInteraction) {
  return interaction.reply(filter());
}