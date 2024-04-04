//do it for wait for element, clicks, fill fields, select options
const { I } = inject();

module.exports = {
  //SendANotificationHeading : '[aria-posinset="10"] > .mat-tab-label-content',
  SendANotificationHeading: '.govuk-heading-l',
  content_tab2: '[aria-posinset="10"] > .mat-tab-label-content',
  Notificationtitle: '#sendNotificationTitle',
  RadioBoxNo: '#sendNotificationLetter_No',
  NotifCheckboxCMO: '[for="sendNotificationSubject-Case management orders / requests"]',
  cmoCheckbox: '[for="sendNotificationCaseManagement-Case management order"]',
  BothParties: '[for="sendNotificationNotify-Both parties"]',
  requestCheckbox: '[for="sendNotificationCaseManagement-Request"]',
  eccCheckbox: '[id="sendNotificationSubject-Employer Contract Claim"]',
  responseRequiredYes: '[for="sendNotificationResponseTribunal-Yes - view document for details"]',
  responseRequiredNo: '[for="sendNotificationResponseTribunal-No"]',
  dropdownRespondingParties: '#sendNotificationSelectParties',
  legalOfficerButton: '[for="sendNotificationWhoCaseOrder-Legal officer"]',
  judgeButton: '[for="sendNotificationWhoCaseOrder-Judge"]',
  officerName: '#sendNotificationFullName',
  additionalNotifInfoField: '#sendNotificationAdditionalInfo',
  bothPartiesButton: '[for="sendNotificationNotify-Both parties"]',
  claimantOnlyButton: '[for="sendNotificationNotify-Claimant only"]',
  respondentOnlyButton: '[for="sendNotificationNotify-Respondent only"]',
  ContinueButton: '//button[@class="button"]',
  CloseButton: '.button',
  eccNotificationCheckbox: '[id="sendNotificationEccQuestion-Notice of Employer Contract Claim"]',
  notificationConfirmationAlert: '//div[@class="alert-message"]',

  sendNotificationLink(notifType, isResponseRequired, respParty, decidingOfficer, notificationParty) {
    I.waitForElement(this.SendANotificationHeading, 20);
    I.see('Case Number:');
    I.see(
      'Use this service to notify one or both parties about this case. You can do this by uploading standard letter documents.',
    );
    I.see('You can send multiple letters in one notification');
    I.see('Enter notification title');
    I.fillField('#sendNotificationTitle', 'Send Notification Title');
    I.see('Is there a letter to send out?');
    I.checkOption(this.RadioBoxNo);
    I.see('Notification subject');
    I.checkOption(this.NotifCheckboxCMO);
    I.see('Is this a case management order or request?');

    switch (notifType) {
      case 'cmo':
        I.checkOption(this.cmoCheckbox);
        I.see('Who made the case management order?');
        break;
      case 'request':
        I.checkOption(this.requestCheckbox);
        break;
      case 'ecc':
        I.checkOption(this.cmoCheckbox);
        I.checkOption(this.eccCheckbox);
        I.checkOption(this.eccNotificationCheckbox);
        break;
      default:
        throw new Error('there must be 2 options, either CMO or Request');
    }
    switch (isResponseRequired) {
      case 'yes':
        I.checkOption(this.responseRequiredYes);
        I.scrollTo(this.dropdownRespondingParties);
        I.selectOption(this.dropdownRespondingParties, respParty);
        break;
      case 'no':
        I.checkOption(this.responseRequiredNo);
        break;
      default:
        throw new Error('you can either select yes or no');
    }

    switch (decidingOfficer) {
      case 'legal officer':
        I.checkOption(this.legalOfficerButton);
        break;
      case 'judge':
        I.checkOption(this.judgeButton);
        break;
      default:
        throw new Error('you can either select an officer or a judge');
    }
    I.fillField(this.officerName, 'Sharif');
    I.fillField(this.additionalNotifInfoField, 'Testing');

    I.see('Select the party or parties to notify');
    switch (notificationParty) {
      case 'both':
        I.checkOption(this.bothPartiesButton);
        break;
      case 'claimant':
        I.checkOption(this.claimantOnlyButton);
        break;
      case 'respondent':
        I.checkOption(this.respondentOnlyButton);
        break;
      default:
        throw new Error('you must select either both, claimant or respondent only parties');
    }
    I.click(this.ContinueButton);
    I.wait(5);
    I.see('Check your answers');
    I.see('Enter notification title');
    I.see('Is there a letter to send out?');
    I.see('Notification subject');
    I.see('Select the party or parties to notify');
    I.click(this.ContinueButton);
    I.waitForText('What happens next');
    I.click(this.ContinueButton);
    I.waitForElement(this.notificationConfirmationAlert, 15);
  },
};
