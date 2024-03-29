import { SlashCommandBuilder } from '@discordjs/builders';
import { Track } from 'discord-player';
import { CommandInteraction } from 'discord.js';

function shuffle(array: Array<Track>) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const data = {
  build: new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('Shuffles the song list'),
  info: { category: 'Music', emoji: '🔀' },
};

export const execute = async (interaction: CommandInteraction) => {
  const queue = interaction.client.player.getQueue(interaction.guildId!);

  if (!queue) return await interaction.reply('Beep Boop! No songs detected.');

  queue.tracks = shuffle(queue.tracks);

  interaction.reply('Queue shuffled. Check it out using `/queue`');
};
