import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction } from 'discord.js';
<<<<<<< HEAD
import { getUserLabel } from '../util/getUserLabel';
=======
import { getUserLabel } from '../util/get-user-label';
>>>>>>> 493784d7a71f517c7643a2e74da64eeb2a60370c

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
<<<<<<< HEAD
  if (!interaction?.channelId) {
    return;
  }

  const channel = await client.channels.fetch(interaction.channelId);
  if (!channel || channel.type !== 'GUILD_TEXT') {
    return;
  }

  // exclamation point tells TS that this value cannot poossibly be null
  const reason = interaction.options.getString('reason')!;
  const { nickname } = getUserLabel(interaction);
=======
  if (!interaction?.channelId) return;

  const channel = await client.channels.fetch(interaction.channelId);
  if (!channel || channel.type !== 'GUILD_TEXT') return;

  const { nickname } = getUserLabel(interaction);
  const reason = interaction.options.getString('reason')!;
>>>>>>> 493784d7a71f517c7643a2e74da64eeb2a60370c

  channel.send(`${nickname} loves bald, because ${reason}.`);

  return interaction.reply({
<<<<<<< HEAD
    content: `Thank you for your love for bald, ${nickname}. \
The message above will personally be sent to Harumaki Gohan's email for future reference.`,
=======
    content:
      `Thank you for your love for bald, ${nickname}. ` +
      "The message below will personally be sent to Harumaki Gohan's email for future reference.",
>>>>>>> 493784d7a71f517c7643a2e74da64eeb2a60370c
    ephemeral: true,
  });
}
