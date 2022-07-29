import { Player } from 'discord-player';

declare module 'discord.js' {
  export interface Client {
    player: Player;
  }

  export interface GuildMember {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    voice: any;
  }
}
