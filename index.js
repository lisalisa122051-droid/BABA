const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys');
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const qrcode = require('qrcode-terminal');
const config = require('./config');
const handler = require('./handler');

// Global variables
global.db = require('./lib/database');
global.runtime = require('./lib/runtime');
global.format = require('./lib/formatter');

// Load Database
db.loadDatabase();

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, config.session));
    
    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(chalk.green(`Using WA v${version.join('.')}, isLatest: ${isLatest}`));

    const sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
        },
        browser: ['Ubuntu', 'Chrome', '20.0.04'],
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        syncFullHistory: false,
        defaultQueryTimeoutMs: 60000
    });

    // Save credentials
    sock.ev.on('creds.update', saveCreds);

    // Connection update
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            qrcode.generate(qr, { small: true });
            console.log(chalk.yellow('Scan QR code di atas dengan WhatsApp Anda'));
        }
        
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut);
            console.log(chalk.red('Koneksi terputus, mencoba menyambung kembali...', lastDisconnect.error));
            
            if (shouldReconnect) {
                setTimeout(() => connectToWhatsApp(), 5000);
            }
        } else if (connection === 'open') {
            console.log(chalk.green('✓ Bot berhasil terhubung!'));
            console.log(chalk.cyan(`Bot Name: ${config.name}`));
            console.log(chalk.cyan(`Prefix: ${config.prefix.join(', ')}`));
            
            // Update bot info
            sock.updateProfileName(config.name).catch(() => {});
        }
    });

    // Message handler
    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.fromMe) return;
        
        try {
            await handler(sock, msg);
        } catch (error) {
            console.error(chalk.red('Handler Error:'), error);
        }
    });

    // Typing indicator
    sock.ev.on('messages.upsert', async (m) => {
        if (config.settings.autotyping) {
            const msg = m.messages[0];
            if (msg.key.remoteJid.endsWith('@s.whatsapp.net') && !msg.key.fromMe) {
                await sock.sendPresenceUpdate('composing', msg.key.remoteJid);
                setTimeout(async () => {
                    await sock.sendPresenceUpdate('paused', msg.key.remoteJid);
                }, 3000);
            }
        }
    });

    return sock;
}

// Start bot
connectToWhatsApp().catch(console.error);

// Handle process exit
process.on('uncaughtException', (err) => {
    console.error(chalk.red('Uncaught Exception:'), err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(chalk.red('Unhandled Rejection at:'), promise, 'reason:', reason);
});
