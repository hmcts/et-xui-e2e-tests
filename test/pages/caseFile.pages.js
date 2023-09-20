const { I } = inject();

module.exports = {
  caseLevelFlag: '#flag-location-0',
  respondentFlag: '#flag-location-1',
  claimantFlag: '#flag-location-2',
  caseFlagNextButton: '.button-primary',
  urgentCase: '[for="flag-type-0"]',
  restrictedReporting: '[for="flag-type-1"]',
  welshOption: '[for="flag-type-2"]',
  otherClaimantOption: '[for="flag-type-1"]',
  otherOptionDescription: '#other-flag-type-description',
  addCommentToFlag: '#flagComments',
  submitCaseFlag: '[type="submit"]',
  caseFlagSuccessAlert: '.hmcts-banner__message',
  caseOptionToDeactivate: '#conditional-radios-list',
  nextButton: '.button-primary',
  updateFlagComment:'[for="flagComments"]',
  deactivateButton: 'ccd-update-flag .govuk-grid-row .button',
  caseFlagSuccessMsgDeactivate: '.hmcts-banner--success',
  respondentFlagTypeReasonableAdjustment: '#flag-type-0',
  respondentFlagTypeVulnerableUser: '#flag-type-1',
  respondentFlagTypeConfidentialParty: '#flag-type-2',
  respondentFlagTypeUnacceptableDistruptiveBehaviour: '#flag-type-3',
  respondentFlagTypeVexatiousLitigant: '#flag-type-4',
  respondentFlagTypeCivilRestraintOrder: '#flag-type-5',
  respondentFlagTypeBanningOrder: '#flag-type-6',
  respondentFlagTypeAudioVideoEvidence: '#flag-type-7',
  respondentFlagTypeLanguageInterpreter: '#flag-type-8',
  respondentFlagTypeDeathOfAParty: '#flag-type-9',
  respondentFlagTypeLitigationFriend: '#flag-type-10',
  respondentFlagTypeLackingCapacity: '#flag-type-11',
  otherRespondentOption: '#flag-type-12',
  firstCaseToDeActivate: '#flag-selection-0',

  setCaseFlagLevel(partyType) {
    I.see('Where should this flag be added?');
    switch (partyType) {
      case 'respondent level':
        I.checkOption(this.respondentFlag);
        break;
      case 'claimant level':
        I.checkOption(this.claimantFlag);
        break;
      case 'case level':
        I.checkOption(this.caseLevelFlag);
        break;
      default:
        throw new Error('... check you options or add new option');

    }
    I.click(this.caseFlagNextButton);
  },

  caseFlagReasonsCaseLevel(flagType) {
    I.see('Select flag type');
    switch (flagType) {
      case 'Urgent Case':
        I.checkOption(this.urgentCase);
        break;
      case 'Restricted Reporting':
        I.checkOption(this.restrictedReporting);
        break;
      case 'Welsh option':
        I.checkOption(this.welshOption);
        break;
      case 'Others':
        I.checkOption(this.otherClaimantOption);
        I.fillField(this.otherOptionDescription, 'auto testing');
        break;
      default:
        throw new Error('... check you options or add new option');
    }
    I.click(this.caseFlagNextButton);
  },

  setCaseFlagReasonOptions(flagType) {
    I.see('Select flag type');
    switch (flagType) {
      case 'Reasonable Adjustment':
        I.checkOption(this.respondentFlagTypeReasonableAdjustment);
        break;
      case 'Vulnerable User':
        I.checkOption(this.respondentFlagTypeVulnerableUser);
        break;
      case 'Confidential Party':
        I.checkOption(this.respondentFlagTypeConfidentialParty);
        break;
      case 'Unacceptable Behaviour':
        I.checkOption(this.respondentFlagTypeUnacceptableDistruptiveBehaviour);
        break;
      case 'Vexatious litigant':
        I.checkOption(this.respondentFlagTypeVexatiousLitigant);
        break;
      case 'Civil Restrain Order':
        I.checkOption(this.respondentFlagTypeCivilRestraintOrder);
        break;
      case 'Banning Order':
        I.checkOption(this.respondentFlagTypeBanningOrder);
        break;
      case 'Audio Video Evidence':
        I.checkOption(this.respondentFlagTypeAudioVideoEvidence);
        break;
      case 'Language Interpreter':
        I.checkOption(this.respondentFlagTypeLanguageInterpreter);
        break;
      case 'Death of a party':
        I.checkOption(this.respondentFlagTypeDeathOfAParty);
        break;
      case 'Litigation Friend':
        I.checkOption(this.respondentFlagTypeLitigationFriend);
        break;
      case 'Lacking Capacity':
        I.checkOption(this.respondentFlagTypeLackingCapacity);
        break;
      case 'Others':
        I.checkOption(this.otherRespondentOption);
        I.fillField(this.otherOptionDescription, 'auto testing');
        break;
      default:
        throw new Error('... check you options or add new option');
    }
    I.click(this.caseFlagNextButton);
  },

  caseFlagSubmission() {
    I.see('Add comments for this flag')
    I.fillField(this.addCommentToFlag, 'Adding comment to a flagged case');
    I.click(this.caseFlagNextButton);
    I.wait(2);
    I.click(this.submitCaseFlag);
    I.waitForElement(this.caseFlagSuccessAlert,10);
  },

  deactivateCaseFlag() {
    I.waitForElement(this.nextButton, 10);
    I.checkOption(this.firstCaseToDeActivate);
    I.click(this.nextButton);
    I.seeElement(this.updateFlagComment);
    I.fillField(this.addCommentToFlag,'deactivating the flag');
    I.forceClick(this.nextButton);
    I.see('Manage case flags');
    I.click(this.submitCaseFlag);
    I.waitForElement(this.caseFlagSuccessMsgDeactivate, 10);

  }

}