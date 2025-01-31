import { DiscordFactory } from "ayocord";
import { GatewayIntentBits } from "discord.js";
import { Main } from "./modules/main";
import { Settings } from "./modules/settings";

async function bootstrap() {
    const client = await DiscordFactory.create({
        intents: [GatewayIntentBits.Guilds],
        collector: {
            modules: [Main, Settings]
        }
    });
    client.login();
}

bootstrap();