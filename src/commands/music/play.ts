import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed, CommandInteraction } from 'discord.js';
import { QueryType } from 'discord-player';

// eslint-disable-next-line no-undef
export const data = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Loads songs from youtube or spotify')
  .addSubcommand((subcommand) =>
    subcommand
      .setName('song')
      .setDescription('Loads a single song from a url')
      .addStringOption((option) =>
        option
          .setName('url')
          .setDescription("the song's url")
          .setRequired(true),
      ),
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('playlist')
      .setDescription('Loads a playlist of songs from a url')
      .addStringOption((option) =>
        option
          .setName('url')
          .setDescription("the playlist's url")
          .setRequired(true),
      ),
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('search')
      .setDescription('Searches for song based on provided keywords')
      .addStringOption((option) =>
        option
          .setName('searchterms')
          .setDescription('the search keywords')
          .setRequired(true),
      ),
  );

export async function execute(interaction: CommandInteraction) {
  const guild = interaction.client.guilds.cache.get(interaction.guildId!);
  const member = guild!.members.cache.get(interaction.member!.user.id);
  const voiceChannel = member!.voice.channel;

  await interaction.reply('Playing something...');

  if (!voiceChannel)
    return interaction.editReply(
      'Beep boop! You need to be in a VC to use this command',
    );

  const queue = await interaction.client.player.createQueue(interaction.guild!);
  if (!queue.connection) await queue.connect(voiceChannel!);

  const embed = new MessageEmbed();

  //==================================================================
  // SONG
  //==================================================================
  if (interaction.options.getSubcommand() === 'song') {
    const url = interaction.options.getString('url');

    let result;
    if (url?.toLowerCase().includes("spotify.com")) {
      result = await interaction.client.player.search(url!, {
        requestedBy: interaction.user,
        searchEngine: QueryType.SPOTIFY_SONG
      })
    } else {
    result = await interaction.client.player.search(url!, {
      requestedBy: interaction.user,
      searchEngine: QueryType.YOUTUBE_VIDEO,
    });
  }

    if (result.tracks.length === 0) return interaction.editReply('No results');

    console.log(result)
    const song = result.tracks[0];
    console.log(song);
    await queue.addTrack(song);

    embed
      .setDescription(`**Track**\n**[${song.title}](${song.url})**`)
      .setThumbnail(song.thumbnail)
      .setFields({ name: `Duration`, value: `${song.duration}` });


  //==================================================================
  // PLAYLIST
  //==================================================================


  } else if (interaction.options.getSubcommand() === 'playlist') {
    const url = interaction.options.getString('url');

   
    let result;
    if (url?.toLowerCase().includes("spotify.com")) {
      result = await interaction.client.player.search(url!, {
        requestedBy: interaction.user,
        searchEngine: QueryType.SPOTIFY_PLAYLIST
      })
    } else {
    result = await interaction.client.player.search(url!, {
      requestedBy: interaction.user,
      searchEngine: QueryType.YOUTUBE_PLAYLIST,
    });
  }

    if (result.tracks.length === 0) return interaction.editReply('No results');

    const playlist = result.playlist;
    await queue.addTracks(result.tracks);
    embed
      .setDescription(
        `**${result.tracks.length} songs from [${playlist!.title}](${
          playlist!.url
        })** have been added to the Queue`,
      )

  //==================================================================
  // SEARCH
  //==================================================================

  } else if (interaction.options.getSubcommand() === 'search') {
    const url = interaction.options.getString('searchterms');
    const result = await interaction.client.player.search(url!, {
      requestedBy: interaction.user,
      searchEngine: QueryType.AUTO,
    });

    if (result.tracks.length === 0) return interaction.editReply('No results');

    const song = result.tracks[0];
    await queue.addTrack(song);

    embed
      .setDescription(
        `**[${song.title}](${song.url})** has been added to the Queue`,
      )
      .setThumbnail(song.thumbnail)
      .setFooter({ text: `Duration: ${song.duration}` });
  }

  if (!queue.playing) await queue.play();
  await interaction.editReply({
    embeds: [embed],
  });
}