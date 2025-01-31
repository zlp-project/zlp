import {
    Component,
    DiscordClient,
    Event,
    Module,
    SlashCommand
} from "ayocord"
import {
    Events,
    SlashCommandBuilder,
    PermissionsBitField,
    CommandInteraction,
    ButtonInteraction,
    EmbedBuilder,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle,
    MessageFlags,
    InteractionContextType,
    TextChannel,
} from "discord.js"
import { readJsonFileAsync } from "../utils/json"


@Module({
    name: "Main", // The name of your module
})
export class Main {
    @Event({ name: Events.ClientReady, once: true })
    async onClientReady(client: DiscordClient) {
        console.log(`${client.user?.username} is connected!`)
    }

    @SlashCommand({
        builder: new SlashCommandBuilder()
            .setDescription("Отправить сообщение с проверкой в канал")
            .setName("send")
            .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
            .setContexts(InteractionContextType.Guild)
    })
    async sendMessage(interaction: CommandInteraction) {
        const { title, description, color, image } = await readJsonFileAsync()

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(`#${color}`)

        if (image) embed.setImage(image)
        
        const button = new ButtonBuilder()
            .setLabel("Пройти проверку")
            .setCustomId("checkUser")
            .setStyle(ButtonStyle.Secondary)

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(button)
        
        await (interaction.channel as TextChannel).send({ embeds: [embed], components: [row] })
        await interaction.reply({ content: "Успешно", flags: MessageFlags.Ephemeral })
    }

    @Component({ customId: "checkUser" })
    async onCheckUser(interaction: ButtonInteraction) {
        //const userId = interaction.user.id
        // TODO finish this up
        await interaction.reply({ content: "Не готово", flags: MessageFlags.Ephemeral })
    }
}