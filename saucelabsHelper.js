const Helper = require('@codeceptjs/helper');

class CustomHelper extends Helper {
  async after() {
    const sessionId = this.helpers['WebDriver'].browser.sessionId;
    console.log(`Session ID: ${sessionId}`);
  }
}

module.exports = CustomHelper;
