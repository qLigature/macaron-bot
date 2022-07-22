import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, TextChannel } from 'discord.js';
import { images } from '../../config/config.json';
import { setWebhook } from '../../util/set-webhook';

export const data = new SlashCommandBuilder()
  .setName('iyowa')
  .setDescription('the kukarin girl giving you banana');

export async function execute(interaction: CommandInteraction) {
  const channel = (await interaction.client.channels.fetch(
    interaction.channel!.id,
  )) as TextChannel;

  const webhook = await setWebhook(interaction.client, channel);

  // TODO: figure out how to bypass mandatory reply for interactions when sending webhook
  interaction.reply('​');
  await interaction.deleteReply();

  return await webhook!.send({
    avatarURL: images.iyowaAvatar,
    username: 'いよわ',
    content: images.banana,
  });
}
