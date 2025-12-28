const fs = require('fs-extra');
const path = require('path');
const config = require('../config');

class Database {
    constructor() {
        this.userDB = path.join(config.database.path, config.database.user);
        this.groupDB = path.join(config.database.path, config.database.group);
        this.premiumDB = path.join(config.database.path, config.database.premium);
        
        this.users = {};
        this.groups = {};
        this.premium = [];
        
        this.init();
    }
    
    init() {
        fs.ensureDirSync(config.database.path);
        
        if (!fs.existsSync(this.userDB)) fs.writeJSONSync(this.userDB, {});
        if (!fs.existsSync(this.groupDB)) fs.writeJSONSync(this.groupDB, {});
        if (!fs.existsSync(this.premiumDB)) fs.writeJSONSync(this.premiumDB, []);
    }
    
    loadDatabase() {
        try {
            this.users = fs.readJSONSync(this.userDB);
            this.groups = fs.readJSONSync(this.groupDB);
            this.premium = fs.readJSONSync(this.premiumDB);
            console.log(`✓ Database loaded: ${Object.keys(this.users).length} users, ${Object.keys(this.groups).length} groups`);
        } catch (error) {
            console.error('Database load error:', error);
        }
    }
    
    saveDatabase(type = 'all') {
        try {
            if (type === 'user' || type === 'all') {
                fs.writeJSONSync(this.userDB, this.users, { spaces: 2 });
            }
            if (type === 'group' || type === 'all') {
                fs.writeJSONSync(this.groupDB, this.groups, { spaces: 2 });
            }
            if (type === 'premium' || type === 'all') {
                fs.writeJSONSync(this.premiumDB, this.premium, { spaces: 2 });
            }
        } catch (error) {
            console.error('Database save error:', error);
        }
    }
    
    // User Management
    addUser(jid) {
        const normalizedJid = jid.includes('@') ? jid.split('@')[0] : jid;
        const userId = `${normalizedJid}@s.whatsapp.net`;
        
        if (!this.users[userId]) {
            this.users[userId] = {
                jid: userId,
                name: '',
                limit: config.settings.limitCount,
                premium: false,
                role: 'user',
                lastSeen: new Date().toISOString(),
                totalCommand: 0,
                registeredAt: new Date().toISOString(),
                banned: false
            };
            this.saveDatabase('user');
            return true;
        }
        return false;
    }
    
    getUser(jid) {
        const userId = jid.includes('@') ? jid : `${jid}@s.whatsapp.net`;
        return this.users[userId] || null;
    }
    
    updateUser(jid, data) {
        const user = this.getUser(jid);
        if (user) {
            Object.assign(user, data);
            user.lastSeen = new Date().toISOString();
            this.saveDatabase('user');
            return true;
        }
        return false;
    }
    
    addLimit(jid, amount = 1) {
        const user = this.getUser(jid);
        if (user && !user.premium) {
            user.limit -= amount;
            if (user.limit < 0) user.limit = 0;
            this.saveDatabase('user');
            return user.limit;
        }
        return user?.limit || 0;
    }
    
    // Group Management
    addGroup(jid) {
        if (!this.groups[jid]) {
            this.groups[jid] = {
                jid,
                name: '',
                admins: [],
                welcome: false,
                antilink: false,
                nsfw: false,
                mute: false,
                created: new Date().toISOString()
            };
            this.saveDatabase('group');
            return true;
        }
        return false;
    }
    
    getGroup(jid) {
        return this.groups[jid] || null;
    }
    
    // Premium Management
    addPremium(jid, duration = 30) {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + duration);
        
        const premiumData = {
            jid,
            addedAt: new Date().toISOString(),
            expiresAt: expiry.toISOString(),
            active: true
        };
        
        this.premium.push(premiumData);
        this.updateUser(jid, { premium: true, limit: config.settings.premiumLimit });
        this.saveDatabase('premium');
        return premiumData;
    }
    
    checkPremium(jid) {
        const user = this.getUser(jid);
        if (user?.premium) {
            const premiumData = this.premium.find(p => p.jid === jid && p.active);
            if (premiumData) {
                if (new Date(premiumData.expiresAt) < new Date()) {
                    this.updateUser(jid, { premium: false, limit: config.settings.limitCount });
                    premiumData.active = false;
                    this.saveDatabase();
                    return false;
                }
                return true;
            }
        }
        return false;
    }
}

module.exports = new Database();
