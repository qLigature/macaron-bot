import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed } from 'discord.js';

export const data = {build: new SlashCommandBuilder()
    .setName('np')
    .setDescription('Displays info about the currently playing song'),
    info: {category: "Music", emoji: "🎵"}}

export const execute =  async (interaction: CommandInteraction) => {
    const queue = interaction.client.player.getQueue(interaction.guildId!);

    if (!queue) return await interaction.reply('Beep Boop! No song detected.');

    const song = queue.current

    await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: 'Track Info' })
          .setTitle(`${song.title}`)
          .setURL(`${song.url}`)
          .setThumbnail(song.thumbnail)
          .setDescription(`Currently Playing [${song.title}](${song.url})\n${queue.createProgressBar()}`),
      ],
    });
  }
