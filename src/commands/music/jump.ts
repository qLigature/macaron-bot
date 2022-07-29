import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed } from 'discord.js';

export const data = {build: new SlashCommandBuilder()
    .setName('jump')
    .setDescription('Jumps to a specific songs (skips all the songs between)')
    .addNumberOption(option =>
		option.setName('track')
			.setDescription('The TRACK NUMBER you would like to jump to')
            .setRequired(true)),
    info: {category: "Music", emoji: "⏭️"}};
export const execute =  async (interaction: CommandInteraction) => {
    const queue = interaction.client.player.getQueue(interaction.guildId!);

    if (!queue) return await interaction.reply('Beep Boop! No song detected.');

    const trackNum = interaction.options.getNumber("track");

    if (trackNum! < 0 || trackNum! > queue.tracks.length) return interaction.reply("Beep Boop! This is not a valid track!");
    
    interaction.reply(`Skipped to **${queue.tracks[trackNum! - 1].title}**`)
    queue.skipTo(trackNum! - 1)
  }
