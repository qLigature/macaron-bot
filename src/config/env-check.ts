import dotenv from 'dotenv';
dotenv.config();
<<<<<<< HEAD
const { CLIENT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

if (!CLIENT_TOKEN || !CLIENT_ID || !GUILD_ID) {
  throw new Error('Missing environment variables!');
=======

const { CLIENT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

if (!CLIENT_TOKEN || !CLIENT_ID || !GUILD_ID) {
  throw new Error(
    'Missing environment variables! Please check your .env file and try again.',
  );
>>>>>>> 493784d7a71f517c7643a2e74da64eeb2a60370c
}

const envTokens: Record<string, string> = {
  CLIENT_TOKEN,
  CLIENT_ID,
  GUILD_ID,
};

export default envTokens;
