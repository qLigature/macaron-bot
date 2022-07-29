import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { getMap } from '../../util/map-emoji';
import { exportGuild } from '../../models/guild';

export const data = {
  build: new SlashCommandBuilder()
    .setName('blocklist')
    .setDescription('Lists all emojis that are blacklisted from global use'),
  info: { category: 'Moderation', emoji: '✋' },
};

export async function execute(interaction: CommandInteraction) {
  const g = await exportGuild(interaction.guildId!);

  const serverEmojis = g.blacklist.sort();

  if (serverEmojis.length == 0)
    return interaction.reply({
      content: 'No emojis are in the blacklist',
      ephemeral: true,
    });

  const displayEmoji: any = [];
  serverEmojis.forEach((e) => {
    displayEmoji.push(getMap().get(e).toString() + ` **${e}**`);
  });

  interaction.reply('**Blacklist:**\n\n' + displayEmoji.join('\n'));
}
