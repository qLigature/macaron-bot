import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Displays info about the currently playing song'),
  run: async ({ client, interaction }: any) => {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue)
      return await interaction.editReply('There are no songs in the queue');

    const song = queue.current;

    await interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: 'Track Info' })
          .setTitle(`${song.title}`)
          .setURL(`${song.url}`)
          .setThumbnail(song.thumbnail)
          .setDescription(`Currently Playing [${song.title}](${song.url})`),
      ],
    });
  },
};
