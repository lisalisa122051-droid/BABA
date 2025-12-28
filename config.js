global.config = {
    name: "🌸 NebulaBot-MD",
    version: "3.0.0",
    author: "Nebula Team",
    prefix: [".", "!", "/", "#"],
    session: "session",
    mods: [],
    admins: [],
    supportGroup: "",
    owner: ["628xxxxxx@s.whatsapp.net"],
    
    // Database Settings
    database: {
        path: "./database",
        user: "user.json",
        group: "group.json",
        premium: "premium.json"
    },
    
    // Bot Settings
    settings: {
        self: false,
        autoread: true,
        autotyping: true,
        runtime: true,
        multiPrefix: true,
        limitCount: 30,
        premiumLimit: 1000
    },
    
    // API Keys (isi dengan API Anda)
    api: {
        openai: "sk-xxx",
        google: "AIzaSyxxx",
        unsplash: "xxx",
        tmdb: "xxx"
    }
};

module.exports = config;
