import { existsSync, mkdirSync, appendFile } from 'fs';
import { join } from 'path';

// Clase Log
class Log {
    constructor(id, level, module, message) {
        this.id = id;
        this.level = level;
        this.module = module;
        this.message = message;
        this.timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
    }

    // Formato del log para ser escrito en el archivo
    toString() {
        return `[ID: ${this.id}] [${this.level.toUpperCase()}] [${this.module}] [${this.timestamp}] ${this.message}`;
    }
}

// Clase LoggerManager
class LoggerManager {
    constructor() {
        this.logs = [];
        this.id_counter = 1;
        this.logDirectory = join(__dirname, 'logs');

        // Crear la carpeta 'logs' si no existe
        if (!existsSync(this.logDirectory)) {
            mkdirSync(this.logDirectory);
        }
    }

    // Método para agregar un log
    addLog(level, module, message) {
        const newLog = new Log(this.id_counter, level, module, message);
        this.logs.push(newLog);
        this.id_counter++;

        // Escribir el log en un archivo
        this.writeLogToFile(newLog);
    }

    // Método para escribir el log en el archivo
    writeLogToFile(log) {
        const logFilePath = join(this.logDirectory, 'log.txt');
        const logMessage = log.toString() + '\n';

        // Agregar el log al archivo
        appendFile(logFilePath, logMessage, (err) => {
            if (err) throw err;
            console.log('Log saved:', logMessage);
        });
    }
}

// Ejemplo de uso
const logger = new LoggerManager();
logger.addLog('info', 'app.js', 'Usuario suscripto con éxito');
logger.addLog('error', 'app.js', 'Error al registrar usuario');
