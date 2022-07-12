import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, TextChannel } from 'discord.js';
import { images } from '../config/config.json';

export const data = new SlashCommandBuilder()
  .setName('iyowa')
  .setDescription('the kukarin girl giving you banana');

export async function execute(interaction: CommandInteraction) {
  const channel = (await interaction.client.channels.fetch(
    interaction.channel!.id,
  )) as TextChannel;

  const webhooks = await channel.fetchWebhooks();
  let webhook = webhooks.find((w) => w.token != null);

  if (!webhook) {
    webhook = await channel.createWebhook('Bald Macaron', {
      avatar: interaction.client.user!.avatarURL(),
    });
  }

  // TODO: figure out how to bypass mandatory reply for interactions when sending webhook
  interaction.reply('​');
  await interaction.deleteReply();

  return await webhook!.send({
    avatarURL: images.iyowaAvatar,
    username: 'いよわ',
    content: images.banana,
  });
}
