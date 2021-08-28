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
        if (message.includes("ai on")) {
          shell.cd("../bot");
          const { stdout1 } = shell.exec("git branch");
          const { stderr1 } = shell.exec("git checkout test-b");
          this.client.say(channel, `${stderr1}`);
          const { stdout, stderr, code } = shell.exec("yarn start");
          if (stderr) this.client.say(channel, `${stderr}`);
          if (stdout) this.client.say(channel, stdout);
        } else {
          try {
            const splited = message.split(" ");
            if (splited) {
              console.log(splited.slice(1).join(" "));
              const { stdout, stderr, code } = shell[splited[0]](
                splited.slice(1).join(" ")
              );
              if (stderr) this.client.say(channel, `${stderr}`);
              if (stdout) this.client.say(channel, stdout);
            }
          } catch (error) {
            this.client.say(channel, `${error}`);
          }
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
