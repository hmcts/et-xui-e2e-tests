const { I } = inject();

module.exports = {
  applicationTab: '#mat-tab-label-0-9',
  applicationDropdown: '#tseAdminSelectApplication',
  decisionForm: '#caseEditForm',
  notificationTitleDecisionPage: '#tseAdminEnterNotificationTitle',
  decisionGranted : '#tseAdminDecision-Granted',
  decisionGrantedInPart: '#tseAdminDecision-Granted in part',
  decisionRefused: '#tseAdminDecision-Refused',
  otherDecision: '#tseAdminDecision-Other',
  judgementDecisionType: 'tseAdminTypeOfDecision-Judgment',
  caseManagementDecisionType: '[id="tseAdminTypeOfDecision-Case management order"]',
  additionalDecisionInformation: '#tseAdminAdditionalInformation',
  madeByLegalOfficer: '[id="tseAdminDecisionMadeBy-Legal officer"]',
  isResponseRequired_No: '#tseAdminIsResponseRequired-No',
  madeByAJudge: '#tseAdminDecisionMadeBy-Judge',
  bothParties: '[id="tseAdminSelectPartyNotify-Both parties"]',
  claimantOnly: '[id="tseAdminSelectPartyNotify-Claimant only"]',
  respondentOnly: '[id="tseAdminSelectPartyNotify-Respondent only"]',
  fullNameDecisionMaker: '#tseAdminDecisionMadeByFullName',
  confirmSubmission: '#confirmation-body',
  returnToCaseOverview: '//button[@class="button"]',

  recordAdecisionOnAcase (submissionReference, appOption, decision, decisionType, decisionMaker, respondingParties) {
     let recordDecisionLink = `/cases/case-details/${submissionReference}/trigger/tseAdmin/tseAdmin1`;
     I.click(this.applicationTab);
     I.click(`[href="${recordDecisionLink}"]`);
     I.selectOption(this.applicationDropdown, appOption);
     I.click('Continue');
     I.waitForElement(this.decisionForm,15);
     I.fillField(this.notificationTitleDecisionPage, 'adding a decision')
    switch (decision) {
      case 'granted':
        I.checkOption(this.decisionGranted);
        break;
      case 'granted in part':
        I.checkOption(this.decisionGrantedInPart);
        break;
      case 'refused':
        I.checkOption(this.decisionRefused);
        break;
      case 'other decision':
        I.checkOption(this.otherDecision);
        break;
      default:
        throw new Error('... decision option is invalid');
    }
    switch (decisionType) {
      case 'judgment':
        I.checkOption(this.judgementDecisionType);
        break;
      case 'cmo-responding':
        I.wait(2);
        I.scrollPageToBottom();
        I.checkOption(this.caseManagementDecisionType);
        I.checkOption(this.isResponseRequired_No);
        break;
      case 'cmo-no-response':
        I.wait(2);
        I.scrollPageToBottom();
        I.checkOption(this.caseManagementDecisionType);
        I.checkOption(this.isResponseRequired_No);
        break;
      default:
        throw new Error('... decision type is invalid');
    }
    I.fillField(this.additionalDecisionInformation, '...test');
     switch (decisionMaker) {
       case 'legal officer':
         I.checkOption(this.madeByLegalOfficer);
         break;
       case 'judge':
         I.checkOption(this.madeByAJudge);
         break;
       default:
         throw new Error('... please select who made the decision');
     }
     I.fillField(this.fullNameDecisionMaker, 'ET Tester')
     switch (respondingParties) {
       case 'both':
         I.checkOption(this.bothParties);
         break;
       case 'claimant only':
         I.checkOption(this.claimantOnly);
         break;
       case 'respondent only':
         I.checkOption(this.respondentOnly);
         break;
       default:
         throw new Error('... please party to respond');
     }
     I.click('Continue');
     I.waitForElement('.form-table', 15);
     I.see('Check your answers');
     I.click('Submit');
     I.waitForElement(this.confirmSubmission, 15);
     I.see('What happens next');
     I.click(this.returnToCaseOverview);
  }
}