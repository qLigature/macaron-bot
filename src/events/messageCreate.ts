import {Client, Message, TextChannel, Webhook} from 'discord.js';

module.exports = async (client: Client, message: Message) => {
    
    if (message.content.toLowerCase().includes(":baldmeltypet:")) {
        message.delete();
        
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
        content: message.content,
    });

    }
}
