import { Client, GatewayIntentBits, AttachmentBuilder } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

// خريطة لتتبع آخر روم لكل عضو
const lastChannel = new Map();

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("voiceStateUpdate", async (oldState, newState) => {
  const memberId = newState.member.id;
  const newChannelId = newState.channelId;

  // إذا لم يتغير الروم → لا ترسل الرسالة
  if (lastChannel.get(memberId) === newChannelId) return;

  // تحديث آخر روم للعضو
  lastChannel.set(memberId, newChannelId);

  // إذا العضو دخل روم جديد
  if (newChannelId) {
    const logChannel = newState.guild.channels.cache.get("1461062717900066968");
    if (!logChannel || !logChannel.isTextBased()) return;

    // الملف (GIF)
    const gif = new AttachmentBuilder("IMG_3690.gif");

    // إرسال GIF فقط
    await logChannel.send({ files: [gif] });
  }
});

client.login("MTQ2OTM5MDQzMzIxNzAyMDA1NQ.G-3IAP.SFk5owsocR-9tPzRgu8REVrMRGDIj3GAUCtYpo");
