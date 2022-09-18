import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed } from 'discord.js';

export const data = {
  build: new SlashCommandBuilder()
    .setName('text')
    .setDescription('Send message as Buff Macaron')
    .addStringOption((option) =>
      option
        .setName('header')
        .setDescription('What do you want Macaron to say?')
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName('content')
        .setDescription('What do you want Macaron to say?')
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName('footer')
        .setDescription('What do you want Macaron to say?')
        .setRequired(true),
    ),
  info: { category: 'Fun', emoji: '🕵️' },
};

export async function execute(interaction: CommandInteraction) {
  const header = interaction.options.getString('header')!;
  const content = interaction.options.getString('content')!;
  const footer = interaction.options.getString('footer')!;

  const embed = new MessageEmbed();

  embed
    .setTitle(`**${header}**`)
    .setDescription(`${content}`)
    .setFooter(`${footer}`)
    .setTimestamp();

  return interaction.reply({
    embeds: [embed],
  });
}
