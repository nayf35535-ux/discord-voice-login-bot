import { Client, GatewayIntentBits, EmbedBuilder, AttachmentBuilder } from "discord.js";
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
  if (!oldState.channelId && newState.channelId) {
    const logChannel = newState.guild.channels.cache.get(process.env.LOG_CHANNEL_ID);
    if (!logChannel) return;

    const member = newState.member;

    const video = new AttachmentBuilder("./login.mp4");

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("🎧 تسجيل دخول صوتي")
      .setDescription(`👤 **${member.user.tag}**\n📢 دخل روم صوتي`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    await logChannel.send({
      content: "@everyone",
      embeds: [embed],
      files: [video]
    });
  }
});

client.login(process.env.TOKEN);
