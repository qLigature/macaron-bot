import { SlashCommandBuilder } from '@discordjs/builders';
import {
  CommandInteraction,
  MessageActionRow,
  MessageButton,
  MessageComponentInteraction,
  MessageEmbed,
} from 'discord.js';

const markdownEscape = function (text: string) {
  // eslint-disable-next-line no-useless-escape
  return text.replace(/((\_|\*|\~|\`|\|){2})/g, '\\$1');
};

const msToTime = function (s: any) {
  const ms = s % 1000;
  s = `${(s - ms) / 1000}`;
  let secs = `${s % 60}`;
  s = `${(s - (s % 60)) / 60}`;
  let mins = `${s % 60}`;
  let hrs: any = (s - (s % 60)) / 60;

  if (hrs < 1) return mins + ':' + secs;
  if (mins.length == 1) mins = `0${mins}`;
  if (secs.length == 1) secs = `0${secs}`;
  if (hrs / 10 < 1) hrs = `0${hrs}`;
  return hrs + ':' + mins + ':' + secs;
};

export const data = {
  build: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Lists the music queue'),
  info: { category: 'Music', emoji: '📜' },
};

export async function execute(interaction: CommandInteraction) {
  let queue = interaction.client.player.getQueue(interaction.guildId!);

  if (!queue) return await interaction.reply('Beep Boop! No songs detected.');

  let current = queue.current;

  let totalTime = queue.tracks.reduce(
    (num, x) => num + x.durationMS,
    current.durationMS,
  );
  const queueInfo = new MessageEmbed()
    .setTitle('Song Queue')
    .setDescription(
      `**Currently Playing: [${markdownEscape(current.title)}](${
        current.url
      })\n(\`${current.duration} | Requested by ${markdownEscape(
        current.requestedBy.username,
      )}\`)\n**\n\n${queue?.tracks
        .map(
          (song, i) =>
            `${i + 1} - [${song.title}](${song.url})\n(\`${
              song.duration
            } | Requested by ${song.requestedBy.username}\`)\n`,
        )
        .slice(0, 9)
        .join('\n')}`,
    )
    .setColor(0x503d82)
    .setFooter({ text: `Queue Length: ${msToTime(totalTime)}` });
  if (queue.tracks.length > 9) {
    queueInfo.setFooter({
      text: `And ${queue.tracks.length - 9} more | Queue Length: ${msToTime(
        totalTime,
      )}`,
    });
    buttonQueue(queueInfo, 0, 9);
  } else return interaction.reply({ embeds: [queueInfo] });

  function buttonQueue(embed: MessageEmbed, start: number, end: number) {
    let row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('Forward')
        .setLabel('Forward')
        .setStyle('PRIMARY'),
    );

    interaction.reply({ embeds: [embed], components: [row] });
    const filter = (i: MessageComponentInteraction) =>
      i.user.id === interaction.user.id;

    const collector = interaction.channel!.createMessageComponentCollector({
      filter,
      time: 30000,
    });

    collector.on('collect', async (i) => {
      if (i.customId == 'Forward') {
        start += 9;
        end += 9;
      } else {
        start -= 9;
        end -= 9;
      }

      queue = interaction.client.player.getQueue(interaction.guildId!);
      if (!queue) return;
      totalTime = queue.tracks.reduce(
        (num, x) => num + x.durationMS,
        current.durationMS,
      ); // Update total time

      if (end >= queue.tracks.length - 1) {
        // Checks if the pager is at the end of the queue
        row = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId('Back')
            .setLabel('Back')
            .setStyle('SECONDARY'),
        );
        embed.setFooter({ text: `Queue Length: ${msToTime(totalTime)}` });
      } else {
        // Checks if its in the middle
        embed.setFooter({
          text: `And ${
            queue.tracks.length - 9 - start
          } more | Queue Length: ${msToTime(totalTime)}`,
        });
        row = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId('Back')
            .setLabel('Back')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('Forward')
            .setLabel('Forward')
            .setStyle('PRIMARY'),
        );
      }

      if (start < 9) {
        // (Probably wont happen but better safe than sorry) Checks if the start is in some weird limbo, corrects it
        start = 0;
        end = 9;
        row = row = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId('Forward')
            .setLabel('Forward')
            .setStyle('PRIMARY'),
        );
        embed.setFooter({
          text: `And ${queue.tracks.length - 9} more | Queue Length: ${msToTime(
            totalTime,
          )}`,
        });
      }

      if (queue.tracks.length <= 9) {
        // Checks to see if the queue changed to not need the pager
        start = 0;
        end = 9;
        row = new MessageActionRow();
        embed.setFooter({ text: `Queue Length: ${msToTime(totalTime)}` });
      }

      current = queue.current;

      embed.setDescription(
        `**Currently Playing: [${markdownEscape(current.title)}](${
          current.url
        })\n(\`${current.duration} | Requested by ${markdownEscape(
          current.requestedBy.username,
        )}\`)\n**\n\n${queue?.tracks
          .map(
            (song, i) =>
              `${i + 1} - [${song.title}](${song.url})\n(\`${
                song.duration
              } | Requested by ${song.requestedBy.username}\`)\n`,
          )
          .slice(start, end)
          .join('\n')}`,
      );

      i.update({ embeds: [embed], components: [row] });
    });
  }
}
