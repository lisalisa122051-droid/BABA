// ALL MENU MODULE - 1000+ Features
const fs = require('fs-extra');
const path = require('path');

module.exports = {
    // Main Menu Command
    async allmenu(sock, msg, ctx) {
        const { from, baileys } = ctx;
        const sections = require('../lib/listmenu').createAllMenu();
        
        await baileys.sendList(from, 
            "🌸 NEBULA BOT - ALL MENU 🌸",
            `*${global.config.name}* - All Commands (1000+ Features)\n\nPilih kategori di bawah:`,
            "📜 VIEW CATEGORIES",
            sections,
            msg
        );
    },
    
    // Owner Menu
    async ownermenu(sock, msg, ctx) {
        const { from, baileys } = ctx;
        const buttons = require('../lib/button').createOwnerMenu();
        
        const text = `
╭━━━「 *OWNER MENU* 」━━━⬣
│ 
│ ⚙️  *SYSTEM*
│ • .eval <code> - Execute JS code
│ • .exec <cmd> - Execute shell command
│ • .restart - Restart bot system
│ • .shutdown - Shutdown bot
│ 
│ 📊 *STATISTICS*
│ • .stats - Bot statistics
│ • .listuser - List all users
│ • .listgroup - List all groups
│ • .listpc - List premium users
│ 
│ 👤 *USER MANAGEMENT*
│ • .addprem <number> - Add premium
│ • .delprem <number> - Remove premium
│ • .ban <number> - Ban user
│ • .unban <number> - Unban user
│ 
│ 📢 *BROADCAST*
│ • .bc <text> - Broadcast text
│ • .bcimage <caption> - Broadcast image
│ • .bcvideo <caption> - Broadcast video
│ 
│ ⚡ *OTHER*
│ • .setprefix <symbol> - Change prefix
│ • .setname <text> - Change bot name
│ • .setbio <text> - Change bot bio
│ 
╰━━━━━━━━━━━━━━━━━━⬣
        `.trim();
        
        await baileys.sendButton(from, text, buttons, msg);
    },
    
    // Group Menu
    async groupmenu(sock, msg, ctx) {
        const { from, baileys, isGroup } = ctx;
        if (!isGroup) return baileys.sendText(from, '❌ Command ini hanya bisa digunakan di grup!');
        
        const buttons = require('../lib/button').createGroupMenu();
        
        const text = `
╭━━━「 *GROUP MENU* 」━━━⬣
│ 
│ 👥 *MEMBERS*
│ • .kick @tag - Kick member
│ • .add 628xxx - Add member
│ • .promote @tag - Make admin
│ • .demote @tag - Remove admin
│ 
│ ⚙️  *SETTINGS*
│ • .antilink on/off - Toggle antilink
│ • .welcome on/off - Toggle welcome
│ • .nsfw on/off - Toggle NSFW
│ • .mute on/off - Mute group
│ 
│ 📊 *INFO*
│ • .groupinfo - Group information
│ • .linkgroup - Get group link
│ • .listadmin - List admins
│ • .listonline - Online members
│ 
│ 🎯 *OTHER*
│ • .setdesc <text> - Set description
│ • .setname <text> - Set group name
│ • .setpp - Set group picture
│ • .hidetag <text> - Mention all
│ 
╰━━━━━━━━━━━━━━━━━━⬣
        `.trim();
        
        await baileys.sendButton(from, text, buttons, msg);
    },
    
    // Download Menu
    async downloadmenu(sock, msg, ctx) {
        const { from, baileys } = ctx;
        const buttons = require('../lib/button').createDownloadMenu();
        
        const text = `
╭━━━「 *DOWNLOAD MENU* 」━━━⬣
│ 
│ 🎬 *YOUTUBE*
│ • .ytmp4 <url> - Download video
│ • .ytmp3 <url> - Download audio
│ • .ytsearch <query> - Search video
│ • .ytplay <query> - Play audio
│ 
│ 📷 *INSTAGRAM*
│ • .igdl <url> - Download post/reel
│ • .igstory <username> - Download story
│ • .igtv <url> - Download IGTV
│ 
│ 📹 *TIKTOK*
│ • .ttdl <url> - Download video
│ • .ttaudio <url> - Audio only
│ • .ttsearch <query> - Search video
│ 
│ 🎵 *MUSIC*
│ • .spotify <url> - Download track
│ • .soundcloud <url> - Download audio
│ • .joox <query> - Search music
│ 
│ 🌐 *OTHER*
│ • .fbdl <url> - Facebook video
│ • .twitter <url> - Twitter video
│ • .pinterest <url> - Pinterest download
│ 
╰━━━━━━━━━━━━━━━━━━⬣
        `.trim();
        
        await baileys.sendButton(from, text, buttons, msg);
    },
    
    // Fun Menu
    async funmenu(sock, msg, ctx) {
        const { from, baileys } = ctx;
        const buttons = require('../lib/button').createFunMenu();
        
        const text = `
╭━━━「 *FUN & GAMES* 」━━━⬣
│ 
│ 🎮 *GAMES*
│ • .tebakgambar - Guess picture
│ • .tebakkata - Guess word
│ • .tebaklirik - Guess lyrics
│ • .suit <batu/kertas/gunting>
│ 
│ 💘 *COUPLE*
│ • .jadian @tag - Match couple
│ • .cekpacar - Check boyfriend
│ • .putus - Break up
│ • .ship @tag1 @tag2 - Ship couple
│ 
│ ❓ *QUESTIONS*
│ • .apakah <question> - Yes/no question
│ • .kapankah <question> - When question
│ • .bisakah <question> - Can question
│ • .rate <object> - Rate 1-100
│ 
│ 🎲 *RANDOM*
│ • .truth - Truth question
│ • .dare - Dare challenge
│ • .bagibucin - Romantic quotes
│ • .fakta - Random facts
│ 
│ 😂 *FUNNY*
│ • .darkjokes - Dark humor
│ • .meme - Random memes
│ • .quotes - Motivational quotes
│ • .cerpen - Short story
│ 
╰━━━━━━━━━━━━━━━━━━⬣
        `.trim();
        
        await baileys.sendButton(from, text, buttons, msg);
    },
    
    // AI Menu
    async aimenu(sock, msg, ctx) {
        const { from, baileys } = ctx;
        const buttons = require('../lib/button').createAIMenu();
        
        const text = `
╭━━━「 *ARTIFICIAL INTELLIGENCE* 」━━━⬣
│ 
│ 🤖 *CHATGPT*
│ • .ai <question> - ChatGPT 4
│ • .gpt <question> - ChatGPT 3.5
│ • .dalle <prompt> - Generate image
│ • .chatgpt <question> - OpenAI
│ 
│ 🔮 *GEMINI*
│ • .gemini <question> - Google Gemini
│ • .bard <question> - Google Bard
│ • .palm <question> - PaLM 2
│ 
│ 📦 *OTHER AI*
│ • .blackbox <question> - Blackbox AI
│ • .huggingchat <question> - HuggingChat
│ • .llama <question> - LLaMA
│ • .claude <question> - Claude AI
│ 
│ 🎨 *IMAGE AI*
│ • .midjourney <prompt> - Generate art
│ • .stablediffusion <prompt> - AI art
│ • .rembg - Remove background
│ • .upscale - Enhance image
│ 
│ 💬 *CHAT BOTS*
│ • .simi <text> - Chat with SimSimi
│ • .mitsuku - Chat with Mitsuku
│ • .cleverbot - Cleverbot AI
│ • .replika - Replika AI
│ 
╰━━━━━━━━━━━━━━━━━━⬣
        `.trim();
        
        await baileys.sendButton(from, text, buttons, msg);
    },
    
    // Sticker Menu
    async stickermenu(sock, msg, ctx) {
        const { from, baileys } = ctx;
        const buttons = require('../lib/button').createStickerMenu();
        
        const text = `
╭━━━「 *STICKER MENU* 」━━━⬣
│ 
│ 🖼️ *CONVERT*
│ • .sticker - Image to sticker
│ • .stickergif - GIF to sticker
│ • .stickerwm - With watermark
│ • .togif - Sticker to GIF
│ 
│ ✏️ *TEXT STICKER*
│ • .ttp <text> - Text to sticker
│ • .attp <text> - Animated text
│ • .party <text> - Party effect
│ • .glitch <text> - Glitch effect
│ 
│ 🎭 *EMOJI*
│ • .emojimix 😀+😃 - Mix emojis
│ • .smoji <emoji> - Sticker emoji
│ • .emoji2img <emoji> - Emoji to image
│ 
│ 🎨 *EDIT STICKER*
│ • .crop - Crop sticker
│ • .rotate <degree> - Rotate sticker
│ • .flip - Flip sticker
│ • .stickerinfo - Sticker info
│ 
│ 📚 *PACK*
│ • .take <name>|author - Take sticker
│ • .listpack - List sticker packs
│ • .deletepack - Delete pack
│ 
╰━━━━━━━━━━━━━━━━━━⬣
        `.trim();
        
        await baileys.sendButton(from, text, buttons, msg);
    },
    
    // Search Menu
    async searchmenu(sock, msg, ctx) {
        const { from, baileys } = ctx;
        const sections = require('../lib/listmenu').createSearchMenu();
        
        await baileys.sendList(from,
            "🔎 SEARCH MENU",
            "Pilih kategori pencarian:",
            "📚 SEARCH OPTIONS",
            sections,
            msg
        );
    },
    
    // Tools Menu
    async toolsmenu(sock, msg, ctx) {
        const { from, baileys } = ctx;
        
        const text = `
╭━━━「 *TOOLS MENU* 」━━━⬣
│ 
│ 📝 *TEXT TOOLS*
│ • .stickerwm <text> - Watermark
│ • .font <style> <text> - Change font
│ • .tinyurl <url> - Shorten URL
│ • .qrcode <text> - Generate QR
│ 
│ 🖼️ *IMAGE TOOLS*
│ • .removebg - Remove background
│ • .blur - Blur image
│ • .invert - Invert colors
│ • .grayscale - Grayscale
│ 
│ 🎵 *AUDIO TOOLS*
│ • .bass - Enhance bass
│ • .nightcore - Nightcore effect
│ • .slow - Slow motion
│ • .reverse - Reverse audio
│ 
│ 📁 *FILE TOOLS*
│ • .toimg - Sticker to image
│ • .tomp3 - Audio to MP3
│ • .tomp4 - Video to MP4
│ • .toaudio - Extract audio
│ 
│ 🔐 *ENCRYPTION*
│ • .encode64 <text> - Base64 encode
│ • .decode64 <text> - Base64 decode
│ • .encrypt <text> - Encrypt text
│ • .decrypt <text> - Decrypt text
│ 
╰━━━━━━━━━━━━━━━━━━⬣
        `.trim();
        
        const buttons = [
            { buttonId: '.font fancy Hello', buttonText: { displayText: '🎨 FONT STYLE' }, type: 1 },
            { buttonId: '.qrcode nebula', buttonText: { displayText: '📱 QR CODE' }, type: 1 },
            { buttonId: '.removebg', buttonText: { displayText: '🖼️ REMOVE BG' }, type: 1 },
            { buttonId: '.back', buttonText: { displayText: '🔙 BACK' }, type: 1 }
        ];
        
        await baileys.sendButton(from, text, buttons, msg);
    },
    
    // Islam Menu
    async islammenu(sock, msg, ctx) {
        const { from, baileys } = ctx;
        
        const text = `
╭━━━「 *ISLAMIC MENU* 」━━━⬣
│ 
│ 📖 *QURAN*
│ • .alquran <surah> - Read Quran
│ • .tafsir <surah:ayat> - Tafsir
│ • .listsurah - List surah
│ • .audio <surah> - Audio Quran
│ 
│ 🕌 *PRAYER TIME*
│ • .shalat <city> - Prayer times
│ • .jadwalsholat - Schedule
│ • .kiblat - Qibla direction
│ 
│ 📚 *HADITH*
│ • .hadith <number> - Read hadith
│ • .hadithrandom - Random hadith
│ • .bukhari <number> - Sahih Bukhari
│ • .muslim <number> - Sahih Muslim
│ 
│ 🕌 *OTHER*
│ • .asmaulhusna - 99 Names
│ • .ayatkursi - Ayat Kursi
│ • .doaharian - Daily prayers
│ • .niatsholat - Prayer intentions
│ 
╰━━━━━━━━━━━━━━━━━━⬣
        `.trim();
        
        const buttons = [
            { buttonId: '.alquran 1', buttonText: { displayText: '📖 AL-FATIHAH' }, type: 1 },
            { buttonId: '.shalat jakarta', buttonText: { displayText: '🕌 SHALAT TIME' }, type: 1 },
            { buttonId: '.asmaulhusna', buttonText: { displayText: '🌟 ASMAUL HUSNA' }, type: 1 },
            { buttonId: '.back', buttonText: { displayText: '🔙 BACK' }, type: 1 }
        ];
        
        await baileys.sendButton(from, text, buttons, msg);
    }
};

// Add more commands here to reach 1000+ features
// Each command should be added as a function in this module
