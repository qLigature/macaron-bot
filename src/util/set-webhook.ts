import { Client, TextChannel, Webhook } from 'discord.js';

export const setWebhook = async (client: Client, channel: TextChannel) => {
  const webhooks = await channel.fetchWebhooks();
  let webhook = webhooks.find((w: Webhook) => w.token != null);

  if (!webhook) {
    webhook = await channel.createWebhook('Bald Macaron', {
      avatar: client.user!.avatarURL(),
    });
  }

  return webhook;
};
