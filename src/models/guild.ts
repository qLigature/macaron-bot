import { Schema, model, UpdateQuery } from 'mongoose';

interface IGuild {
  id: string;
  opt: boolean;
  blacklist: Array<string>;
  isOnBlacklist: boolean;
}

const guildSchema = new Schema<IGuild>({
  id: { type: String, required: true },
  opt: { type: Boolean, required: true },
  blacklist: [String],
  isOnBlacklist: Boolean,
});

export const guild = model<IGuild>('Servers', guildSchema);

export const exportGuild = async (id: string) => {
  const res = await guild.findOne({ id: id });
  if (!res) return await createGuild(id);
  else return res;
};

export const createGuild = async (id: string) => {
  return await guild.create({
    id: id,
    opt: false,
    blacklist: [],
    isOnBlacklist: true,
  });
};

export const updateGuild = async (
  id: string,
  settings: UpdateQuery<IGuild>,
) => {
  return guild.findOneAndUpdate({ id: id }, settings);
};
