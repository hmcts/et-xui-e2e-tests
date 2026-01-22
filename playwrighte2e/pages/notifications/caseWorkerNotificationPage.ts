import { BasePage } from "../basePage.ts";
import { expect, Locator, Page } from '@playwright/test';

export default class CaseWorkerNotificationPage extends BasePage {
  private readonly enterNotificationText: Locator;
  private readonly letterToSendOutRadio: Locator;
  private readonly notificationSubjectCheckbox: Locator;
  private readonly selectedHearingDropdown: Locator;
  private readonly isCMOOrRequestRadio: Locator;
  private readonly isResponseToTribunalRadio: Locator;
  private readonly selectPartiesToRespondDropdown: Locator;
  private readonly whoMadeCMORadio: Locator;
  private readonly fullNameTextBox: Locator;
  private readonly whoMadeJudgmentRadio: Locator;
  private readonly decisionRadio: Locator;
  private readonly eccNotificationRadio: Locator;
  private readonly partiesToNotifyRadio: Locator;
  private readonly additionalInformationTextBox: Locator;

  notificationDropDown = '#claimantSelectNotification';
  notification_link = 'text=Send a notification';
  respondToNotificationLink = 'text=Respond to an order or request from the tribunal';

  constructor(page: Page) {
    super(page);
    this.enterNotificationText = page.locator(`#sendNotificationTitle`);
    this.letterToSendOutRadio = page.locator(`#sendNotificationLetter`);
    this.notificationSubjectCheckbox = page.locator(`#sendNotificationSubject`);
    this.selectedHearingDropdown = page.locator(`#sendNotificationSelectHearing`);
    this.isCMOOrRequestRadio = page.locator(`#sendNotificationCaseManagement`);
    this.isResponseToTribunalRadio = page.locator(`#sendNotificationResponseTribunal`);
    this.selectPartiesToRespondDropdown = page.locator(`#sendNotificationSelectParties`);
    this.whoMadeCMORadio = page.locator(`#sendNotificationWhoCaseOrder`);
    this.fullNameTextBox = page.getByLabel('Full name');
    this.whoMadeJudgmentRadio = page.locator(`#sendNotificationWhoMadeJudgement`);
    this.decisionRadio = page.locator(`#sendNotificationDecision`);
    this.eccNotificationRadio = page.locator(`#sendNotificationEccQuestion`);
    this.partiesToNotifyRadio = page.locator(`#sendNotificationNotify`);
    this.additionalInformationTextBox = page.locator(`#sendNotificationAdditionalInfo`);
  }

  async navigateToSendANotifications() {
    await this.webActions.clickElementByText('Notifications');
    await this.webActions.clickElementByCss(this.notification_link);
  }

  async assertSendANotificationPage() {
    await expect(this.page.locator('ccd-case-edit-page')).toContainText('Send a notification');
  }
  async enterNotificationTitle(title: string) {
    await expect(this.enterNotificationText).toBeVisible();
    await this.enterNotificationText.fill(title);
  }

  async selectIsThereLetterToSendOut(option: string) {
    await expect(this.letterToSendOutRadio).toBeVisible();
    await this.letterToSendOutRadio.getByRole('radio', {name: option.toString()}).check();
  }

  async selectNotificationSubject(subject: string[]) {
    await expect(this.notificationSubjectCheckbox).toBeVisible();
    for (const subj of subject) {
      await this.notificationSubjectCheckbox.getByRole('checkbox', {name: subj}).check();
    }
  }

  // Hearing related methods

  async selectHearingDetails(hearingIndex: number) {
    await expect(this.selectedHearingDropdown).toBeVisible();
    await this.selectedHearingDropdown.selectOption({index: hearingIndex});
  }

  async selectCaseManagementOrRequest(option: string) {
    await this.webActions.waitForElementToBeVisible('text=Is this a case management order or request?');
    await expect(this.isResponseToTribunalRadio).toBeVisible();
    await this.isCMOOrRequestRadio.getByRole('radio', {name: option.toString()}).check();
  }

  async selectIsResponseToTribunal(option: string) {
    await expect(this.isResponseToTribunalRadio).toBeVisible();
    await this.isResponseToTribunalRadio.getByRole('radio', {name: option.toString()}).check();
  }

