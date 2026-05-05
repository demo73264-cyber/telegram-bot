const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

console.log("Bot starting...");

// ✅ ENV variables use karo
const token = process.env.BOT_TOKEN;
const API_KEY = process.env.API_KEY;

const bot = new TelegramBot(token, { polling: true });

const channel = "@NumberWinChannel";
const API_URL = "https://telekartsmm.com/api/v2";

// ✅ Duplicate protection
let processedPosts = new Set();

bot.on("channel_post", async (msg) => {
  try {
    if (processedPosts.has(msg.message_id)) return;
    processedPosts.add(msg.message_id);

    const postLink = `https://t.me/${channel.replace("@","")}/${msg.message_id}`;

    console.log("🚀 New Post:", postLink);

    const delay = 3000 + Math.floor(Math.random() * 5000);

    setTimeout(async () => {

      console.log("📤 Sending Order...");

      await axios.post(API_URL, {
        key: API_KEY,
        action: "add",
        service: "1023",
        link: postLink,
        quantity: 100
      });

      console.log("✅ Order Sent");

    }, delay);

  } catch (err) {
    console.log("❌ Error:", err.message);
  }
});
