export type LogLevel = 'error' | 'warn' | 'info' | 'debug';
const LEVELS: LogLevel[] = ['error', 'warn', 'info', 'debug'];

let logLevel: LogLevel = 'info';  // default log level

export const setLogLevel = (level: LogLevel) => {
  if (level && LEVELS.indexOf(level) >= 0) {
    logLevel = level;
  }
};

const log = (message: string, level: LogLevel = 'info') => {
  if (LEVELS.indexOf(level) <= LEVELS.indexOf(logLevel)) {
      console.log(`[${level.toUpperCase()}] ${message}`);
  }
};

export const logDebug = (msg: string) => log(msg, 'debug')
export const logInfo = (msg: string) => log(msg, 'info')
export const logWarn = (msg: string) => log(msg, 'warn')
export const logError = (msg: string) => log(msg, 'error')