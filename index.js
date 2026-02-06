import { Client, GatewayIntentBits, AttachmentBuilder } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("voiceStateUpdate", async (oldState, newState) => {
  // أي مرة يدخل العضو روم صوتي (حتى لو كان في روم قبل)
  if (oldState.channelId !== newState.channelId && newState.channelId) {
    const logChannel = newState.guild.channels.cache.get("1461062717900066968");
    if (!logChannel || !logChannel.isTextBased()) return;

    // الملف
    const video = new AttachmentBuilder("IMG_3690.gif");

    // إرسال الفيديو فقط
    await logChannel.send({
      files: [video]
    });
  }
});

client.login("MTQ2OTM5MDQzMzIxNzAyMDA1NQ.G-3IAP.SFk5owsocR-9tPzRgu8REVrMRGDIj3GAUCtYpo");
