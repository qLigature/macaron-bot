import dotenv from 'dotenv';
dotenv.config();
const { DISCORD_TOKEN, CLIENT_TOKEN, GUILD_ID } = process.env;

if (!DISCORD_TOKEN || !CLIENT_TOKEN || !GUILD_ID) {
  throw new Error('Missing environment variables!');
}

const config: Record<string, string> = {
  DISCORD_TOKEN,
  CLIENT_TOKEN,
  GUILD_ID,
};

export default config;
