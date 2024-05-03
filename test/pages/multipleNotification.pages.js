const { I } = inject();

module.exports = {
  multipleNotificationTitle:'#sendNotificationTitle',
  partiesFromLeadCase: '[id="sendNotificationNotify-Lead case"]',
  allPartiesFromLeadCase: '[id="sendNotificationNotifyLeadCase-Both parties"]',
  claimantFromLeadCase: '[id="sendNotificationNotifyLeadCase-Claimant only"]',
  respondentFromLeadCase: '[id="sendNotificationNotifyLeadCase-Respondent only"]',
  partiesFromLeadAndSub: '[id="sendNotificationNotify-Lead and sub cases"]',
  allPartiesFromLeadAndSub: '[id="sendNotificationNotifyAll-Both parties"]',
  allClaimantFromLeadAndSub: '[id="sendNotificationNotifyAll-Claimant only"]',
  allRespondentFromLeadAndSub: '[id="sendNotificationNotifyAll-Respondent only"]',
  NotifCheckboxCMO: '[for="sendNotificationSubject-Case management orders / requests"]',
  cmoCheckbox: '[for="sendNotificationCaseManagement-Case management order"]',
  BothParties: '[for="sendNotificationNotify-Both parties"]',
  requestCheckbox: '[for="sendNotificationCaseManagement-Request"]',
  eccCheckbox: '[id="sendNotificationSubject-Employer Contract Claim"]',
  responseRequiredYes: '[for="sendNotificationResponseTribunal-Yes - view document for details"]',
  responseRequiredNo: '[for="sendNotificationResponseTribunal-No"]',
  dropdownRespondingParties: '#sendNotificationSelectParties',
  caseworkerButton: '[id="sendNotificationRequestMadeBy-Caseworker"]',
  legalOfficerButton: '[for="sendNotificationWhoCaseOrder-Legal officer"]',
  judgeButton: '[for="sendNotificationWhoCaseOrder-Judge"]',
  officerName: '#sendNotificationFullName',
  additionalNotifInfoField: '#sendNotificationAdditionalInfo',
  bothPartiesButton: '[for="sendNotificationNotify-Both parties"]',
  claimantOnlyButton: '[for="sendNotificationNotify-Claimant only"]',
  respondentOnlyButton: '[for="sendNotificationNotify-Respondent only"]',
  ContinueButton: '//button[@class="button"]',
  CloseButton: '.button',
  eccNoticeOfClaimCheckbox: '[id="sendNotificationEccQuestion-Notice of Employer Contract Claim"]',
  acceptanceEccNoticeCheckbox: '[id="sendNotificationEccQuestion-Acceptance of ECC response"]',
  rejectEccNoticeCheckbox: '[id="sendNotificationEccQuestion-Rejection of ECC response"]',
  grantEccAccessCheckbx: '[id="sendNotificationEccQuestion-Provide parties with access to ECC case view"]',
  notificationConfirmationAlert: '//div[@class="alert-message"]',
  generalCorrespondence: '[for="sendNotificationSubject-Other (General correspondence)"]',
  batchProcessingOption: '[id="sendNotificationNotify-Selected cases"]',
  batchAllPartiesFromSelectedCases: '[id="sendNotificationNotifySelected-Both parties"]',
  flag4OnNextPageBatchProcessing: '//select[@class="form-control ccd-dropdown bottom-30 ng-pristine ng-valid ng-touched"]',


  sendNotificationMultiple(notifType, notificationParty) {
    I.waitForElement(this.multipleNotificationTitle, 10);
    I.see('Use this service to send a notification to parties within this multiple. You can do this by uploading standard letter documents.');
    I.see('You can send multiple letters in one notification');
    switch (notifType) {
      case 'cmo both party to respond legal officer':
        I.checkOption(this.cmoCheckbox);
        I.see('Who made the case management order?');
        I.checkOption(this.responseRequiredYes);
        I.scrollTo(this.dropdownRespondingParties);
        I.selectOption(this.dropdownRespondingParties, '1: Both parties');
        I.checkOption(this.legalOfficerButton);
        I.fillField(this.officerName, 'Sharif');
        break;
      case 'cmo both party to respond judicial officer':
        I.checkOption(this.cmoCheckbox);
        I.see('Who made the case management order?');
        I.checkOption(this.responseRequiredYes);
        I.scrollTo(this.dropdownRespondingParties);
        I.selectOption(this.dropdownRespondingParties, '1: Both parties');
        I.checkOption(this.judgeButton);
        I.fillField(this.officerName, 'Sharif');
        break;
      case 'request-no-response-caseworker':
        I.checkOption(this.requestCheckbox);
        I.checkOption(this.responseRequiredNo);
        I.checkOption(this.caseworkerButton);
        I.fillField(this.officerName, 'Sharif');
        break;
      case 'ecc-notification':
        I.checkOption(this.cmoCheckbox);
        I.checkOption(this.eccCheckbox);
        I.checkOption(this.eccNoticeOfClaimCheckbox);
        I.checkOption(this.responseRequiredYes);
        I.scrollTo(this.dropdownRespondingParties);
        I.selectOption(this.dropdownRespondingParties, '2: Claimant only');
        I.checkOption(this.legalOfficerButton);
        I.fillField(this.officerName, 'Sharif');
        break;
      case 'ecc-acceptance':
        I.checkOption(this.eccCheckbox);
        I.checkOption(this.acceptanceEccNoticeCheckbox);
        break;
      case 'ecc-rejection':
        I.checkOption(this.eccCheckbox);
        I.checkOption(this.rejectEccNoticeCheckbox);
        break;
      case 'ecc-grant-access':
        I.checkOption(this.eccCheckbox);
        I.checkOption(this.grantEccAccessCheckbx);
        break;
      case 'general correspondence':
        I.checkOption(this.generalCorrespondence);
        break;
      default:
        throw new Error('there must be 2 options, either CMO or Request');
    }
    switch (notificationParty) {
      case 'All parties from lead case':
        I.checkOption(this.partiesFromLeadCase)
        I.checkOption(this.allPartiesFromLeadCase);
        break;
      case 'Claimant from lead case':
        I.checkOption(this.partiesFromLeadCase);
        I.checkOption(this.claimantFromLeadCase);
        break;
      case 'Respondent from lead case':
        I.checkOption(this.partiesFromLeadCase);
        I.checkOption(this.respondentFromLeadCase);
        break;
      case 'Parties from lead case and sub cases both':
        I.checkOption(this.partiesFromLeadAndSub);
        I.checkOption(this.allPartiesFromLeadAndSub);
        break;
      case 'Parties from lead case and sub cases claimant':
        I.checkOption(this.partiesFromLeadAndSub);
        I.checkOption(this.allClaimantFromLeadAndSub);
        break;
      case 'Parties from lead case and sub cases respondent':
        I.checkOption(this.partiesFromLeadAndSub);
        I.checkOption(this.allRespondentFromLeadAndSub);
        break;
      case 'Batch processing all parties':
        I.checkOption(this.batchProcessingOption);
        I.checkOption(this.batchAllPartiesFromSelectedCases);
        I.click(this.ContinueButton);
        I.waitForElement(this.flag4OnNextPageBatchProcessing, 10);
        I.see('Submultiple Name');
        break;
      default:
        throw new Error('you must select either both, claimant or respondent only parties');
    }
    // suddenly started failing at this point
    I.wait(10);
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
  }

};
