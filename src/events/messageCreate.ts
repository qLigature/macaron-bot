import { Client, Message, TextChannel, MessageEmbed } from 'discord.js';
import { getMap } from '../util/map-emoji';
import _ from 'lodash';
import { exportGuild } from '../models/guild';

module.exports = async (client: Client, message: Message) => {
  // Don't detect messages from bots or guildless messages
  if (message.author.bot) return;

  const emojiMatcher = new RegExp(String.raw`<a?:\w+:\d+>|(?<!\\):(\w+):`, 'g');

  let messageEmojis = message.content.match(emojiMatcher);
  if (messageEmojis === null) return;

  messageEmojis = _.uniq(messageEmojis);
  const emojiMap = getMap();

  const guild = await exportGuild(message.guild!.id);
  if (!guild.opt) return;

  let newMsg = message.content;

  for (const emojiText of messageEmojis) {
    const emoji = emojiMap.get(emojiText);
    if (!emoji) return;

    console.log(emoji);

    console.log(guild.blacklist);
    if (guild.blacklist.includes(`:${emoji.name}:`)) return;

    newMsg = newMsg.replaceAll(emojiText, emoji);
  }

  // send emojis
  if (newMsg == message.content) return;

  if (message.guild?.me?.permissions.has('MANAGE_MESSAGES')) {
    message.delete();
  }

  const channel = message.channel as TextChannel;
  const webhooks = await channel.fetchWebhooks();
  let webhook = webhooks.find((w) => w.token != null);

  if (!webhook) {
    webhook = await channel.createWebhook('Bald Macaron', {
      avatar: client.user?.avatarURL(),
    });
  }

  const embeds = [];
  if (message.reference != null) {
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
    content: newMsg,
    embeds: embeds,
  });
};
