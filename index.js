const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

console.log("Bot starting...");

// ✅ ENV variables use karo
const token = process.env.BOT_TOKEN;
const API_KEY = process.env.API_KEY;

const bot = new TelegramBot(token, { polling: true });

const channel = "@URVIGAMER";
const API_URL = "https://smmlite.com/api/v2";

// ✅ Duplicate protection
let processedPosts = new Set();

bot.on("channel_post", async (msg) => {
  try {
    if (processedPosts.has(msg.message_id)) return;
    processedPosts.add(msg.message_id);

    const postLink = `https://t.me/${channel.replace("@","")}/${msg.message_id}`;

    console.log("🚀 New Post:", postLink);

    const delay = 800 + Math.floor(Math.random() * 1000);

    setTimeout(async () => {

      console.log("📤𝕻𝖑𝖆𝖈𝖎𝖓𝖌 𝕺𝖗𝖉𝖊𝖗...");

      await axios.post(API_URL, {
        key: API_KEY,
        action: "add",
        service: "5160",
        link: postLink,
        quantity: 110
      });

      console.log("✅ 𝓞𝓻𝓭𝓮𝓻 𝓢𝓾𝓬𝓬𝓮𝓼𝓼𝓯𝓾𝓵𝓵");

    }, delay);

  } catch (err) {
    console.log("❌ Error:", err.message);
  }
});
