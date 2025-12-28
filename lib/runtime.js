const os = require('os');
const process = require('process');

class Runtime {
    constructor() {
        this.startTime = Date.now();
        this.commands = {};
        this.stats = {
            messages: 0,
            commands: 0,
            users: 0,
            groups: 0,
            errors: 0
        };
    }
    
    uptime() {
        return Date.now() - this.startTime;
    }
    
    formatUptime() {
        const uptime = this.uptime();
        const seconds = Math.floor(uptime / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        return `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`;
    }
    
    systemInfo() {
        return {
            platform: os.platform(),
            arch: os.arch(),
            cpu: os.cpus()[0].model,
            cores: os.cpus().length,
            memory: {
                total: os.totalmem(),
                free: os.freemem(),
                used: os.totalmem() - os.freemem()
            },
            node: process.version,
            pid: process.pid,
            uptime: this.formatUptime()
        };
    }
    
    addCommand(name) {
        if (!this.commands[name]) {
            this.commands[name] = 0;
        }
        this.commands[name]++;
        this.stats.commands++;
    }
    
    addMessage() {
        this.stats.messages++;
    }
    
    addError() {
        this.stats.errors++;
    }
    
    getTopCommands(limit = 10) {
        return Object.entries(this.commands)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([cmd, count]) => ({ command: cmd, count }));
    }
    
    getStats() {
        const sys = this.systemInfo();
        const memUsage = process.memoryUsage();
        
        return {
            runtime: this.formatUptime(),
            messages: this.stats.messages,
            commands: this.stats.commands,
            errors: this.stats.errors,
            memory: {
                rss: this.formatSize(memUsage.rss),
                heap: this.formatSize(memUsage.heapUsed),
                total: this.formatSize(memUsage.heapTotal)
            },
            system: {
                cpu: sys.cpu,
                cores: sys.cores,
                memory: `${this.formatSize(sys.memory.used)} / ${this.formatSize(sys.memory.total)}`
            },
            topCommands: this.getTopCommands(5)
        };
    }
    
    formatSize(bytes) {
        const sizes = ['B', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 B';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
}

module.exports = new Runtime();
