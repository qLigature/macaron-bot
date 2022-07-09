import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("riceball")
  .setDescription("Lures wild riceball eaters");

export async function execute(interaction: CommandInteraction) {
  return interaction.reply("<:baldlilihuh:974796458651971585>");
}
