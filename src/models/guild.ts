/* eslint-disable @typescript-eslint/ban-types */
import { Schema, model } from 'mongoose';

// TODO: change Object type to more accurate type
interface IGuild {
  id: string;
  opt: boolean;
  blacklist: Array<Object>;
  whitelist: Array<Object>;
  isOnBlacklist: boolean;
}

const guildSchema = new Schema<IGuild>({
  id: { type: String, required: true },
  opt: { type: Boolean, required: true },
  blacklist: Array,
  whitelist: Array,
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
    whitelist: [],
    isOnBlacklist: true,
  });
};

export const updateGuild = async (id: string, settings: Object) => {
  return guild.findOneAndUpdate({ id: id }, { $set: settings });
};
