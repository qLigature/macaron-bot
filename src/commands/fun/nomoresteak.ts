import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, TextChannel } from 'discord.js';
import { emojis, images } from '../../config/config.json';
import { setWebhook } from '../../util/set-webhook';

export const data = {build: new SlashCommandBuilder()
  .setName('nomoresteak')
  .setDescription('steak is gone after 2 days putting it in the freezer'),
  info: {category: "Fun", emoji: "<:baldtina:975234600160870422>"}};

export async function execute(interaction: CommandInteraction) {
  const channel = (await interaction.client.channels.fetch(
    interaction.channel!.id,
  )) as TextChannel;

  const webhook = await setWebhook(interaction.client, channel);

  // TODO: figure out how to bypass mandatory reply for interactions when sending webhook
  interaction.reply('​');
  await interaction.deleteReply();

  return await webhook!.send({
    avatarURL: images.jillAvatar,
    username: 'Jill is chilling nearby',
    content: `My steak in duolingo is no more ${emojis.baldtina}`,
  });
}
