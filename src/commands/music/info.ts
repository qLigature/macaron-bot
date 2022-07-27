import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('info')
    .setDescription('Displays info about the currently playing song')

export const execute =  async (interaction: CommandInteraction) => {
    const queue = interaction.client.player.getQueue(interaction.guildId!);

    if (!queue)
      return await interaction.reply('Beep Boop! No song detected.');

    const song = queue.current;


    await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: 'Track Info' })
          .setTitle(`${song.title}`)
          .setURL(`${song.url}`)
          .setThumbnail(song.thumbnail)
          .setDescription(`Currently Playing [${song.title}](${song.url})`),
      ],
    });
  }
