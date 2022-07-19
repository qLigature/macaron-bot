import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageActionRow, MessageButton, MessageComponentInteraction, MessageSelectMenu, SelectMenuInteraction } from 'discord.js';
import {getMap} from '../../util/map-emoji';
import { exportGuild, updateGuild } from '../../models/guild';

export const data = new SlashCommandBuilder()
  .setName('blocklist')
  .setDescription("Lists all emojis that are blacklisted from global use")

export async function execute(interaction: CommandInteraction) {
    const g = await exportGuild(interaction.guildId!);

    let serverEmojis = g.blacklist.sort()

    if (serverEmojis.length == 0) return interaction.reply({content: "No emojis are in the blacklist", ephemeral: true});

    let displayEmoji: any = []
    serverEmojis.forEach(e => {
        displayEmoji.push(getMap().get(e).toString() + ` **${e}**`)
    })

    interaction.reply("**Blacklist:**\n\n" + displayEmoji.join("\n"))


}