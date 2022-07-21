import { Client } from 'discord.js';
const emojiMap = new Map();

export const getMap = () => {
  return emojiMap;
};

export const updateMap = (client: Client) => {
  client.emojis.cache
    .filter((e) => e.available!)
    .forEach((e) => emojiMap.set(`:${e.name}:`, e));
};
