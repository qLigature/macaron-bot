import {Client, Message, TextChannel, MessageEmbed} from 'discord.js';
import {getMap} from '../util/map-emoji';
const regex = new RegExp(String.raw`<a?:\w+:\d+>|(?<!\\):(\w+):`, 'g')
import * as _ from 'lodash';
import {exportGuild} from '../models/guild';

module.exports = async (client: Client, message: Message) => {
    // REPLACE EMOJI
    if (message.author.bot) return;
    if (message.channel.type === "DM") return;
    let emojis = message.content.match(regex);

    if (emojis == null) return;

    emojis = _.uniq(emojis);
    const emojiMap = getMap();

    let newMsg = message.content;

    for (var i = 0; i < emojis.length; i++) {
        let em = emojis[i]
        const emoji = emojiMap.get(em)
        if (!emoji) return;

        const guild = await exportGuild(emoji.guild.id)

        console.log(guild.blacklist)
        if (!guild.opt || guild.blacklist.includes(`:${emoji.name}:`)) return 

        newMsg = newMsg.replaceAll(em, emojiMap.get(em))
    }

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

    let embeds = [];
    if (message.reference != null) {
        const reply = await message.fetchReference();

        if (reply.content.length > 900) reply.content = reply.content.substring(0, 950) + "..."
        const embed = new MessageEmbed()
        .setColor("#414987")
        .setAuthor({name: reply.author.tag, iconURL: reply.author.displayAvatarURL()})
        .setDescription(reply.content + `\n\n[Jump to Message](https://discord.com/channels/${reply.guildId}/${reply.channelId}/${reply.id})`)
        embeds.push(embed)

    }

    return await webhook!.send({
        avatarURL: message.author.displayAvatarURL(),
        username: message.author.username,
        content: newMsg,
        embeds: embeds
    });
}

