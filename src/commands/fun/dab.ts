import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, TextChannel } from 'discord.js';
import { emojis, images } from '../../config/config.json';
import { setWebhook } from '../../util/set-webhook';

export const data = new SlashCommandBuilder()
  .setName('dab')
  .setDescription('dab the hell out of someone')
  .addStringOption((option) =>
    option
      .setName('person')
      .setDescription('who do you want to dab?')
      .setRequired(true),
  );

export async function execute(interaction: CommandInteraction) {
  const channel = (await interaction.client.channels.fetch(
    interaction.channel!.id,
  )) as TextChannel;

  const webhook = await setWebhook(interaction.client, channel);

  const dabbed = interaction.options.getString('person')!;

  // TODO: figure out how to bypass mandatory reply for interactions when sending webhook
  interaction.reply('​');
  await interaction.deleteReply();

  webhook!.send({
    avatarURL: images.snail,
    username: 'RoboSnail Chan',
    content: `${dabbed}`,
  });

  return await webhook!.send({
    avatarURL: images.snail,
    username: 'RoboSnail Chan',
    content: `${emojis.dabsnail}`,
  });
}
