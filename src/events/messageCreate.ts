<<<<<<< HEAD
import {Client, Message} from 'discord.js';

module.exports = (client: Client, message: Message) => {
    console.log('hi');
    if (message.content === "i am testing") {
        message.channel.send("no you're not");
    }
}
=======
import { Client, Message } from 'discord.js';

module.exports = (client: Client, message: Message) => {
  if (message.content === 'i am testing') {
    message.channel.send("no you're bald");
  }
};
>>>>>>> 493784d7a71f517c7643a2e74da64eeb2a60370c
