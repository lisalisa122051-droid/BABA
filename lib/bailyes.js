const { downloadContentFromMessage, proto, getContentType } = require('@whiskeysockets/baileys');
const fs = require('fs-extra');
const path = require('path');

class BaileysHelper {
    constructor(sock) {
        this.sock = sock;
    }
    
    async sendMessage(jid, content, options = {}) {
        try {
            return await this.sock.sendMessage(jid, content, {
                quoted: options.quoted,
                mentions: options.mentions,
                ephemeralExpiration: options.expiration,
                ...options
            });
        } catch (error) {
            console.error('Send message error:', error);
            return null;
        }
    }
    
    async sendText(jid, text, quoted = null) {
        return await this.sendMessage(jid, { text }, { quoted });
    }
    
    async sendImage(jid, buffer, caption = '', quoted = null) {
        return await this.sendMessage(jid, {
            image: buffer,
            caption: caption
        }, { quoted });
    }
    
    async sendVideo(jid, buffer, caption = '', quoted = null) {
        return await this.sendMessage(jid, {
            video: buffer,
            caption: caption
        }, { quoted });
    }
    
    async sendAudio(jid, buffer, ptt = true, quoted = null) {
        return await this.sendMessage(jid, {
            audio: buffer,
            ptt: ptt
        }, { quoted });
    }
    
    async sendSticker(jid, buffer, quoted = null) {
        return await this.sendMessage(jid, {
            sticker: buffer
        }, { quoted });
    }
    
    async sendDocument(jid, buffer, fileName, caption = '', quoted = null) {
        return await this.sendMessage(jid, {
            document: buffer,
            fileName: fileName,
            caption: caption
        }, { quoted });
    }
    
    async sendButton(jid, content, buttons, quoted = null) {
        return await this.sendMessage(jid, {
            text: content,
            footer: global.config.name,
            buttons: buttons,
            headerType: 1
        }, { quoted });
    }
    
    async sendList(jid, title, text, buttonText, sections, quoted = null) {
        return await this.sendMessage(jid, {
            title: title,
            text: text,
            footer: global.config.name,
            buttonText: buttonText,
            sections: sections
        }, { quoted });
    }
    
    async downloadMediaMessage(msg) {
        try {
            const type = Object.keys(msg.message)[0];
            const mimeMap = {
                imageMessage: 'image',
                videoMessage: 'video',
                audioMessage: 'audio',
                documentMessage: 'document',
                stickerMessage: 'sticker'
            };
            
            const stream = await downloadContentFromMessage(msg.message[type], mimeMap[type] || 'image');
            let buffer = Buffer.from([]);
            
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            
            return buffer;
        } catch (error) {
            console.error('Download error:', error);
            return null;
        }
    }
    
    async getFile(buffer, ext) {
        const filename = `${Date.now()}.${ext}`;
        const filepath = path.join(__dirname, '../temp', filename);
        await fs.writeFile(filepath, buffer);
        return filepath;
    }
    
    async getContact(jid) {
        try {
            const contact = await this.sock.onWhatsApp(jid);
            return contact?.[0] || null;
        } catch (error) {
            return null;
        }
    }
    
    async readMessage(key) {
        if (global.config.settings.autoread) {
            await this.sock.readMessages([key]);
        }
    }
}

module.exports = BaileysHelper;
