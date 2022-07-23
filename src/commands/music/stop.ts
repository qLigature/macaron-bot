import { SlashCommandBuilder } from '@discordjs/builders';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops the bot and clears the queue'),
  run: async ({ client, interaction }: any) => {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue)
      return await interaction.editReply('Burning queue.');

    queue.destroy();
    await interaction.editReply('Bye!');
  },
};
