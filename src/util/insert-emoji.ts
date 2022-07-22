import { getMap } from '../util/map-emoji';

export const insertEmoji = (
  message: string,
  msgEmojis: RegExpMatchArray,
  blacklist: string[],
) => {
  const emojiMap = getMap();

  for (const emojiText of msgEmojis) {
    const emoji = emojiMap.get(emojiText);
    if (!emoji || blacklist.includes(`:${emoji.name}:`)) continue;

    message = message.replaceAll(emojiText, emoji);
  }
  return message;
};
