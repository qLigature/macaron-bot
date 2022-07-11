import { Client, Message } from 'discord.js';

module.exports = (client: Client, message: Message) => {
  console.log('Beep boop');

  if (message.content === 'i am testing') {
    message.channel.send("no you're bald");
  }
};
