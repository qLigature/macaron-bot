import { updateMap } from '../util/map-emoji';
import { Client } from 'discord.js';
import { connect } from 'mongoose';

module.exports = (client: Client) => {
  connect(process.env.MONGODB_URI!);
  updateMap(client);

  console.log('Beep boop! Macaron is ready to clean!');
};
