const { I } = inject();
const testConfig = require('../../config');

module.exports = {
  applyButtonOnLegalRep: '.workbasket-filters-apply',
  manageCasesLinkLegalRep: '[aria-label="Manage Cases"]',
  continueButton: '.button',
  //nocLinkLegalRep: '[href="/noc"]',
  nocLinkLegalRep: '//a[contains(.,"Notice of change")]',
  continueLegalRepButton: '//button[@class="button"]',
  submitButtonLegalRep: '//button[@class="button"]',
  caseidFilfield: '#caseRef',
  respondentDetailsLegalRep: '#respondentName',
  fieldSetLegalRep: '#fieldset-q-and-a-form',
  claimantFirstNamelegalRep: '#claimantFirstName',
  claimantLastNamelegalRep: '#claimantLastName',
  detailConfirmationCheckbox: '#affirmation',
  notifyPartyCheckbox: '#notifyEveryParty',
  confirmdiv: 'affirmation-section',
  linkToCasesLegalRep: '.hmcts-header__link',
  caseListText: 'Case list',
  caseTypeDropdown: '#wb-case-type',
  manageCasesLink: '.hmcts-header__link',
  prepareDocContinueButton: '[type="submit"]',
  changeDocuUploaded: '[aria-label="Change Upload document"]',
  submissionReferenceLocator: '#feeGroupReference',
  respondentTextfield: '#respondent',
  applyButton: '[aria-label="Apply filter"]',
  resetButton: '[aria-label="Reset filter"]',
  nextEventDropdown: '#next-step',
  submitEventButton: '[type="submit"]',
  successfulMessageHeader: '//h1[@class="govuk-panel__title"]',
  prepareDocPageTwoHeader: '.govuk-heading-l',
  prepDecYesOption: '#bundlesRespondentAgreedDocWith-Yes',
  prepDocAgreeWithRes: '#bundlesRespondentAgreedDocWith-But',
  prepDocAgreeWithResTextField: '#bundlesRespondentAgreedDocWithBut',
  prepDocNoAgreement: '#bundlesRespondentAgreedDocWith-No',
  prepDocNoAgreementTextField: '#bundlesRespondentAgreedDocWithNo',
  selectHearingFromDropdown: '#bundlesRespondentSelectHearing',
  respondentDocOnly: '#bundlesRespondentWhoseDocuments div:nth-of-type(1) > .form-control',
  bothPartiesDoc: '#bundlesRespondentWhoseDocuments div:nth-of-type(2) > .form-control',
  hearingDocumentIncludingWitnessStatement: '#bundlesRespondentWhatDocuments div:nth-of-type(1) > .form-control',
  supplementaryHearingDocument: '#bundlesRespondentWhatDocuments div:nth-of-type(2) > .form-control',
  witnessStatementOnly: '#bundlesRespondentWhatDocuments div:nth-of-type(3) > .form-control',
  uploadBundleDocument: '#bundlesRespondentUploadFile',
  legalRepSubmit: '[type="submit"]',
  successfulmsgHeader: '.heading-h1',
  hearingTabLegalRep: '//div[9]/div[@class="mat-tab-label-content"]',
  closeAndReturnButton: '[type="submit"]',
  loadingSpinner: '.spinner-container',
  legalRepNotificationTab: '#mat-tab-label-0-6',
  lrRespondToTribunal: '//a[.="Respond to an order or request from the tribunal"]',
  responseNotificationDropdown: '#pseRespondentSelectOrderOrRequest',
  casedetailsEditForm: '#caseEditForm',
  lrAddCommentToResponse: '#pseRespondentOrdReqResponseText',
  noSupportingMaterial: '#pseRespondentOrdReqHasSupportingMaterial_No',
  legalRepYesOptionR92: '#pseRespondentOrdReqCopyToOtherParty-Yes',
  et3respondentFormDropdown: '#submitEt3Respondent',
  contractClaimCorrectYesButton: '#et3ResponseIsClaimantNameCorrect_Yes',
  respondentLegalname: '#et3ResponseRespondentLegalName',
  et3postCodeInput: '#et3RespondentAddress_et3RespondentAddress_postcodeInput',
  findAddressButton: '//button[@class="button button-30"]',
  addressListDropdown: '#et3RespondentAddress_et3RespondentAddress_addressList',
  et3ContactPreferenceEmail: '#et3ResponseContactPreference-Email',
  hearingAttendanceRepresentative: '[field_id="et3ResponseHearingRepresentative"] [value="Phone hearings"]',
  hearingAttendanceRespondent: '[field_id="et3ResponseHearingRespondent"] [value="Video hearings"]',
  mentalHealthIssueNo: '#et3ResponseRespondentSupportNeeded-No',
  cyaFirstChange: '[aria-label="Change Select which respondent this ET3 is for"]',
  employmentDetailLink: '//a[.="ET3 - Employment Details"]',
  whichRespondentDropdown: '#et3RepresentingRespondent_0_dynamicList',
  respondentMultipleYes: '#et3ResponseMultipleSites_Yes',
  claimantDateOfEmploymentCorrectYes: '#et3ResponseAreDatesCorrect-Yes',
  employmentContinuingYes: '#et3ResponseContinuingEmployment-Yes',
  jobTitleCorrectYes: '#et3ResponseIsJobTitleCorrect-Yes',
  weeklyWorkingCorrectYes: '#et3ResponseClaimantWeeklyHours-Yes',
  earningDetailsCorrectYes: '#et3ResponseEarningDetailsCorrect-Yes',
  noticeCorrectYes: '#et3ResponseIsNoticeCorrect-Yes',
  responsePensionDetailCorrectYes: '#et3ResponseIsPensionCorrect-Yes',
  responseDetailLink: '//a[.="ET3 - Response Details"]',
  respondentDetailDropDownList: '#et3RepresentingRespondent_0_dynamicList',
  acasReconciliationOption: '#et3ResponseAcasAgree_Yes',
  respondentContestClaim: '#et3ResponseRespondentContestClaim-No',
  employmentContractClaimYes: '#et3ResponseEmployerClaim_Yes',
  eccTextField: '#et3ResponseEmployerClaimDetails',
  et3EccUploadButton: '#et3ResponseEmployerClaimDocument',
  changeButtonOneCyaRespondentDetail: '[aria-label="Change Select which Respondent this ET3 Form is for"]',
  closeReturnToCaseDetails: '//button[@class="button"]',
  selectCompletedDraftET3: '#submitEt3Respondent',
  checkConfirmationCheckbox: '#confirmEt3Submit-Yes',

  // prevent NOC process from failing
  // NOC process tend to fail is existing applications are not loaded
  async loadExistingApplications(option) {
    I.refreshPage();
    I.waitForElement(this.nocLinkLegalRep, 30);
    I.click(this.linkToCasesLegalRep);
    I.waitForElement(this.caseTypeDropdown, 30);
    I.refreshPage();
    I.wait(5);
    I.waitForElement(this.resetButton, 35);
    I.see(this.caseListText);
    I.wait(5);
    try {
      switch (option) {
        case 'Eng/Wales - Singles':
          I.selectOption(this.caseTypeDropdown, 'Eng/Wales - Singles');
          break;
        case 'Scotland':
        case 'Scotland - Singles':
          I.selectOption(this.caseTypeDropdown, 'Scotland - Singles (RET)');
          break;
        default:
          throw new Error('... check you options or add new option');
      }
    } catch (error) {
      console.error('invalid option', error.message);
    }
    //I.selectOption(this.caseTypeDropdown, option);
    I.scrollPageToBottom();
    I.wait(3);
    I.click(this.applyButton);
  },

  async processNOC(option, submissionReference, respondentName, ClaimantFirstName, ClaimantLastName) {
    this.loadExistingApplications(option);
    I.refreshPage();
    I.waitForVisible(this.nocLinkLegalRep, 25);
    I.click(this.nocLinkLegalRep);
    I.wait(5);

    //I.waitForElement(this.continueButton, 10);
    I.see('Notice of change');
    I.waitForElement(this.caseidFilfield, 10);
    I.fillField(this.caseidFilfield, submissionReference);
    I.click(this.continueLegalRepButton);
    I.waitForVisible(this.fieldSetLegalRep, 10);
    I.see('Enter details');
    I.fillField(this.respondentDetailsLegalRep, respondentName);
    I.fillField(this.claimantFirstNamelegalRep, ClaimantFirstName);
    I.fillField(this.claimantLastNamelegalRep, ClaimantLastName);
    I.wait(5);
    I.click(this.continueLegalRepButton);
    //I.waitForVisible(this.confirmdiv, 10);
    I.wait(10);
    I.see('Check and submit');
    I.waitForElement(this.detailConfirmationCheckbox, 10);
    I.scrollTo(this.detailConfirmationCheckbox);
    I.checkOption(this.detailConfirmationCheckbox);
    I.checkOption(this.notifyPartyCheckbox);
    I.wait(2);
    I.scrollPageToBottom();
    I.forceClick(this.submitButtonLegalRep);
    I.waitForElement(this.successfulMessageHeader, 20);
    I.see('Notice of change successful');
    I.wait(2);
    let newNOCapplication = testConfig.TestUrlForManageCaseAAT + '/cases/case-details/' + submissionReference;
    I.amOnPage(newNOCapplication);
    I.wait(10);
  },

  async submitDocumentForHearingRespondent(agreement, whoseDocu, docuType) {
    I.waitForElement(this.textHeader, 10);
    I.see('Prepare and submit documents for a hearing');
    I.click(this.continueLegalRepButton);
    I.waitForInvisible(this.loadingSpinner, 10);
    I.waitForElement(this.prepareDocPageTwoHeader, 15);
    I.waitForInvisible(this.loadingSpinner, 10);
    I.see('Have you agreed these documents with the other party?');
    I.scrollPageToBottom();
    try {
      switch (agreement) {
        case 'Yes':
          I.checkOption(this.prepDecYesOption);
          I.click(this.prepareDocContinueButton);
          break;
        case 'Agreed':
          I.checkOption(this.prepDocAgreeWithRes);
          I.fillField(this.prepDocAgreeWithResTextField, 'Testing prep document for hearing -- Agree with Res');
          I.click(this.prepareDocContinueButton);
          break;
        case 'NotAgreed':
          I.checkOption(this.prepDocNoAgreement);
          I.fillField(this.prepDocNoAgreementTextField, 'Testing prep document for hearing -- No agreement');
          I.click(this.prepareDocContinueButton);
          break;
        default:
          throw new Error('... check you options or add new option');
      }
    } catch (error) {
      console.error('invalid option', error.message);
    }
    I.waitForInvisible(this.loadingSpinner, 10);
    I.waitForElement(this.respondentDocOnly, 10);
    I.scrollPageToBottom();
    I.see('About your hearing documents');
    I.selectOption(this.selectHearingFromDropdown, '1: 1');
    // Whose hearing documents are you uploading
    try {
      switch (whoseDocu) {
        case 'Respondent':
          I.checkOption(this.respondentDocOnly);
          break;
        case 'Both Parties':
          I.checkOption(this.bothPartiesDoc);
          break;
        default:
          throw new Error('... check you options or add new option');
      }
    } catch (error) {
      console.error('invalid option', error.message);
    }
    // What are these documents?
    try {
      switch (docuType) {
        case 'Hearing Document including witness statement':
          I.checkOption(this.hearingDocumentIncludingWitnessStatement);
          break;
        case 'Supplementary hearing documents':
          I.checkOption(this.supplementaryHearingDocument);
          break;
        case 'Witness statement only':
          I.checkOption(this.witnessStatementOnly);
          break;
        default:
          throw new Error('... check you options or add new option');
      }
    } catch (error) {
      console.error('invalid option', error.message);
    }
    I.click(this.continueLegalRepButton);
    I.waitForInvisible(this.loadingSpinner, 10);
    I.scrollPageToBottom();
    I.see('Upload your file of documents');
    I.attachFile(this.uploadBundleDocument, 'test/data/welshTest.pdf');
    I.wait(2);
    I.click(this.continueLegalRepButton);
    I.scrollPageToBottom();
    I.waitForElement(this.changeDocuUploaded, 10);
    I.see('Check the information below carefully.');
    I.see('Prepare documents for hearing');
    I.see('Check your answers');
    I.forceClick(this.legalRepSubmit);
    I.waitForElement(this.successfulmsgHeader, 10);
    I.see('You have sent your hearing documents to the tribunal');
    I.scrollPageToBottom();
    I.click(this.closeAndReturnButton);
    I.waitForInvisible(this.loadingSpinner, 10);
    //I.see(' Respondent Hearing Documents');
  },

  verifyHearingDocumentTabLegalRep() {
    I.waitForElement(this.hearingTabLegalRep, 10);
    I.click(this.hearingTabLegalRep);
    I.see('Hearing Documents');
    I.see('Respondent Hearing Documents');
  },
  respondToNotificationFromTribunal() {
    I.click(this.legalRepNotificationTab);
    I.waitForElement(this.lrRespondToTribunal, 10);
    I.click(this.lrRespondToTribunal);
    I.waitForElement(this.responseNotificationDropdown, 15);
    I.selectOption(this.responseNotificationDropdown, '1:2');
    I.wait(2);
    I.click(this.continueButton);
    I.waitForElement(this.casedetailsEditForm, 10);
    I.fillField(this.lrAddCommentToResponse, 'test response to notification from Trib');
    I.checkOption(this.noSupportingMaterial);
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.legalRepYesOptionR92, 10);
    I.checkOption(this.legalRepYesOptionR92);
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.casedetailsEditForm, 10);
    I.see('Check your answers');
    I.click(this.continueLegalRepButton);
    I.seeElement('//button[@class="button"]');
  },

  completeDraftET3ResponseForm() {
    I.waitForElement(this.legalRepSubmit, 10);
    I.see('ET3 - Response to Employment tribunal claim (ET1)');
    I.click(this.legalRepSubmit);
    I.waitForElement(this.et3respondentFormDropdown, 10);
    I.selectOption(this.et3respondentFormDropdown, '1: R: Henry Marsh');
    I.wait(2);
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.contractClaimCorrectYesButton, 10);
    I.see("Is this the correct claimant for the claim you're responding to?");
    I.checkOption(this.contractClaimCorrectYesButton);
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.respondentLegalname, 10);
    I.fillField(this.respondentLegalname, 'ET Test Org');
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.et3postCodeInput, 10);
    I.fillField(this.et3postCodeInput, 'KA11 5DG');
    I.click(this.findAddressButton);
    I.waitForElement(this.addressListDropdown, 2);
    I.selectOption(this.addressListDropdown, '1: Object');
    I.click(this.continueLegalRepButton);
    I.wait(5);
    I.see('What is your contact phone number? (Optional)');
    I.click(this.continueLegalRepButton);
    I.wait(5);
    I.see('What is your reference number? (Optional)');
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.et3ContactPreferenceEmail, 10);
    I.see('How would you prefer to be contacted?');
    I.checkOption(this.et3ContactPreferenceEmail);
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.hearingAttendanceRepresentative, 10);
    I.see('Hearing format');
    I.checkOption(this.hearingAttendanceRepresentative);
    I.checkOption(this.hearingAttendanceRespondent);
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.mentalHealthIssueNo, 10);
    I.checkOption(this.mentalHealthIssueNo);
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.cyaFirstChange, 10);
    I.click(this.continueLegalRepButton);
    // Employment Details
    I.waitForElement(this.employmentDetailLink, 30);
    I.click(this.employmentDetailLink);
    I.waitForElement(this.continueLegalRepButton, 10);
    I.see('ET3 - Response to Employment tribunal claim (ET1)');
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.whichRespondentDropdown, 10);
    I.selectOption(this.whichRespondentDropdown, 'Henry Marsh');
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.respondentMultipleYes, 10);
    I.see("Respondent's workforce");
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.claimantDateOfEmploymentCorrectYes, 20);
    I.checkOption(this.claimantDateOfEmploymentCorrectYes);
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.employmentContinuingYes, 10);
    I.see("Is the claimant's employment with the respondent continuing?");
    I.checkOption(this.employmentContinuingYes);
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.jobTitleCorrectYes, 10);
    I.see("Is the claimant's description of their job or job title correct?");
    I.checkOption(this.jobTitleCorrectYes);
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.weeklyWorkingCorrectYes, 10);
    I.see("Are the claimant's total weekly work hours correct?");
    I.checkOption(this.weeklyWorkingCorrectYes);
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.earningDetailsCorrectYes, 10);
    I.see('Are the earnings details given by the claimant correct?');
    I.checkOption(this.earningDetailsCorrectYes);
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.noticeCorrectYes, 10);
    I.see('Is the information given by the claimant correct about their notice?');
    I.checkOption(this.noticeCorrectYes);
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.responsePensionDetailCorrectYes, 10);
    I.see('Are the details about pension and other benefits correct?');
    I.checkOption(this.responsePensionDetailCorrectYes);
    I.click(this.continueLegalRepButton);
    I.wait(5);
    I.see('Check your answers');
    I.click(this.continueLegalRepButton);
    // Employment Details
    I.waitForElement(this.responseDetailLink, 10);
    I.click(this.responseDetailLink);
    I.waitForElement(this.continueLegalRepButton, 10);
    I.see('How to fill in this form');
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.respondentDetailDropDownList, 10);
    I.selectOption(this.respondentDetailDropDownList, 'Henry Marsh');
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.acasReconciliationOption, 10);
    I.checkOption(this.acasReconciliationOption);
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.respondentContestClaim, 10);
    I.see('Does the respondent contest the claim?');
    I.checkOption(this.respondentContestClaim);
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.employmentContractClaimYes, 10);
    I.checkOption(this.employmentContractClaimYes);
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.eccTextField, 10);
    I.fillField(this.eccTextField, 'ECC  Respondent Test');
    I.attachFile(this.et3EccUploadButton, 'test/data/welshTest.pdf');
    I.wait(5);
    I.click(this.continueLegalRepButton);
    I.wait(5);
    I.see('Check your answers');
    I.click(this.submitButtonLegalRep);
    I.wait(5);
    I.click(this.continueLegalRepButton);
  },

  submitET3ResponseForm() {
    I.waitForElement(this.selectCompletedDraftET3, 10);
    I.selectOption(this.selectCompletedDraftET3, 'Henry Marsh');
    I.click(this.continueLegalRepButton);
    I.waitForElement(this.checkConfirmationCheckbox, 10);
    I.see('Do you want to submit this ET3?');
    I.checkOption(this.checkConfirmationCheckbox);
    I.click(this.continueLegalRepButton);
    I.wait(5);
    I.click(this.continueLegalRepButton);
    I.wait(5);
    I.click(this.continueLegalRepButton);
  },
};
