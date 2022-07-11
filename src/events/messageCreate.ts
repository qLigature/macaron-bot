import {Client, Message, TextChannel, Webhook} from 'discord.js';
//import {getMap} from '../util/emojiMap';

module.exports = async (client: Client, message: Message) => {
    
    if (message.content.toLowerCase().includes(":baldmeltypet:")) {

        if (message.guild?.me?.permissions.has("MANAGE_MESSAGES")) {
            message.delete()
        }
        
        //const emojiMap = getMap();

        //const newMsg = message.content.replace(/:baldmeltypet:/gi, emojiMap.get('baldmeltypet'))
        const newMsg = message.content;
        const channel = message.channel as TextChannel;
        const webhooks = await channel.fetchWebhooks();
        let webhook = webhooks.find((w) => w.token != null);

        if (!webhook) {
            webhook = await channel.createWebhook('Bald Macaron', {
            avatar: client.user?.displayAvatarURL(),
        });
    }

    return await webhook!.send({
        avatarURL: message.author.displayAvatarURL(),
        username: message.author.username,
        content: newMsg,
    });

    }
}
