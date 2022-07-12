import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction } from 'discord.js';
import { getUserLabel } from '../util/get-user-label';

export const data = new SlashCommandBuilder()
  .setName('ilovebald')
  .setDescription('Express your love for bald')
  .addStringOption((option) =>
    option
      .setName('reason')
      .setDescription('Why do you love bald?')
      .setRequired(true),
  );

export async function execute(interaction: CommandInteraction, client: Client) {
  if (!interaction?.channelId) return;

  const channel = await client.channels.fetch(interaction.channelId);
  if (!channel || channel.type !== 'GUILD_TEXT') return;

  const { nickname } = getUserLabel(interaction);
  const reason = interaction.options.getString('reason')!;

  channel.send(`${nickname} loves bald, because ${reason}.`);

  return interaction.reply({
    content:
      `Thank you for your love for bald, ${nickname}. ` +
      "The message below will personally be sent to Harumaki Gohan's email for future reference.",
    ephemeral: true,
  });
}