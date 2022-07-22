import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageActionRow, MessageButton, MessageComponentInteraction, MessageSelectMenu, SelectMenuInteraction } from 'discord.js';
import {getMap} from '../../util/map-emoji';
import * as _ from 'lodash';
import { exportGuild, updateGuild } from '../../models/guild';

export const data = new SlashCommandBuilder()
  .setName('blacklist')
  .setDescription("Blacklists emojis from being used globally")

export async function execute(interaction: CommandInteraction) {
    if (!interaction.memberPermissions?.has("MANAGE_MESSAGES")) return interaction.reply({content: "Beep Boop, you don't have the \"Manage Messages\" permission needed to run this command.", ephemeral: true})

    let options: any = []
    const g = await exportGuild(interaction.guildId!)

    let serverEmojis = Array.from(getMap().values()).filter(e => !g.blacklist.includes(`:${e.name}:`) && e.guild.id == interaction.guildId).sort((a, b) => {
   return a.name?.localeCompare(b.name!) as number;
   });

    if (serverEmojis.length == 0) return interaction.reply({content: "All available emojis are in the blacklist", ephemeral: true});
    serverEmojis.forEach(e => {
        options.push({label: `:${e.name}:`, emoji: e, value: `:${e.name}:`})
    })

    const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
        .addOptions(options))


    interaction.reply({content: "Please select an emoji you would like to blacklist from being used globally", components: [row], ephemeral: true});

    const filter = (i: MessageComponentInteraction) =>  i.user.id === interaction.user.id;

    const collector = interaction.channel!.createMessageComponentCollector({ filter, time: 30000 });


    let found = false
    collector.once('collect', async (e: SelectMenuInteraction) => {
        found = true;
        const emoji = interaction.guild!.emojis.cache.find(em => `:${em.name}:` == e.values[0])
        
        const buttonRow = new MessageActionRow().addComponents(new MessageButton().setCustomId('Yes').setLabel('Yes').setStyle('PRIMARY'), new MessageButton().setCustomId("No").setLabel("No").setStyle("SECONDARY"));

        if (g.blacklist.includes(`:${emoji?.name}:`)) {
            e.update({content: `${emoji} **:${emoji?.name}:** is already blacklisted`, components: []})
            collector.stop()
            return
        }

        e.update({content: `${emoji} Are you sure you would like to blacklist **:${emoji?.name}:**?`, components: [buttonRow]})


        const collector2 = interaction.channel!.createMessageComponentCollector({ filter, time: 30000 });

        found = false
        collector2.once('collect', async i => {
            found = true;
	        if (i.customId == "Yes") {
                await updateGuild(interaction.guildId!, {$push: {blacklist: `:${emoji?.name}:`}})
                await i.update({content: `You have blacklisted ${emoji} **:${emoji?.name}:**`, components: []})
            } else {
                await i.update({content: "No change has been made", components: []})
            }
        });

        collector2.once('end', async () => {
            if (!found) await e.update({content: "Command timed out. No change has been made", components: []})
        })
    
    })


    collector.once('end', async () => {
        if (!found) await interaction.editReply({content: "Command timed out. No change has been made", components: []})
   })
    
} 