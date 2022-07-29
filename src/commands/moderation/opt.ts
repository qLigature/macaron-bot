import { SlashCommandBuilder } from '@discordjs/builders';
import {
  CommandInteraction,
  MessageActionRow,
  MessageButton,
  MessageComponentInteraction,
} from 'discord.js';

import { exportGuild, updateGuild } from '../../models/guild';

export const data = {build: new SlashCommandBuilder()
  .setName('opt')
  .setDescription('Opt your server\'s emojis in or out of global nitro (Requires "Manage Messages" Permission)'),
  info: {category: "Moderation", emoji: "☑️"}};

export async function execute(interaction: CommandInteraction) {
  if (!interaction.memberPermissions?.has('MANAGE_MESSAGES'))
    return interaction.reply({
      content:
        'Beep Boop, you don\'t have the "Manage Messages" permission needed to run this command.',
      ephemeral: true,
    });

  const guild = await exportGuild(interaction.guildId!);

  const row = new MessageActionRow().addComponents(
    new MessageButton().setCustomId('Yes').setLabel('Yes').setStyle('PRIMARY'),
    new MessageButton().setCustomId('No').setLabel('No').setStyle('SECONDARY'),
  );

  interaction.reply({
    content: `Would you are currently **${txtOpt(
      guild.opt,
    )}** of global emojis, would you like to change that?`,
    components: [row],
    ephemeral: true,
  });
  const filter = (i: MessageComponentInteraction) =>
    i.user.id === interaction.user.id;

  const collector = interaction.channel!.createMessageComponentCollector({
    filter,
    time: 15000,
  });

  let found = false;
  collector.once('collect', async (i) => {
    found = true;
    if (i.customId == 'Yes') {
      await updateGuild(interaction.guildId!, { $set: { opt: !guild.opt } });
      await i.update({
        content: `You have been changed to be **${txtOpt(!guild.opt)}**`,
        components: [],
      });
    } else {
      await interaction.editReply({
        content: 'No change has been made',
        components: [],
      });
    }
  });

  collector.once('end', async () => {
    if (!found)
      await interaction.editReply({
        content: 'Command timed out. No change has been made',
        components: [],
      });
  });
}

function txtOpt(isOpt: boolean): string {
  if (isOpt) return 'opted in';
  else return 'opted out';
}
