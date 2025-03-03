import { BasePage } from "./basePage";
import { params } from "../utils/config";
import { expect } from "@playwright/test";


export default class CitizenHubPage extends BasePage {

  elements = {
    returnToExistingClaim:'[href="/return-to-existing?lng=en"]',
    employmentTribunalAccount:'#return_number_or_account-2',
    veiwResponseLink: '[href="/case-document/response-acknowledgement"]',
    et3ResponseLink: '[href="/case-document/response-from-respondent"]',
    statusBeforeView: '.govuk-tag--blue',
    statusAfterView: '//strong[contains(.,"Viewed")]',
    welshToggle: '//a[.="Cymraeg"]',
    linkToAttachedDocument: '[class="govuk-link"]',
    linkToReplyRespondentApplications: '//a[contains(.,"Respondent\'s applications")]',
    respondButton: '#respond-button',
    responseTextElement: '.govuk-label--m',
    providingMaterialYes: '#supporting-material-yes-no',
    addTextToResponse: '#respond-to-application-text',
    supportingMaterialAttachment: '#supportingMaterialFile',
    uploadButton: '#upload',
    contactTribunalAboutMyCase: '[href="/contact-the-tribunal"]',
    linkToET3Response: '[href="/case-document/response-from-respondent"]',
    contactTribunalLinkRegistered: '[href="/contact-the-tribunal"]',
    openAllApplicationType: '//span[@class="govuk-accordion__show-all-text"]',
    welshContactTribunalLinkRegistered: '[href="/contact-the-tribunal?lng=cy"]',
    showAllApplicationType: '#contact-options',
    withdrawClaimLink: '[href="/contact-the-tribunal/withdraw?lng=en"]',
    applicationTextField: '#Contact-Application-Text',
    changePersonalDetail: '[href="/contact-the-tribunal/change-details"]',
    postponeMyHearing: '[href="/contact-the-tribunal/postpone"]',
    revokeAnOrder: '[href="/contact-the-tribunal/vary"]',
    reconsiderDecision: '[href="/contact-the-tribunal/reconsider-decision"]',
    amendClaim: '[href="/contact-the-tribunal/amend"]',
    orderRespondent: '[href="/contact-the-tribunal/respondent"]',
    orderWitness: '[href="/contact-the-tribunal/witness"]',
    respondentNotComplied: '[href="/contact-the-tribunal/non-compliance"]',
    restrictPublicity: '[href="/contact-the-tribunal/publicity"]',
    strikeOutResponse: '[href="/contact-the-tribunal/strike"]',
    reconsiderJudgment: '[href="/contact-the-tribunal/reconsider-judgement"]',
    somethingElse: '[href="/contact-the-tribunal/other"]',
    submitHearingDocument: '[href="/prepare-documents?lng=en"]',
    startPreparingHearingDoc: '//a[contains(.,"Start now")]',
    hearingDocAgreeDoc: '#bundlesRespondentAgreedDocWith',
    continueButton: '#main-form-submit',
    firstListedCase: '#about-hearing-documents1',
    myDocumentOption: '[value="My hearing documents only"]',
    witnessStatementOnly: '[value="Witness statements only"]',
    uploadHearingDocButton: '#hearingDocument',
    uploadHearingFile: '#upload',
    backButton: '//a[.="Back"]',
    quidanceTextPayload: '.govuk-template__body .govuk-grid-column-two-thirds > .govuk-body',
    changeYourDocument: '//a[contains(.,"Change Your documents")]',
    closeAndReturnButton: '//a[contains(.,"Close and return to case overview")]',
    yesOptionOnRule92: '#copyToOtherPartyYesOrNo',
    noOptionOnRule92: '#copyToOtherPartyYesOrNo-2',
    addInfoToNoOption: '#copyToOtherPartyText',
    submitApplicationButton: '#main-form-submit',
    returntoCUIcaseOverviewButton: '//a[contains(.,"Close and return to case overview")]',
    notificationFlagBefore: '.govuk-tag--red',
    notificationLink: '[href="/tribunal-orders-and-requests"]',
    seeNotificationDetailsLink: 'td:nth-of-type(2) > .govuk-link',
    sendNotifButton: 'td:nth-of-type(2) > .govuk-link',
    tribunalResponseField: '#response-text',
    noSupportingMaterialOption: '[for="supporting-material-yes-no-2"]',
    responseSubmitButton: '#main-form-submit',
    yesRule92Button: '[for="copyToOtherPartyYesOrNo-2"]',
    closeStoredApplication: '#main-content .govuk-button',
    returnOverviewButton: '.govuk-template__body > .govuk-width-container > .govuk-button-group > .govuk-button',
    notificationFlagAfter: '.app-task-list > li:nth-of-type(5) .govuk-tag',
    closeAndReturnToCaseOverview: '#main-content .govuk-button',
    viewCorrespondenceLink: '//a[.="View correspondence"]',
    confirmedCopyCheckBox: '#confirmCopied',
    submit:this.page.locator('[type="submit"]'),
    respondButton: '#respond-button',
    respondToApplicationText:'#respond-to-application-text',
    supportingMaterialRadioYes:'#supporting-material-yes-no',
    supportingMaterialFile:'#supportingMaterialFile',
    uploadFielButton:'#upload',
    copyToOtherPartyYesOrNo:'#copyToOtherPartyYesOrNo',
    checkYourAnswerHeading : '//h1[@class="govuk-panel__title"]',
    responseHeading : '//h2[@class="govuk-summary-list__key govuk-heading-m govuk-!-margin-top-1"]',
    respondentApplication: '[href="/respondent-applications"]'
  }

