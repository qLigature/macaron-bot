import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('bonk')
  .setDescription('a picture of Giita about to slam Nana with her guitar.');

export async function execute(interaction: CommandInteraction) {
  return interaction.reply(
    'https://media.discordapp.net/attachments/708597774026801202/746950991873572914/OUR_GIRLFRIENDS_ARE_BOTH_FUCKING_DEAD.png?width=402&height=475',
  );
}
