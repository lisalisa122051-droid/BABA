class ListMenuBuilder {
    static createMainMenu() {
        return {
            title: "🌸 NEBULA BOT MAIN MENU 🌸",
            rows: [
                {
                    title: "📜 ALL MENU",
                    description: "Tampilkan semua menu (1000+ fitur)",
                    rowId: ".allmenu"
                },
                {
                    title: "👑 OWNER MENU",
                    description: "Menu khusus owner bot",
                    rowId: ".ownermenu"
                },
                {
                    title: "👥 GROUP MENU",
                    description: "Fitur pengelolaan grup",
                    rowId: ".groupmenu"
                },
                {
                    title: "⬇️ DOWNLOAD MENU",
                    description: "Download dari berbagai platform",
                    rowId: ".downloadmenu"
                },
                {
                    title: "🎮 FUN MENU",
                    description: "Permainan & hiburan",
                    rowId: ".funmenu"
                },
                {
                    title: "🤖 AI MENU",
                    description: "Kecerdasan buatan",
                    rowId: ".aimenu"
                },
                {
                    title: "🎨 STICKER MENU",
                    description: "Buat sticker keren",
                    rowId: ".stickermenu"
                },
                {
                    title: "🔎 SEARCH MENU",
                    description: "Pencarian berbagai hal",
                    rowId: ".searchmenu"
                },
                {
                    title: "🛠️ TOOLS MENU",
                    description: "Alat-alat bermanfaat",
                    rowId: ".toolsmenu"
                },
                {
                    title: "☪️ ISLAM MENU",
                    description: "Fitur keislaman",
                    rowId: ".islammenu"
                }
            ]
        };
    }
    
    static createAllMenu() {
        const sections = [
            {
                title: "👑 OWNER COMMANDS",
                rows: [
                    { title: "🔄 RESTART BOT", description: "Restart bot system", rowId: ".restart" },
                    { title: "⚙️ EVAL CODE", description: "Execute JavaScript code", rowId: ".eval" },
                    { title: "💻 EXEC CMD", description: "Execute shell command", rowId: ".exec" },
                    { title: "📢 BROADCAST", description: "Broadcast message", rowId: ".bc" },
                    { title: "🔧 SET PREFIX", description: "Change bot prefix", rowId: ".setprefix" },
                    { title: "👤 ADD PREMIUM", description: "Add premium user", rowId: ".addprem" },
                    { title: "📊 BOT STATS", description: "View bot statistics", rowId: ".stats" }
                ]
            },
            {
                title: "👥 GROUP COMMANDS",
                rows: [
                    { title: "🚫 KICK MEMBER", description: "Kick user from group", rowId: ".kick" },
                    { title: "➕ ADD MEMBER", description: "Add user to group", rowId: ".add" },
                    { title: "📈 PROMOTE", description: "Make user admin", rowId: ".promote" },
                    { title: "📉 DEMOTE", description: "Remove admin", rowId: ".demote" },
                    { title: "🔒 GROUP SETTINGS", description: "Group configuration", rowId: ".groupset" },
                    { title: "🚫 ANTILINK", description: "Enable/disable antilink", rowId: ".antilink" },
                    { title: "👋 WELCOME", description: "Welcome message settings", rowId: ".welcome" }
                ]
            },
            {
                title: "⬇️ DOWNLOAD COMMANDS",
                rows: [
                    { title: "🎬 YOUTUBE MP4", description: "Download YouTube video", rowId: ".ytmp4" },
                    { title: "🎵 YOUTUBE MP3", description: "Download YouTube audio", rowId: ".ytmp3" },
                    { title: "📷 INSTAGRAM", description: "Download IG post/reel", rowId: ".igdl" },
                    { title: "📹 TIKTOK", description: "Download TikTok video", rowId: ".ttdl" },
                    { title: "📘 FACEBOOK", description: "Download FB video", rowId: ".fbdl" },
                    { title: "🎵 SPOTIFY", description: "Download Spotify track", rowId: ".spotify" }
                ]
            },
            {
                title: "🎮 FUN COMMANDS",
                rows: [
                    { title: "💘 JADIAN", description: "Cek kecocokan jadian", rowId: ".jadian" },
                    { title: "❓ APAKAH", description: "Tanya apakah...", rowId: ".apakah" },
                    { title: "📅 KAPANKAH", description: "Tanya kapankah...", rowId: ".kapankah" },
                    { title: "🤔 BISAKAH", description: "Tanya bisakah...", rowId: ".bisakah" },
                    { title: "⭐ RATE", description: "Rate sesuatu 1-100", rowId: ".rate" },
                    { title: "🎰 SLOT", description: "Game slot machine", rowId: ".slot" },
                    { title: "🎯 TEBAK GAMBAR", description: "Game tebak gambar", rowId: ".tebakgambar" }
                ]
            }
        ];
        
        return sections;
    }
    
    static createSearchMenu() {
        return [
            {
                title: "🔎 SEARCH SECTION",
                rows: [
                    { title: "📖 GOOGLE SEARCH", description: "Search on Google", rowId: ".google" },
                    { title: "🎬 FILM SEARCH", description: "Search movies", rowId: ".film" },
                    { title: "📚 WIKIPEDIA", description: "Search Wikipedia", rowId: ".wiki" },
                    { title: "🎵 LIRIK LAGU", description: "Find song lyrics", rowId: ".lirik" },
                    { title: "🖼️ PINTEREST", description: "Search images", rowId: ".pinterest" },
                    { title: "📰 BERITA", description: "Latest news", rowId: ".berita" }
                ]
            }
        ];
    }
}

module.exports = ListMenuBuilder;