    async processCitizenHubLogin(username, password) {
      await this.page.goto(params.TestUrlCitizenUi);
      await this.webActions.clickElementByCss(this.elements.returnToExistingClaim);
    
      await this.webActions.checkElementById(this.elements.employmentTribunalAccount);
      await this.clickContinue();
      await this.loginCitizenUi(username, password);
    }

    async loginCitizenUi(username, password){
      await this.webActions.fillField('#username', username);
      await this.webActions.fillField('#password', password);
      await this.elements.submit.click();
    }

    async verifyCitizenHubCaseOverviewPage(caseNumber) {
      await this.webActions.verifyElementContainsText(this.page.locator('#main-content'), 'Case overview');
      await this.webActions.verifyElementContainsText(this.page.locator('#caseNumber'), 'Case number ' + caseNumber);
    }

   async clicksViewLinkOnClaimantApplicationPage(submissionReference) {
      await this.page.goto(params.TestUrlCitizenUi + '/citizen-hub/' + submissionReference);
    }

    async regAccountContactTribunal(applicationType) {
      await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.contactTribunalLinkRegistered));
      await this.webActions.clickElementByCss(this.elements.contactTribunalLinkRegistered);
      await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Contact the tribunal about your case');
      await this.webActions.verifyElementContainsText(this.page.locator('#main-content'), 'Call the Employment Tribunal customer contact centre');
      await this.webActions.clickElementByRole('button', {name: 'Show all sections'});

      try {
        switch (applicationType) {
          case 'withdraw all or part of my claim':
            await this.webActions.verifyElementToBeVisible(this.page.locator('#contact-options-heading-1'));

            await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.withdrawClaimLink));
            await this.webActions.clickElementByCss(this.elements.withdrawClaimLink);
            await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.applicationTextField));
            await this.webActions.fillField(this.elements.applicationTextField, 'blah blah');
            
            await this.clickContinue();
            break;
          case 'submit document for hearing':
            await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.submitHearingDocument), 20000);
            await this.webActions.clickElementByCss(this.elements.submitHearingDocument);
            await this.webActions.verifyElementToBeVisible(this.page.locator('#main-content'), 20000);

            await this.webActions.verifyElementContainsText(this.page.locator('h2.govuk-heading-l'), 'Prepare and submit documents for a hearing');
            break;
          default:
            throw new Error('... invalid option, check you options');
        }
      } catch (e) {
        console.error('invalid option', e.message);
      }
  }

   async rule92Question(option) {
      switch (option) {
        case 'yes':
          await this.webActions.checkElementById(this.elements.yesOptionOnRule92);
          break;
        case 'no':
          await this.webActions.checkElementById(this.elements.noOptionOnRule92);
          await this.webActions.fillField(this.elements.addInfoToNoOption, 'dont want other party to see this');
          break;
        default:
          throw new Error('... you can only select a yes or no option on rule 92 page');
      }
      await this.clickContinue();
    }
    async cyaPageVerification() {
      await this.webActions.verifyElementContainsText(this.page.locator('dl'), 'Application type');
      await this.webActions.verifyElementContainsText(this.page.locator('dl'), 'What do you want to tell or ask the tribunal?');
      await this.webActions.verifyElementContainsText(this.page.locator('dl'), 'Supporting material');
      await this.webActions.verifyElementContainsText(this.page.locator('dl'), 'Do you want to copy this correspondence to the other party to satisfy the Rules of Procedure?');

      await this.webActions.clickElementByCss(this.elements.submitApplicationButton);
      await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'You have sent your application to the tribunal');
      await this.webActions.clickElementByCss(this.elements.returntoCUIcaseOverviewButton);
    }

    async submitDocumentForHearingClaimant() {
      await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.startPreparingHearingDoc), 10000);
      await this.webActions.verifyElementContainsText(this.page.locator('h2.govuk-heading-l'), 'Prepare and submit documents for a hearing');
      await this.webActions.clickElementByCss(this.elements.startPreparingHearingDoc);
      await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.hearingDocAgreeDoc), 5000);
      await this.webActions.checkElementById(this.elements.hearingDocAgreeDoc);
      await this.clickContinue();

      await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.firstListedCase), 10000);
      await this.webActions.checkElementById(this.elements.firstListedCase);
      await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'About your hearing documents');
      await this.webActions.checkElementById(this.elements.myDocumentOption);
      await this.webActions.checkElementById(this.elements.witnessStatementOnly);
      await this.webActions.clickElementByCss(this.elements.continueButton);
      await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.uploadHearingFile), 10000);
      await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Upload your file of documents');

      await this.page.setInputFiles(this.elements.uploadHearingDocButton, 'test/data/welshTest.pdf');
      await this.page.waitForTimeout(3000);
      await this.webActions.clickElementByCss(this.elements.uploadHearingFile);

      await this.page.waitForTimeout(3000);
      await this.webActions.clickElementByCss(this.elements.continueButton);
      await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.changeYourDocument), 10000);
      await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Check your answers');

      await this.webActions.clickElementByCss(this.elements.submitApplicationButton);
      await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.closeAndReturnButton), 10000);
      await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'You have sent your hearing documents to the tribunal');

      await expect(this.page.locator('//*[@id="main-content"]/div/div[1]/p')).toHaveText(
      'Your documents are now uploaded. The tribunal will let you know ' +
      'if they have any questions about the documents you have submitted.'
      );
      await this.webActions.clickElementByCss(this.elements.closeAndReturnButton);
    }

  async respondToAnApplication() {

    await this.page.getByRole('link', { name: 'Respond to the application' }).isVisible();
    await this.page.getByRole('link', { name: 'Respond to the application' }).click();

    await this.page.waitForSelector(this.elements.respondButton);
    await this.page.click(this.elements.respondButton);

    await this.page.waitForSelector(this.elements.respondToApplicationText);
    await this.page.fill(this.elements.respondToApplicationText, 'This is response of an application');

    await this.page.waitForSelector(this.elements.supportingMaterialRadioYes);
    await this.page.check(this.elements.supportingMaterialRadioYes);
    await this.clickContinue();

    await this.page.waitForSelector(this.elements.supportingMaterialFile);
    await this.page.setInputFiles(this.elements.supportingMaterialFile,'test/data/welshTest.pdf');

    await this.page.waitForSelector(this.elements.uploadFielButton);
    await this.page.click(this.elements.uploadFielButton);
    await this.clickContinue();

    await this.page.waitForSelector(this.elements.copyToOtherPartyYesOrNo);
    await this.page.check(this.elements.copyToOtherPartyYesOrNo);
    await this.clickContinue();

    await this.submitButton();

    await this.page.waitForSelector(this.elements.checkYourAnswerHeading);
    await this.closeAndReturn();
    }

    async validateResponseOfResponse(){
      await this.page.getByRole('link', { name: 'View the response' }).isVisible();
      await this.page.getByRole('link', { name: 'View the response' }).click();
      await this.delay(3000);
      await expect(this.page.locator('body')).toContainText('Response of Response');
  }
    async validateRecordDecisionBanner(){
      await this.page.getByRole('link', { name: 'View the decision' }).click();
      await expect(this.page.locator('body')).toContainText('Decision');
    }

}
