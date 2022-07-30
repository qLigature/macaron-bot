import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, TextChannel } from 'discord.js';
import { setWebhook } from '../../util/set-webhook';

export const data = {
  build: new SlashCommandBuilder()
    .setName('yunyah')
    .setDescription('is unigory part of zutto mayonaka cinama universe'),
  info: { category: 'Fun', emoji: '🕵️' },
};

export async function execute(interaction: CommandInteraction) {
  const channel = (await interaction.client.channels.fetch(
    interaction.channel!.id,
  )) as TextChannel;

  const webhook = await setWebhook(interaction.client, channel);

  // TODO: figure out how to bypass mandatory reply for interactions when sending webhook
  interaction.reply('​');
  await interaction.deleteReply();

  return await webhook!.send({
    avatarURL: interaction.client.user!.defaultAvatarURL,
    username: 'yunyah',
    content: 'i am a fake yumyah sorr',
  });
}
