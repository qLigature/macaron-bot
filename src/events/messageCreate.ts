import { Client, Message, TextChannel, MessageEmbed } from 'discord.js';
import _ from 'lodash';
import { exportGuild } from '../models/guild';
import { setWebhook } from '../util/set-webhook';
import { insertEmoji } from '../util/insert-emoji';

module.exports = async (client: Client, message: Message) => {
  if (!message.guild!.me?.permissions.has('MANAGE_MESSAGES')) {
    console.log('Missing permissions to manage messages!');
    return;
  }

  // Don't detect messages from bots or guildless messages (i.e. DMs)
  if (message.author.bot || !message.guild) return;

  // Don't detect emojiless messages
  const emojiMatcher = new RegExp(String.raw`<a?:\w+:\d+>|(?<!\\):(\w+):`, 'g');
  let messageEmojis = message.content.match(emojiMatcher);
  if (messageEmojis === null) return;

  // Don't detect messages from servers that did not opt in
  const { opt: guildOptedIn, blacklist } = await exportGuild(message.guild.id);
  if (!guildOptedIn) return;

  // Substitute each emoji name with the emoji itself
  messageEmojis = _.uniq(messageEmojis);
  const newMessage = insertEmoji(message.content, messageEmojis, blacklist);

  // If nothing changed, don't send a new message
  if (newMessage === message.content) return;

  message.delete();
  const channel = message.channel as TextChannel;

  const webhook = await setWebhook(client, channel);

  const embeds = [];
  if (message.reference !== null) {
    const reply = await message.fetchReference();

    if (reply.content.length > 900)
      reply.content = reply.content.substring(0, 950) + '...';
    const embed = new MessageEmbed()
      .setColor('#414987')
      .setAuthor({
        name: reply.author.tag,
        iconURL: reply.author.displayAvatarURL(),
      })
      .setDescription(
        reply.content +
          `\n\n[Jump to Message](https://discord.com/channels/${reply.guildId}/${reply.channelId}/${reply.id})`,
      );

    embeds.push(embed);
  }

  return await webhook!.send({
    avatarURL: message.author.displayAvatarURL(),
    username: message.author.username,
    content: newMessage,
    embeds: embeds,
  });
};
