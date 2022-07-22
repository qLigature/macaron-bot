import { Client, Message } from 'discord.js';
import { handleNonNitroEmoji } from '../handlers/handle-non-nitro-emoji';

module.exports = async (client: Client, message: Message) => {
  await handleNonNitroEmoji(client, message);
};
