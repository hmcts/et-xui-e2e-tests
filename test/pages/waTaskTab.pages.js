const { I } = inject();

module.exports = {
  assignToMe: '#action_claim',
  assignTo: '#action_assign',
  myWorkTabLink: '//a[contains(.,"My work")]',
  manageTaskLink: '.govuk-accordion__section-button',
  judicialOption: '#JUDICIAL',
  legalOption: '#LEGAL_OPERATIONS',
  goToTaskLink: '#action_go',
  selectPersonInput: '#inputSelectPerson',
  selectPerson: '#mat-option-0 > span',
  isJudgementYes: '#draftAndSignJudgement_isJudgement_Yes',
  uploadFileButton: '[type="file"]',

  async clickAssignToMeLink(task) {
    let taskLocator = `//a[contains(.,"${task}")]`;
    await this.verifyTaskIsAvailable();
    I.waitForElement(taskLocator, 25);
    await I.click(taskLocator);
  },

  async clickAssignToLink(task, roleType) {
    I.scrollPageToBottom();

    let taskContainer = `//exui-case-task[.//strong[contains(.,"${task}")]]`;
    let assignTaskAnchor = '#event > div > div > div > exui-case-task:nth-child(6)  #action_assign';

    await I.wait(90);
    await I.refreshPage();
    await I.wait(10);
    await I.scrollPageToBottom();
    await I.wait(10);
    await I.scrollTo(taskContainer);
    await I.click(assignTaskAnchor);
    await I.wait(10);
    if (roleType === 'JUDICIAL') {
      await I.checkOption(this.judicialOption);
      await I.click('Continue');
    } else {
      await I.checkOption(this.legalOption);
      await I.click('Continue');
    }
  },

  async assignToAPerson(person) {
    I.waitForElement(this.selectPersonInput, 15);
    I.fillField(this.selectPersonInput, person);
    I.waitForElement(this.selectPerson, 10);
    I.click(this.selectPerson);
    I.wait(5);
    I.click('Continue');
    I.waitForElement('#main-content button', 10);
    I.click('#main-content button');
  },

  async issueJudgeMent(task) {
    let taskLocator = `//a[contains(.,"${task}")]`;
    I.waitForElement(taskLocator, 25);
    await I.click(taskLocator);
    await I.see('Draft and Sign Judgement');
    await I.waitForElement(this.isJudgementYes, 10);
    I.attachFile(this.uploadFileButton, '/test/data/RET_newBug.png');
    I.click('Continue');
    I.waitForText('Check your answers', 5);
    I.click('Submit');
    I.waitForText('has been updated with event: Draft and Sign Judgement', 10);
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
        I.refreshPage();
        // cron job refreshes every 5 minutes
        I.wait(320);
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
