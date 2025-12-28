const BaileysHelper = require('./lib/baileys');
const ButtonBuilder = require('./lib/button');
const ListMenuBuilder = require('./lib/listmenu');
const config = require('./config');
const path = require('path');
const fs = require('fs-extra');

// Load message modules
const menuModules = {};
const messageDir = path.join(__dirname, 'message');
if (fs.existsSync(messageDir)) {
    const files = fs.readdirSync(messageDir);
    files.forEach(file => {
        if (file.endsWith('.js')) {
            const moduleName = path.basename(file, '.js');
            try {
                menuModules[moduleName] = require(path.join(messageDir, file));
            } catch (error) {
                console.error(`Failed to load module ${file}:`, error);
            }
        }
    });
}

async function handler(sock, msg) {
    const baileys = new BaileysHelper(sock);
    
    // Auto read message
    await baileys.readMessage(msg.key);
    
    // Process message
    const from = msg.key.remoteJid;
    const type = Object.keys(msg.message || {})[0];
    const body = (type === 'conversation' && msg.message.conversation) ||
                 (type === 'extendedTextMessage' && msg.message.extendedTextMessage.text) ||
                 (type === 'imageMessage' && msg.message.imageMessage.caption) ||
                 '';
    
    const sender = msg.key.participant || from;
    const pushname = msg.pushName || 'User';
    
    // Register user
    if (!global.db.getUser(sender)) {
        global.db.addUser(sender);
        global.db.updateUser(sender, { name: pushname });
    }
    
    // Update last seen
    global.db.updateUser(sender, { lastSeen: new Date().toISOString() });
    
    // Register group
    if (from.endsWith('@g.us') && !global.db.getGroup(from)) {
        global.db.addGroup(from);
    }
    
    // Runtime stats
    global.runtime.addMessage();
    
    // Check prefix
    let prefix = false;
    for (const pre of config.prefix) {
        if (body.startsWith(pre)) {
            prefix = pre;
            break;
        }
    }
    
    if (!prefix && !body.startsWith('!')) return;
    
    const command = body.slice(prefix.length).trim().split(' ')[0].toLowerCase();
    const args = body.slice(prefix.length + command.length).trim();
    const isCmd = body.startsWith(prefix);
    
    if (!isCmd) return;
    
    // Update user command count
    const user = global.db.getUser(sender);
    if (user) {
        user.totalCommand++;
        global.db.saveDatabase('user');
    }
    
    // Check limit for non-premium users
    if (!user?.premium && user?.limit <= 0 && !config.owner.includes(sender)) {
        return baileys.sendText(from, `❌ Limit habis! Anda telah menggunakan ${user.totalCommand} command.\n💎 Upgrade premium untuk limit tak terbatas!`);
    }
    
    // Deduct limit for non-premium
    if (!user?.premium && !config.owner.includes(sender)) {
        global.db.addLimit(sender);
    }
    
    // Command handler
    global.runtime.addCommand(command);
    
    try {
        await handleCommand(sock, msg, {
            from, sender, pushname, body, command, args,
            baileys, prefix, user, isGroup: from.endsWith('@g.us')
        });
    } catch (error) {
        console.error('Command error:', error);
        global.runtime.addError();
        await baileys.sendText(from, `❌ Error: ${error.message}`);
    }
}

