import {
    Component,
    Module,
    SlashCommand
} from "ayocord"
import {
    SlashCommandBuilder,
    PermissionsBitField,
    CommandInteraction,
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ModalSubmitInteraction,
    MessageFlags,
} from "discord.js"
import { readJsonFileAsync, writeJsonFileAsync } from "../utils/json"

@Module({
    name: "Settings", // The name of your module
})
export class Settings {
    @SlashCommand({
        builder: new SlashCommandBuilder()
            .setDescription("?")
            .setName("settings")
            .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    })
    async settings(interaction: CommandInteraction) {
        const { title, description, color, image } = await readJsonFileAsync()

        const titleQuestion = new TextInputBuilder()
            .setCustomId("title")
            .setLabel("Титул")
            .setStyle(TextInputStyle.Short)
            .setValue(title)
            .setRequired(false)
        
        const descriptionQuestion = new TextInputBuilder()
            .setCustomId("description")
            .setLabel("Описание")
            .setStyle(TextInputStyle.Paragraph)
            .setValue(description)
            .setRequired(false)
        
        const colorQuestion = new TextInputBuilder()
            .setCustomId("color")
            .setLabel("Цвет")
            .setStyle(TextInputStyle.Short)
            .setMaxLength(6)
            .setMinLength(6)
            .setValue(color)
            .setRequired(false)

        const imageQuestion = new TextInputBuilder()
            .setCustomId("image")
            .setLabel("Картинка")
            .setStyle(TextInputStyle.Short)
            .setValue(image)
            .setRequired(false)

        const actionRow1 = new ActionRowBuilder<TextInputBuilder>().addComponents(titleQuestion)
        const actionRow2 = new ActionRowBuilder<TextInputBuilder>().addComponents(descriptionQuestion)
        const actionRow3 = new ActionRowBuilder<TextInputBuilder>().addComponents(colorQuestion)
        const actionRow4 = new ActionRowBuilder<TextInputBuilder>().addComponents(imageQuestion)

        const modal = new ModalBuilder()
            .addComponents(actionRow1, actionRow2, actionRow3, actionRow4)
            .setCustomId("settingsModal")
            .setTitle("Настройки")
        
        await interaction.showModal(modal)
    }

    @Component({ customId: "settingsModal" })
    async onSettingsModal(interaction: ModalSubmitInteraction) {
        const answers = {
            title: interaction.fields.getTextInputValue('title'),
            description: interaction.fields.getTextInputValue('description'),
            color: interaction.fields.getTextInputValue('color'),
            image: interaction.fields.getTextInputValue('image')
        };

        await writeJsonFileAsync(answers)

        await interaction.reply({ content: 'Настройки изменены. Переотправьте сообщение.', flags: MessageFlags.Ephemeral })
    }
}