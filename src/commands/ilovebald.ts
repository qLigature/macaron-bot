import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ilovebald")
  .setDescription("Express your love for bald")
  .addStringOption((option) =>
    option
      .setName("reason")
      .setDescription("Why do you love bald?")
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction, client: Client) {
  if (!interaction?.channelId) {
    return;
  }

  const channel = await client.channels.fetch(interaction.channelId);
  if (!channel || channel.type !== "GUILD_TEXT") {
    return;
  }

  // exclamation point tells TS that this value cannot poossibly be null
  const reason = interaction.options.getString("reason")!;
  const { user } = interaction;

  channel.send(`${user.username} loves bald, because ${reason}.`);

  return interaction.reply({
    content: `Thank you for your love for bald, ${user.username}. The message above will personally be sent to Harumaki Gohan's email for future reference.`,
    ephemeral: true,
  });
}
