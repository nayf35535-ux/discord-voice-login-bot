import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

// مصفوفة جمل تحليلية متنوعة
const analyses = [
  "🎯 مسوي مندمج وانت ماتدري ربك وين حاطك!",
  "😂 ❤️دلوخي!",
  "😴 كلامك كثير بالع راديو!",
  "💡 غبائك ذا وراثه ولا اجتهاد شخصي!",
  "🔥 افعالك الي جالس تسويها عاجبتك؟!",
  "🎨 قد قالك احد انك فكوك!",
  "🤔 شكلك حبيبي!",
  "😎 اففف واضح انك هطف!",
  "😎 ييحلو عطنى وجه!"  // آخر عنصر
];

client.once("ready", async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  const sendAnalysis = async () => {
    const guild = client.guilds.cache.get("1461062091824955598"); // ID السيرفر
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

    // إرسال Embed مع منشن العضو
    const channel = guild.channels.cache.get("1461062717900066968"); // ID القناة النصية
    if (!channel || !channel.isTextBased()) return;

    await channel.send({
      content: `<@${randomMember.id}>`,
      embeds: [embed]
    });
  };

  // تأخير أول مرة 30 دقيقة، ثم كل 30 دقيقة
  setTimeout(() => {
    sendAnalysis(); // أول رسالة بعد 30 دقيقة
    setInterval(sendAnalysis, 1800000); // كل 30 دقيقة بعد ذلك
  }, 1800000);
});

client.login(process.env.TOKEN);
