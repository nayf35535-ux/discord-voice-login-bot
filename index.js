import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

// مصفوفة جمل تحليلية متنوعة
const analyses = [
  "🎯 أنت مركز وهادف، تحب الإنجاز!",
  "😂 مرن ومرح مع الجميع!",
  "😴 هادئ ويحب الراحة!",
  "💡 ذكي جدًا ويعرف كيف يتصرف!",
  "🔥 مليء بالطاقة والحماس!",
  "🎨 مبدع ويحب الأفكار الجديدة!",
  "🤔 تحب التفكير العميق وتحليل الأمور!",
  "😎 شخص جذاب ويحب المزاح!"
];

client.once("ready", async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  setInterval(async () => {
    const guild = client.guilds.cache.get("ID_السيرفر"); // ضع ID السيرفر
    if (!guild) return;

    await guild.members.fetch();

    // اختيار عضو عشوائي غير بوت
    const members = guild.members.cache.filter(m => !m.user.bot);
    const randomMember = members.random();
    if (!randomMember) return;

    // اختيار تحليل عشوائي
    const randomAnalysis = analyses[Math.floor(Math.random() * analyses.length)];

    // إنشاء Embed
    const embed = new EmbedBuilder()
      .setColor("Purple")
      .setTitle("🔮 تحليل الشخصية")
      .setDescription(randomAnalysis)
      .setFooter({ text: `لـ ${randomMember.user.tag}` })
      .setTimestamp();

    // إرسال Embed في القناة المحددة
    const channel = guild.channels.cache.get("ID_القناة"); // ضع ID القناة النصية
    if (!channel || !channel.isTextBased()) return;

    await channel.send({ embeds: [embed] });
  }, 5); // كل 30 دقيقة
});

client.login(process.env.TOKEN);
