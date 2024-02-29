const { I } = inject();

module.exports = {
  assignToMe: '#action_claim',
  myWorkTabLink: '//a[contains(.,"My work")]',
  manageTaskLink: '.govuk-accordion__section-button',
  goToTaskLink: '#action_go',
  async clickAssignToMeLink(task) {
    let taskLocator = `//a[contains(.,"${task}")]`;
    await this.verifyTaskIsAvailable();
    I.waitForElement(taskLocator, 15);
    await I.click(taskLocator);
  },

  async isTaskVisible(taskLocator) {
    let timeoutCounter = 0;
    let isTaskTextVisible = I.see('Active tasks');
    await I.wait(120);
    try {
      if (isTaskTextVisible) {
        await I.refreshPage();
        I.wait(10);
        //page refresh takes time on exui -exui limitation
        await I.waitForElement(this.assignToMe, 20);
        await I.click(this.assignToMe);
        I.waitForElement(taskLocator, 15);
        await I.click(taskLocator);
        return true;
      } else {
        await I.refreshPage();
      }
    } catch (e) {
      console.error('Something else had happened,Task is not visible', e.message);
    }
    timeoutCounter += 1;
    await I.wait(10);
    return timeoutCounter < 5;
  },
  async verifyTaskIsAvailable() {
    let initialAttempts = 0;
    let maxAttempt = 6;
    while (initialAttempts < maxAttempt) {
      try {
        I.see('Active tasks');
        // cron job refreshes every 5 minutes
        I.wait(300);
        await I.refreshPage();
        await I.waitForElement(this.assignToMe, 20);
        await I.click(this.assignToMe);
        return;
      } catch (e) {
        await I.refreshPage();
        initialAttempts++;
        await new Promise(resolve => setTimeout(resolve, 20));
      }
    }
    console.error('task is not loading after multiple attempt');
  },
};
