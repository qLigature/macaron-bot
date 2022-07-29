import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Client, MessageActionRow, MessageButton, MessageEmbed, MessageComponentInteraction } from 'discord.js';
import { images } from '../../config/config.json';

export const data =  { 
   build: new SlashCommandBuilder()
  .setName('help')
  .setDescription('Lists all available commands'),
   info: {category: "Utility", emoji: "📜"}};

export async function execute(interaction: CommandInteraction, client: Client) {
  const fun:any = []
  const image:any = []
  const moderation:any = []
  const music:any = []

  client.commands.forEach((x: any) => {
    if (!x.data.info) return;
    if (x.data.info.category == "Fun") fun.push(x);
    if (x.data.info.category == "Image") image.push(x);
    if (x.data.info.category == "Moderation") moderation.push(x);
    if (x.data.info.category == "Music") music.push(x);
  })

  const row = new MessageActionRow().addComponents(
    new MessageButton().setCustomId('Fun').setLabel('Fun').setStyle('SECONDARY'),
    new MessageButton().setCustomId('Image').setLabel('Image').setStyle('SECONDARY'),
    new MessageButton().setCustomId('Moderation').setLabel('Moderation').setStyle('SECONDARY'),
    new MessageButton().setCustomId('Music').setLabel('Music').setStyle('SECONDARY'),
  );

  const embed = new MessageEmbed()
  .setColor("#455DFA")
  .setTitle("Fun Commands:")
  .setDescription(`${fun.map((x: any) => `${x.data.info.emoji} \`/${x.data.build.name}\` - ${x.data.build.description}`).join("\n\n")}`)
  .setFooter({text: `${client.commands.size} total commands!`})

  interaction.reply({embeds: [embed], components: [row]})

  const filter = (i: MessageComponentInteraction) => i.user.id === interaction.user.id;

  const collector = interaction.channel!.createMessageComponentCollector({filter,time: 60000,});

  let currentCategory = "Fun";
  collector.on('collect', async (i) => {
    
    if (i.customId == currentCategory) return;

    if (i.customId == "Fun") {
        embed.setTitle("Fun Commands:")
        .setDescription(`${fun.map((x: any) => `${x.data.info.emoji} \`/${x.data.build.name}\` - ${x.data.build.description}`).join("\n\n")}`)
        
        currentCategory = "Fun"
        i.update({embeds: [embed], components: [row]})
    }

    if (i.customId == "Image") {
        embed.setTitle("Image Commands:")
        .setDescription(`${image.map((x: any) => `${x.data.info.emoji} \`/${x.data.build.name}\` - ${x.data.build.description}`).join("\n\n")}`)
        
        currentCategory = "Image"
        i.update({embeds: [embed], components: [row]})
    }

    if (i.customId == "Moderation") {
        embed.setTitle("Moderation Commands:")
        .setDescription(`${moderation.map((x: any) => `${x.data.info.emoji} \`/${x.data.build.name}\` - ${x.data.build.description}`).join("\n\n")}`)

        currentCategory = "Moderation"
        i.update({embeds: [embed], components: [row]})
    }

    if (i.customId == "Music") {
        embed.setTitle("Music Commands:")
        .setDescription(`${music.map((x: any) => `${x.data.info.emoji} \`/${x.data.build.name}\` - ${x.data.build.description}`).join("\n\n")}`)

        currentCategory = "Music"
        i.update({embeds: [embed], components: [row]})
    }
  });
}
