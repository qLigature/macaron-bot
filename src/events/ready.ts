import { updateMap } from "../util/emojiMap";
import {Client} from 'discord.js';
module.exports = (client: Client) => {
  console.log('Beep boop! Macaron is ready to clean!');
  updateMap(client);
};