async function handleCommand(sock, msg, ctx) {
    const { from, sender, command, args, baileys, user } = ctx;
    
    switch (command) {
        case 'menu':
        case 'help':
        case 'allmenu':
            await showMainMenu(sock, msg, ctx);
            break;
            
        case 'ping':
            const start = Date.now();
            await baileys.sendText(from, '🏓 Pong!');
            const latency = Date.now() - start;
            await baileys.sendText(from, `🚀 Bot Latency: ${latency}ms\n⏰ Uptime: ${global.runtime.formatUptime()}`);
            break;
            
        case 'owner':
        case 'creator':
            await baileys.sendText(from, `👑 *OWNER BOT*\n\n` +
                `Nama: ${config.author}\n` +
                `Nomor: ${config.owner[0].split('@')[0]}\n` +
                `Instagram: @username\n` +
                `GitHub: github.com/username`);
            break;
            
        case 'stats':
            if (!config.owner.includes(sender)) {
                return baileys.sendText(from, '❌ Owner only command!');
            }
            const stats = global.runtime.getStats();
            let statsText = `📊 *BOT STATISTICS*\n\n`;
            statsText += `⏰ Runtime: ${stats.runtime}\n`;
            statsText += `📨 Messages: ${stats.messages}\n`;
            statsText += `⚡ Commands: ${stats.commands}\n`;
            statsText += `❌ Errors: ${stats.errors}\n`;
            statsText += `👥 Users: ${Object.keys(global.db.users).length}\n`;
            statsText += `👥 Groups: ${Object.keys(global.db.groups).length}\n\n`;
            statsText += `💾 Memory: ${stats.memory.heap}\n`;
            statsText += `🖥️ CPU: ${stats.system.cpu}\n`;
            statsText += `🎯 Top Commands:\n`;
            stats.topCommands.forEach(cmd => {
                statsText += `• ${cmd.command}: ${cmd.count}x\n`;
            });
            await baileys.sendText(from, statsText);
            break;
            
        case 'myprem':
            const isPremium = global.db.checkPremium(sender);
            await baileys.sendText(from, `🌟 *PREMIUM STATUS*\n\n` +
                `Status: ${isPremium ? '✅ AKTIF' : '❌ NONAKTIF'}\n` +
                `Limit: ${user.limit}/${user.premium ? '∞' : config.settings.limitCount}\n` +
                `Role: ${user.role}\n` +
                `Commands Used: ${user.totalCommand}`);
            break;
            
        case 'listpc':
            if (!config.owner.includes(sender)) {
                return baileys.sendText(from, '❌ Owner only command!');
            }
            const users = Object.values(global.db.users);
            const premiumUsers = users.filter(u => u.premium);
            let listText = `🌟 *PREMIUM USERS LIST*\n\n`;
            premiumUsers.forEach((u, i) => {
                listText += `${i+1}. ${u.name || u.jid.split('@')[0]}\n`;
                listText += `   JID: ${u.jid}\n`;
                listText += `   Limit: ${u.limit}\n`;
                listText += `   Commands: ${u.totalCommand}\n\n`;
            });
            await baileys.sendText(from, listText);
            break;
            
        case 'addprem':
            if (!config.owner.includes(sender)) {
                return baileys.sendText(from, '❌ Owner only command!');
            }
            const targetJid = args.split(' ')[0];
            if (!targetJid) {
                return baileys.sendText(from, '❌ Format: .addprem 628xxx');
            }
            const normalizedJid = targetJid.includes('@') ? targetJid : `${targetJid}@s.whatsapp.net`;
            global.db.addPremium(normalizedJid, 30);
            await baileys.sendText(from, `✅ Premium added for ${normalizedJid.split('@')[0]} (30 days)`);
            break;
            
        default:
            // Check if command exists in modules
            let handled = false;
            for (const moduleName in menuModules) {
                const module = menuModules[moduleName];
                if (module[command]) {
                    await module[command](sock, msg, ctx);
                    handled = true;
                    break;
                }
            }
            
            if (!handled) {
                await baileys.sendText(from, `❌ Command "${command}" tidak ditemukan!\nKetik .menu untuk melihat semua command.`);
            }
    }
}

async function showMainMenu(sock, msg, ctx) {
    const { from, baileys } = ctx;
    
    // Read thumbnail video
    const thumbPath = path.join(__dirname, 'media', 'thumb.mp4');
    let videoBuffer;
    
    try {
        videoBuffer = await fs.readFile(thumbPath);
    } catch (error) {
        console.error('Thumbnail video not found:', error);
        videoBuffer = null;
    }
    
    const menuText = `
╭━━━「 *${config.name}* 」━━━⬣
│ 📊 *Status:* Active
│ ⏰ *Uptime:* ${global.runtime.formatUptime()}
│ 👥 *Users:* ${Object.keys(global.db.users).length}
│ 🎯 *Commands:* ${Object.keys(global.runtime.commands).length}
│ 💎 *Premium:* ${global.db.premium.filter(p => p.active).length}
╰━━━━━━━━━━━━━━━━━━⬣

*👋 Hello ${ctx.pushname}!*

Saya adalah *${config.name}*, WhatsApp Bot dengan *1000+ Fitur* yang siap membantu Anda!

*🎯 MAIN MENU:*
• 📜 *All Menu* - Tampilkan semua fitur
• 👑 *Owner Menu* - Perintah khusus owner
• 👥 *Group Menu* - Pengelolaan grup
• ⬇️ *Download Menu* - Downloader media
• 🎮 *Fun Menu* - Games & entertainment
• 🤖 *AI Menu* - Artificial Intelligence
• 🎨 *Sticker Menu* - Pembuat sticker
• 🔎 *Search Menu* - Pencarian informasi
• 🛠️ *Tools Menu* - Alat-alat bermanfaat
• ☪️ *Islam Menu* - Fitur keislaman
• 📚 *Education* - Edukasi & pembelajaran
• 🔒 *Security* - Keamanan & proteksi
• 📊 *Database* - Pengelolaan data

*📌 INFO:*
Prefix: ${config.prefix.join(', ')}
Owner: ${config.owner[0].split('@')[0]}
Version: ${config.version}

*💡 TIPS:*
Gunakan button di bawah untuk navigasi cepat!
    `.trim();
    
    if (videoBuffer) {
        await baileys.sendVideo(from, videoBuffer, menuText, msg, {
            buttons: ButtonBuilder.createMainMenu()
        });
    } else {
        await baileys.sendButton(from, menuText, ButtonBuilder.createMainMenu(), msg);
    }
}

module.exports = handler;