  async selectPartiesToRespond(option: string) {
    await expect(this.selectPartiesToRespondDropdown).toBeVisible();
    await this.selectPartiesToRespondDropdown.selectOption({label: option});
  }

  async selectWhoMadeTheCMO(option: string) {
    await this.webActions.waitForElementToBeVisible('text=Who made the case management order?');
    await expect(this.whoMadeCMORadio).toBeVisible();
    await this.whoMadeCMORadio.getByRole('radio', {name: option.toString()}).check();
  }

  async selectWhoMadeTheJudgment(option: string) {
    await expect(this.whoMadeJudgmentRadio).toBeVisible();
    await this.whoMadeJudgmentRadio.getByRole('radio', {name: option.toString()}).check();
  }

  async enterFullName(fullName: string) {
    await expect(this.fullNameTextBox).toBeVisible();
    await this.fullNameTextBox.fill(fullName);
  }

  async selectDecisionMade(option: string) {
    await expect(this.decisionRadio).toBeVisible();
    await this.decisionRadio.getByRole('radio', {name: option.toString()}).check();
  }

  async selectECCNotification(option: string) {
    await expect(this.eccNotificationRadio).toBeVisible();
    await this.eccNotificationRadio.getByRole('radio', {name: option.toString()}).check();
  }

  async enterAdditionalInformation(additionalInfo: string) {
    await expect(this.additionalInformationTextBox).toBeVisible();
    await this.additionalInformationTextBox.fill(additionalInfo);
  }

  async partiesToNotify(option: string) {
    await expect(this.partiesToNotifyRadio).toBeVisible();
    await this.partiesToNotifyRadio.getByRole('radio', {name: option.toString()}).check();
  }

  async sendNotification(notificationType: string, responseToTribunal: string = 'No', partiesToNotify: string = 'Both parties') {
    const notificationTitle = `Test Notification`;
    await this.assertSendANotificationPage();
    await this.enterNotificationTitle(notificationTitle);
    await this.selectIsThereLetterToSendOut("No");

    switch (notificationType) {
      case 'ET1 claim':
        await this.selectNotificationSubject(['Claim (ET1)']);
        break;
      case 'CMO':
        await this.selectNotificationSubject(['Case management orders / requests']);
        await this.selectCaseManagementOrRequest('Case management order');
        await this.selectIsResponseToTribunal(responseToTribunal);
        if( responseToTribunal == 'Yes') await this.selectPartiesToRespond('Both parties');
        await this.selectWhoMadeTheCMO('Legal officer');
        await this.enterFullName('Caseworker');
        break;
      case 'Hearing':
        await this.selectNotificationSubject(['Hearing']);
        await this.selectHearingDetails(1);
        break;
      case 'ECC':
        await this.selectNotificationSubject(['Employer Contract Claim']);
        await this.selectIsResponseToTribunal(responseToTribunal);
        if( responseToTribunal == 'Yes') await this.selectPartiesToRespond('Both parties');
        await this.selectECCNotification('Notice of Employer Contract Claim');
        break;
      default:
        throw new Error('... Notification Type not provided ...');
    }
    await this.partiesToNotify(partiesToNotify);
    await this.webActions.clickElementByRole('button', { name: 'Continue' });
    await this.clickSubmitButton();
    await this.webActions.clickElementByRole('button', { name: 'Close and Return to case' });
    return notificationTitle;
  }

  async viewNotification() {
    await this.webActions.clickElementByText('Judgments, orders &');
    await this.webActions.clickElementByRole('link', { name: 'View a judgment, order or' });

    await expect(this.page.locator('ccd-case-edit-page')).toContainText('View a judgment, order or notification');
    await this.page.locator(this.notificationDropDown).selectOption('1: 1');
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await this.webActions.verifyElementContainsText(this.page.locator('tbody'), 'test Notification');
    await this.webActions.verifyElementContainsText(this.page.locator('thead'), 'View Notification');
    await this.webActions.verifyElementContainsText(this.page.locator('tbody'), 'Both parties');
  }
}
