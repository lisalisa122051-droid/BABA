const moment = require('moment-timezone');

class Formatter {
    static formatDate(date = new Date()) {
        return moment(date).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss');
    }
    
    static formatNumber(num) {
        return new Intl.NumberFormat('id-ID').format(num);
    }
    
    static formatSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    static formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes}m ${secs}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${secs}s`;
        } else {
            return `${secs}s`;
        }
    }
    
    static stylishText(text, style = 'default') {
        const styles = {
            bold: (t) => `*${t}*`,
            italic: (t) => `_${t}_`,
            monospace: (t) => '```' + t + '```',
            quote: (t) => '> ' + t,
            small: (t) => t.toLowerCase(),
            fancy: (t) => {
                const fancyMap = {
                    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ', i: 'ɪ',
                    j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ',
                    s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
                };
                return t.split('').map(c => fancyMap[c.toLowerCase()] || c).join('');
            }
        };
        
        return styles[style] ? styles[style](text) : text;
    }
    
    static parseMention(text) {
        const mentionRegex = /@([0-9]{5,20})/g;
        const matches = [...text.matchAll(mentionRegex)];
        return matches.map(m => m[1] + '@s.whatsapp.net');
    }
    
    static getRandom(items) {
        return items[Math.floor(Math.random() * items.length)];
    }
    
    static msToTime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 0) return `${days}d ${hours % 24}h`;
        if (hours > 0) return `${hours}h ${minutes % 60}m`;
        if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
        return `${seconds}s`;
    }
}

module.exports = Formatter;
