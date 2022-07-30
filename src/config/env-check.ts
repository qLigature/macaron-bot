import dotenv from 'dotenv';
dotenv.config();

const { NODE_ENV, CLIENT_TOKEN, CLIENT_ID, GUILD_ID, MONGODB_URI } =
  process.env;

if (!NODE_ENV || !CLIENT_TOKEN || !CLIENT_ID || !GUILD_ID || !MONGODB_URI) {
  throw new Error(
    'Missing environment variables! Please check your .env file and try again.',
  );
}

const envTokens: Record<string, string> = {
  NODE_ENV,
  CLIENT_TOKEN,
  CLIENT_ID,
  GUILD_ID,
};

export default envTokens;
