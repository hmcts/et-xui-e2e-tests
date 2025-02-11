import { BasePage } from "./basePage";
import { params } from "../utils/config";
import { expect } from "@playwright/test";


export default class CitizenHubPage extends BasePage {

  elements = {
    returnToExistingClaim:this.page.locator('[href="/return-to-existing?lng=en"]'),
    employmentTribunalAccount:this.page.locator( '#return_number_or_account-2'),
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
    contactTribunalLinkRegistered: this.page.locator('[href="/contact-the-tribunal"]'),
    openAllApplicationType: '//span[@class="govuk-accordion__show-all-text"]',
    welshContactTribunalLinkRegistered: '[href="/contact-the-tribunal?lng=cy"]',
    showAllApplicationType: '#contact-options',
    withdrawClaimLink: this.page.locator('[href="/contact-the-tribunal/withdraw?lng=en"]'),
    applicationTextField: this.page.locator('#Contact-Application-Text'),
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
    yesOptionOnRule92: this.page.locator('#copyToOtherPartyYesOrNo'),
    noOptionOnRule92: this.page.locator('#copyToOtherPartyYesOrNo-2'),
    addInfoToNoOption: this.page.locator('#copyToOtherPartyText'),
    submitApplicationButton: this.page.locator('#main-form-submit'),
    returntoCUIcaseOverviewButton:this.page.locator( '//a[contains(.,"Close and return to case overview")]'),
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
    respondToApplicationLink:'//a[contains(.,"respondent-application-details")]',
    respondButton: '#respond-button',
    respondToApplicationText:'#respond-to-application-text',
    supportingMaterialRadioYes:'#supporting-material-yes-no',
    supportingMaterialFile:'#supportingMaterialFile',
    uploadFielButton:'#upload',
    copyToOtherPartyYesOrNo:'#copyToOtherPartyYesOrNo',
    checkYourAnswerHeading : '//h1[@class="govuk-panel__title"]'
  }

    async processCitizenHubLogin(username, password) {
      await this.page.goto(params.TestUrlCitizenUi);
      await this.elements.returnToExistingClaim.click();
      await this.elements.employmentTribunalAccount.check();
      await this.clickContinue();
      await this.loginCitizenUi(username, password);
    }

    async loginCitizenUi(username, password){
      await this.page.locator('#username').fill(username);
      await this.page.locator('#password').fill(password);
      await this.elements.submit.click();
    }

    async verifyCitizenHubCaseOverviewPage(caseNumber) {
      await expect(this.page.locator('#main-content')).toContainText('Case overview');
      await expect(this.page.locator('#caseNumber')).toContainText('Case number ' + caseNumber);
    }

   async clicksViewLinkOnClaimantApplicationPage(submissionReference) {
      await this.page.goto(params.TestUrlCitizenUi + '/citizen-hub/' + submissionReference);
    }

    async regAccountContactTribunal(applicationType) {
      await this.elements.contactTribunalLinkRegistered.isVisible();
      await this.elements.contactTribunalLinkRegistered.click();
      await expect(this.page.locator('h1')).toContainText('Contact the tribunal about your case');
      await expect(this.page.locator('#main-content')).toContainText('Call the Employment Tribunal customer contact centre');
      await this.page.getByRole('button', { name: 'Show all sections' }).click();
      try {
        switch (applicationType) {
          case 'withdraw all or part of my claim':
            await this.page.locator('#contact-options-heading-1').isVisible();
            await this.elements.withdrawClaimLink.isVisible();
            await this.elements.withdrawClaimLink.click();
            await this.elements.applicationTextField.isVisible();
            await this.elements.applicationTextField.fill( 'blah blah');
            await this.clickContinue();
            break;
          case 'submit document for hearing':
            await this.page.waitForSelector(this.elements.submitHearingDocument, { timeout: 20000 });
            await this.page.locator(this.elements.submitHearingDocument).click();
            await this.page.waitForSelector('#main-content', { timeout: 20000 });
            await expect(this.page.locator('h2.govuk-heading-l')).toContainText('Prepare and submit documents for a hearing');
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
          await this.elements.yesOptionOnRule92.check();
          break;
        case 'no':
          await this.elements.noOptionOnRule92.check();
          await this.elements.addInfoToNoOption.fill('dont want other party to see this')
          break;
        default:
          throw new Error('... you can only select a yes or no option on rule 92 page');
      }
      await this.clickContinue();
    }
    async cyaPageVerification() {
      await expect(this.page.locator('dl')).toContainText('Application type');
      await expect(this.page.locator('dl')).toContainText('What do you want to tell or ask the tribunal?');
      await expect(this.page.locator('dl')).toContainText('Supporting material');
      await expect(this.page.locator('dl')).toContainText('Do you want to copy this correspondence to the other party to satisfy the Rules of Procedure?');
      await this.elements.submitApplicationButton.click();
      await expect(this.page.locator('h1')).toContainText('You have sent your application to the tribunal');
      await this.elements.returntoCUIcaseOverviewButton.click();
    }

    async submitDocumentForHearingClaimant() {
      await this.page.waitForSelector(this.elements.startPreparingHearingDoc, { timeout: 10000 });
      await expect(this.page.locator('h2.govuk-heading-l')).toContainText('Prepare and submit documents for a hearing');
      await this.page.locator(this.elements.startPreparingHearingDoc).click();
      await this.page.waitForSelector(this.elements.hearingDocAgreeDoc, { timeout: 5000 });
      await this.page.locator(this.elements.hearingDocAgreeDoc).check();
      await this.page.locator(this.elements.continueButton).click();
      await this.page.waitForSelector(this.elements.firstListedCase, { timeout: 10000 });
      await this.page.locator(this.elements.firstListedCase).check();
      await expect(this.page.locator('h1')).toContainText('About your hearing documents');
      await this.page.locator(this.elements.myDocumentOption).check();
      await this.page.locator(this.elements.witnessStatementOnly).check();
      await this.page.locator(this.elements.continueButton).click();
      await this.page.waitForSelector(this.elements.uploadHearingFile, { timeout: 10000 });
      await expect(this.page.locator('h1')).toContainText('Upload your file of documents');
      await this.page.setInputFiles(this.elements.uploadHearingDocButton, 'test/data/welshTest.pdf');
      await this.page.waitForTimeout(3000);
      await this.page.locator(this.elements.uploadHearingFile).click();
      await this.page.waitForTimeout(3000);
      await this.page.locator(this.elements.continueButton).click();
      await this.page.waitForSelector(this.elements.changeYourDocument, { timeout: 10000 });
      await expect(this.page.locator('h1')).toContainText('Check your answers');
      await this.elements.submitApplicationButton.click();
      await this.page.waitForSelector(this.elements.closeAndReturnButton, { timeout: 10000 });
      await expect(this.page.locator('h1')).toContainText('You have sent your hearing documents to the tribunal');
      await expect(this.page.locator('//*[@id="main-content"]/div/div[1]/p')).toHaveText(
      'Your documents are now uploaded. The tribunal will let you know ' +
      'if they have any questions about the documents you have submitted.'
      );
      await this.page.locator(this.elements.closeAndReturnButton).click();
    }

  async respondToAnApplication() {

    await this.page.waitForSelector(this.elements.respondToApplicationLink);
    await this.page.click(this.elements.respondToApplicationLink);

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




}
