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
          shell.exec(
            "cd ../bot & git checkout test-b",
            (code, stdout, stderr) => {
              if (stderr) {
                this.client.say(channel, stderr);
                shell.exec(`cd ../bot & yarn start`);
              } else {
                shell.exec(`yarn start`);
                this.client.say(channel, "KonCha ");
              }
            }
          );
        } else if (message.includes("ai rom")) {
          shell.exec(
            "cd ../bot & git checkout rombot",
            (code, stdout, stderr) => {
              if (stderr) {
                this.client.say(channel, stderr);
                shell.exec(`cd ../bot & yarn start`);
              } else {
                shell.exec(`yarn start`);
                this.client.say(channel, "KonCha ");
              }
            }
          );
        } else if (message.includes("ai chu")) {
          shell.exec(
            "cd ../bot & git checkout chubot-v1",
            (code, stdout, stderr) => {
              if (stderr) {
                this.client.say(channel, stderr);
                shell.exec(`cd ../bot & yarn start`);
              } else {
                shell.exec(`yarn start`);
                this.client.say(channel, "KonCha ");
              }
            }
          );
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
