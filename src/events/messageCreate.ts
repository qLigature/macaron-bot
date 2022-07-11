import {Client, Message} from 'discord.js';

module.exports = (client: Client, message: Message) => {
    console.log('hi');
    if (message.content === "i am testing") {
        message.channel.send("no you're not");
    }
}