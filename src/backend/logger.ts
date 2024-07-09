// https://github.com/SteamDeckHomebrew/decky-loader/blob/88dfd476e5b0bf3243e695a374f3ea1d10e4ed99/frontend/src/logger.ts

export const log = (name: string, ...args: any[]) => {
  console.log(
    `%c Decky %c ${name} %c`,
    "background: #16a085; color: black;",
    "background: #1abc9c; color: black;",
    "background: transparent;",
    ...args
  );
};

export const debug = (name: string, ...args: any[]) => {
  console.debug(
    `%c Decky %c ${name} %c`,
    "background: #16a085; color: black;",
    "background: #1abc9c; color: black;",
    "color: blue;",
    ...args
  );
};

export const warn = (name: string, ...args: any[]) => {
  console.warn(
    `%c Decky %c ${name} %c`,
    "background: #16a085; color: black;",
    "background: #ffbb00; color: black;",
    "color: blue;",
    ...args
  );
};

export const error = (name: string, ...args: any[]) => {
  console.error(
    `%c Decky %c ${name} %c`,
    "background: #16a085; color: black;",
    "background: #FF0000;",
    "background: transparent;",
    ...args
  );
};

class Logger {
  private logEnabled: boolean;

  constructor(private name: string, enabled: boolean = false) {
    this.name = name;
    this.logEnabled = enabled;
  }

  log(...args: any[]) {
    if (this.logEnabled) log(this.name, ...args);
  }

  debug(...args: any[]) {
    if (this.logEnabled) debug(this.name, ...args);
  }

  warn(...args: any[]) {
    if (this.logEnabled) warn(this.name, ...args);
  }

  error(...args: any[]) {
    if (this.logEnabled) error(this.name, ...args);
  }
}

export default Logger;
