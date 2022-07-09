import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, TextChannel } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('yunyah')
  .setDescription('is unigory part of zutto mayonaka cinama universe');

export async function execute(interaction: CommandInteraction) {
  const channel = (await interaction.client.channels.fetch(
    interaction.channel!.id,
  )) as TextChannel;

  const webhooks = await channel.fetchWebhooks();
  let webhook = webhooks.find((w) => w.token != null);

  if (!webhook) {
    webhook = await channel.createWebhook('Nira-chan', {
      avatar: interaction.client.user!.avatarURL(),
    });
  }

  interaction.deleteReply().then(
    async () =>
      await await webhook!.send({
        content: 'yumyaaaaaaah',
        username: 'yunyah',
        avatarURL: interaction.client.user!.defaultAvatarURL,
      }),
  );

  return interaction.reply('<:baldlilihuh:974796458651971585>');
}
