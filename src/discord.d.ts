import { Player } from 'discord-player';

declare module 'discord.js' {
  export interface Client {
    player: Player;
  }
}
