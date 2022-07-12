import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, TextChannel } from 'discord.js';
import { images } from '../config/config.json';

export const data = new SlashCommandBuilder()
  .setName('baseballjp')
  .setDescription("a Harumaki Gohan's wish in japanese");

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
    avatarURL: images.HarugoAvatar,
    username: 'はるまきごはん',
    content: `プロ野球選手になったら自分の登場曲をめっちゃキモい音だけで作った曲にしてピッチャー不安にさせたい`,
  });
}
