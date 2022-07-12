import {Client, Message, TextChannel, Webhook} from 'discord.js';
import {getMap} from '../util/emojiMap';
const regex = new RegExp(String.raw`<a?:\w+:\d+>|(?<!\\):(\w+):`, 'g')
import * as _ from 'lodash';

module.exports = async (client: Client, message: Message) => {

    // REPLACE EMOJI
    if (message.author.bot) return;
    let emojis = message.content.match(regex);

    if (emojis == null) return;

    emojis = _.uniq(emojis);
    const emojiMap = getMap();

    let newMsg = message.content;

    emojis!.forEach(async em => {
        const emoji = emojiMap.get(em)
        if (!emoji) return;
        newMsg = newMsg.replaceAll(em, emojiMap.get(em))
    });


    // send emojis
    if (newMsg == message.content) return;
    if (message.guild?.me?.permissions.has("MANAGE_MESSAGES")) {message.delete()}


    const channel = message.channel as TextChannel;
    const webhooks = await channel.fetchWebhooks();
    let webhook = webhooks.find((w) => w.token != null);

    if (!webhook) {
        webhook = await channel.createWebhook('Bald Macaron', {
            avatar: client.user?.avatarURL(),
        });
    }

    return await webhook!.send({
        avatarURL: message.author.displayAvatarURL(),
        username: message.author.username,
        content: newMsg,
    });
}

