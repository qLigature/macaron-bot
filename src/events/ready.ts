import { updateMap } from "../util/emojiMap";
import {Client} from 'discord.js';
import {connect} from 'mongoose';

module.exports = (client: Client) => {
  console.log('Beep boop! Macaron is ready to clean!');
  updateMap(client);
  connect(process.env.CON_STR!);
};
