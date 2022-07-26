import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, TextChannel } from 'discord.js';
import { emojis, images } from '../../config/config.json';
import { setWebhook } from '../../util/set-webhook';

export const data = new SlashCommandBuilder()
  .setName('dab')
  .setDescription('dabbing the hell out of kyara');

export async function execute(interaction: CommandInteraction) {
  const channel = (await interaction.client.channels.fetch(
    interaction.channel!.id,
  )) as TextChannel;

  const webhook = await setWebhook(interaction.client, channel);

  // TODO: figure out how to bypass mandatory reply for interactions when sending webhook
  interaction.reply('​');
  await interaction.deleteReply();

  webhook!.send({
    avatarURL: images.snail,
    username: 'RoboSnail Chan',
    content: `<@519292820721238027>`,
  })

  return await webhook!.send({
    avatarURL: images.snail,
    username: 'RoboSnail Chan',
    content: `${emojis.dabsnail}`,
  });
}
