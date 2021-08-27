const tmi = require("tmi.js");
const dotenv = require("dotenv");
dotenv.config();
class Tmi {
  constructor() {}
  tmiConnect() {
    return new tmi.Client({
      options: { debug: true, messagesLogLevel: "info" },
      connection: {
        reconnect: true,
        secure: true,
      },
      identity: {
        username: process.env.BOT,
        password: process.env.AUTH,
      },
      channels: [process.env.CHANNEL],
    });
  }
}

module.exports = {
  Tmi,
};
