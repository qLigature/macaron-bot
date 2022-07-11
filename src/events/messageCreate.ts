import { Client, Message, TextChannel } from 'discord.js';

module.exports = async (client: Client, message: Message) => {
  // TODO: map :emotename: to <...> equivalent with emoteMap module
  if (message.content.toLowerCase().includes(':baldmeltypet:')) {
    message.delete();

    const channel = message.channel as TextChannel;
    const webhooks = await channel.fetchWebhooks();
    let webhook = webhooks.find((w) => w.token != null);

    if (!webhook) {
      webhook = await channel.createWebhook('Bald Macaron', {
        avatar: client.user?.displayAvatarURL(),
      });
    }

    const { author, content } = message;

    return await webhook!.send({
      avatarURL: author.displayAvatarURL(),
      username: author.username,
      content,
    });
  }
};
