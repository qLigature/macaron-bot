import { Client, Message } from 'discord.js';

module.exports = (client: Client, message: Message) => {
  if (message.content === 'i am testing') {
    message.channel.send("no you're bald");
  }
};
