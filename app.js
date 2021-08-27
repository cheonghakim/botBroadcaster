const dotenv = require("dotenv");
dotenv.config();
const { Tmi } = require("./modules/tmi");
const shell = require("shelljs");

class Main {
  constructor() {
    this.client = new Tmi().tmiConnect();
    this.authList = ["public_04", "sangchubot", "rombot"];
    this.connect();
  }
  connect() {
    try {
      this.client.connect();
      this.client.on("message", (channel, tags, message, self) => {
        if (self || !message || !this.authList.includes(tags.username)) return;
        if (message.includes("ai doya")) {
          //   shell.exec("cd /home/bot & yarn start", (code, stdout, stderr) => {
          //     if (stderr) {
          //       this.client.say(channel, stderr);
          //     } else {
          //       this.client.say(channel, stdout);
          //     }
          //   });
          shell.exec("cd /home/bot");
          shell.exec("yarn start");
        } else if (message.includes("ai rom")) {
          shell.exec("cd /home/rom/bot");
          shell.exec("yarn start");
        } else if (message.includes("ai chu")) {
          shell.exec("cd /home/chu/bot");
          shell.exec("yarn start");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  async main() {}
}

try {
  new Main();
} catch (error) {
  console.log(error);
}
