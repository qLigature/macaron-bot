import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed } from 'discord.js';


export const data = new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the current playing song')

export const execute =  async (interaction: CommandInteraction) => {
    const queue = interaction.client.player.getQueue(interaction.guildId!);

    if (!queue) return await interaction.reply('Beep Boop! No songs detected.');

    queue.skip()
    interaction.reply("Song skipped")
  }
