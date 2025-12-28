const { default: makeWASocket } = require('@whiskeysockets/baileys');

class ButtonBuilder {
    static createMainMenu() {
        return [
            {
                buttonId: '.allmenu',
                buttonText: { displayText: '📜 ALL MENU' },
                type: 1
            },
            {
                buttonId: '.ownermenu',
                buttonText: { displayText: '👑 OWNER MENU' },
                type: 1
            },
            {
                buttonId: '.groupmenu',
                buttonText: { displayText: '👥 GROUP MENU' },
                type: 1
            },
            {
                buttonId: '.downloadmenu',
                buttonText: { displayText: '⬇️ DOWNLOAD MENU' },
                type: 1
            },
            {
                buttonId: '.funmenu',
                buttonText: { displayText: '🎮 FUN MENU' },
                type: 1
            },
            {
                buttonId: '.aimenu',
                buttonText: { displayText: '🤖 AI MENU' },
                type: 1
            },
            {
                buttonId: '.stickermenu',
                buttonText: { displayText: '🎨 STICKER MENU' },
                type: 1
            },
            {
                buttonId: '.toolsmenu',
                buttonText: { displayText: '🛠️ TOOLS MENU' },
                type: 1
            }
        ];
    }
    
    static createOwnerMenu() {
        return [
            {
                buttonId: '.eval',
                buttonText: { displayText: '⚙️ EVAL CODE' },
                type: 1
            },
            {
                buttonId: '.exec',
                buttonText: { displayText: '💻 EXEC CMD' },
                type: 1
            },
            {
                buttonId: '.broadcast',
                buttonText: { displayText: '📢 BROADCAST' },
                type: 1
            },
            {
                buttonId: '.back',
                buttonText: { displayText: '🔙 BACK TO MENU' },
                type: 1
            }
        ];
    }
    
    static createGroupMenu() {
        return [
            {
                buttonId: '.kick @tag',
                buttonText: { displayText: '🚫 KICK USER' },
                type: 1
            },
            {
                buttonId: '.add 628xxx',
                buttonText: { displayText: '➕ ADD USER' },
                type: 1
            },
            {
                buttonId: '.promote @tag',
                buttonText: { displayText: '📈 PROMOTE' },
                type: 1
            },
            {
                buttonId: '.demote @tag',
                buttonText: { displayText: '📉 DEMOTE' },
                type: 1
            },
            {
                buttonId: '.back',
                buttonText: { displayText: '🔙 BACK' },
                type: 1
            }
        ];
    }
    
    static createDownloadMenu() {
        return [
            {
                buttonId: '.ytmp4 url',
                buttonText: { displayText: '🎬 YT MP4' },
                type: 1
            },
            {
                buttonId: '.ytmp3 url',
                buttonText: { displayText: '🎵 YT MP3' },
                type: 1
            },
            {
                buttonId: '.igdl url',
                buttonText: { displayText: '📷 IG DOWNLOAD' },
                type: 1
            },
            {
                buttonId: '.ttdl url',
                buttonText: { displayText: '📹 TIKTOK DL' },
                type: 1
            },
            {
                buttonId: '.fbdl url',
                buttonText: { displayText: '📘 FACEBOOK DL' },
                type: 1
            },
            {
                buttonId: '.back',
                buttonText: { displayText: '🔙 BACK' },
                type: 1
            }
        ];
    }
    
    static createFunMenu() {
        return [
            {
                buttonId: '.jadian',
                buttonText: { displayText: '💘 JADIAN' },
                type: 1
            },
            {
                buttonId: '.apakah',
                buttonText: { displayText: '❓ APAKAH' },
                type: 1
            },
            {
                buttonId: '.kapankah',
                buttonText: { displayText: '📅 KAPANKAH' },
                type: 1
            },
            {
                buttonId: '.bisakah',
                buttonText: { displayText: '🤔 BISAKAH' },
                type: 1
            },
            {
                buttonId: '.rate',
                buttonText: { displayText: '⭐ RATE' },
                type: 1
            },
            {
                buttonId: '.back',
                buttonText: { displayText: '🔙 BACK' },
                type: 1
            }
        ];
    }
    
    static createAIMenu() {
        return [
            {
                buttonId: '.ai pertanyaan',
                buttonText: { displayText: '🤖 CHATGPT' },
                type: 1
            },
            {
                buttonId: '.dalle prompt',
                buttonText: { displayText: '🎨 DALL-E' },
                type: 1
            },
            {
                buttonId: '.gemini pertanyaan',
                buttonText: { displayText: '🔮 GEMINI' },
                type: 1
            },
            {
                buttonId: '.blackbox pertanyaan',
                buttonText: { displayText: '📦 BLACKBOX' },
                type: 1
            },
            {
                buttonId: '.back',
                buttonText: { displayText: '🔙 BACK' },
                type: 1
            }
        ];
    }
    
    static createStickerMenu() {
        return [
            {
                buttonId: '.sticker',
                buttonText: { displayText: '🖼️ TO STICKER' },
                type: 1
            },
            {
                buttonId: '.stickergif',
                buttonText: { displayText: '🎞️ GIF STICKER' },
                type: 1
            },
            {
                buttonId: '.ttp text',
                buttonText: { displayText: '✏️ TTP STICKER' },
                type: 1
            },
            {
                buttonId: '.attp text',
                buttonText: { displayText: '🌈 ATTP STICKER' },
                type: 1
            },
            {
                buttonId: '.back',
                buttonText: { displayText: '🔙 BACK' },
                type: 1
            }
        ];
    }
}

module.exports = ButtonBuilder;
