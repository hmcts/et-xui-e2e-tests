import { BasePage } from "../basePage.ts";
import config from "../../config/config.ts";
import { expect, Locator, Page } from '@playwright/test';

export default class CitizenHubPage extends BasePage {

  private readonly caseOverviewPageTitle: Locator;
  private readonly caseNumberText: Locator;
  private readonly contactTribunalLink: Locator;
  private readonly appointALegalRepLink: Locator;

  constructor(page: Page) {
    super(page);
    this.caseOverviewPageTitle = this.page.locator(`xpath=//h2[contains(normalize-space(),'Case overview')]`);
    this.caseNumberText = this.page.locator('#caseNumber');
    this.contactTribunalLink = this.page.locator(`xpath=//a[normalize-space()='Contact the tribunal about my case']`);
    this.appointALegalRepLink = this.page.locator(`xpath=//a[normalize-space()='Appoint a legal representative']`);
  }

  elements = {
    respondButton: '#respond-button',
    responseTextElement: '.govuk-label--m',
    providingMaterialYes: '#supporting-material-yes-no',
    addTextToResponse: '#respond-to-application-text',
    supportingMaterialAttachment: '#supportingMaterialFile',
    uploadButton: '#upload',
    contactTribunalAboutMyCase: '[href="/contact-the-tribunal"]',
    changeMyLegalRep: '[href="/change-legal-representative"]',
    linkToET3Response: '[href="/case-document/response-from-respondent"]',
    contactTribunalLinkRegistered: '[href="/contact-the-tribunal"]',
    appointLegalRepLink: '[href="/appoint-legal-representative"]',
    openAllApplicationType: '//span[@class="govuk-accordion__show-all-text"]',
    welshContactTribunalLinkRegistered: '[href="/contact-the-tribunal?lng=cy"]',
    showAllApplicationType: '#contact-options',
    withdrawClaimLink: '[href="/contact-the-tribunal/withdraw?lng=en"]',
    applicationTextField: '#Contact-Application-Text',
    changePersonalDetail: '[href="/contact-the-tribunal/change-details?lng=en"]',
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
    submit: this.page.locator('[type="submit"]'),
    respondToApplicationText: '#respond-to-application-text',
    supportingMaterialRadioYes: '#supporting-material-yes-no',
    supportingMaterialFile: '#supportingMaterialFile',
    uploadFielButton: '#upload',
    copyToOtherPartyYesOrNo: '#copyToOtherPartyYesOrNo',
    checkYourAnswerHeading: '//h1[@class="govuk-panel__title"]',
    responseHeading: '//h2[@class="govuk-summary-list__key govuk-heading-m govuk-!-margin-top-1"]',
    respondentApplication: '[href="/respondent-applications"]',
    clickRespondentContactDetailsLink: '[href="/respondent-contact-details"]',
  };

  async navigateToSubmittedCaseOverviewOfClaimant(submissionReference: string) {
    await this.page.goto(config.TestUrlCitizenUi + '/citizen-hub/' + submissionReference);
    await this.page.waitForLoadState('load');
  }

  async citizenHubCaseOverviewPage(caseNumber: string) {
    await expect(this.caseOverviewPageTitle).toBeVisible();
    await expect(this.caseNumberText).toHaveText('Case number ' + caseNumber);
  }

  async navigateToContactTheTribunalPage() {
    await expect(this.contactTribunalLink).toBeVisible();
    await this.contactTribunalLink.click();
    await this.page.waitForLoadState('load');
  }

  async appointLegalRep(caseNumber: string, submissionReference: string) {
    await expect(this.appointALegalRepLink).toBeVisible();
    await this.appointALegalRepLink.click();
    await this.page.waitForLoadState('load');

    const caseNumberLocator = this.page.locator(`xpath=//dt[normalize-space()='Online case reference number']/following-sibling::dd`);
    await expect(caseNumberLocator).toBeVisible();
    const caseRefText = await caseNumberLocator.textContent();
    expect(caseRefText).toBeDefined();
    expect(caseRefText?.trim()).toEqual(submissionReference);

    const claimantNameLocator = this.page.locator(`xpath=//dt[normalize-space()='Claimant name']/following-sibling::dd`);
    await expect(claimantNameLocator).toBeVisible();
    const claimantNameText = await claimantNameLocator.textContent();
    expect(claimantNameText).toBeDefined();

    const tribunalCaseNumberLocator = this.page.locator(`xpath=//dt[normalize-space()='Tribunal case number']/following-sibling::dd`);
    await expect(tribunalCaseNumberLocator).toBeVisible();
    const tribunalCaseNumberText = await tribunalCaseNumberLocator.textContent();
    expect(tribunalCaseNumberText).toBeDefined();
    expect(tribunalCaseNumberText?.trim()).toEqual(caseNumber);

    await expect(this.page.getByRole('heading', { name: 'Download documents'})).toBeVisible();

    const documents = this.page.locator(`xpath=//a[@href='/all-documents']`);
    await expect(documents).toBeVisible();
    await documents.click();

    const docName = `ET1 - ${claimantNameText?.trim()}.pdf`;
    const documentLinkLocator = this.page.locator(`xpath=//a[normalize-space()='${docName}']`);
    await expect(documentLinkLocator).toBeVisible();

    return { caseRef: caseRefText??'', claimantName: claimantNameText??'', tribunalCaseNumber: tribunalCaseNumberText??'' };
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
    await this.page.setInputFiles(this.elements.supportingMaterialFile, 'test/data/welshTest.pdf');

    await this.page.waitForSelector(this.elements.uploadFielButton);
    await this.page.click(this.elements.uploadFielButton);
    await this.clickContinue();

    await this.page.waitForSelector(this.elements.copyToOtherPartyYesOrNo);
    await this.page.check(this.elements.copyToOtherPartyYesOrNo);
    await this.clickContinue();

    await this.clickSubmitButton();

    await this.page.waitForSelector(this.elements.checkYourAnswerHeading);
    await this.clickCloseAndReturn();
  }

  async validateResponseOfResponse() {
    await this.page.getByRole('link', { name: 'View the response' }).isVisible();
    await this.page.getByRole('link', { name: 'View the response' }).click();
    await this.delay(3000);
    await expect(this.page.locator('body')).toContainText('Response of Response');
  }
  async validateRecordDecisionBanner() {
    await this.page.getByRole('link', { name: 'View the decision' }).click();
    await expect(this.page.locator('body')).toContainText('Decision');
  }

  async respondToRespondentApplication(option: string) {
    await this.page.getByRole('link', { name: "Respondent's applications" }).isVisible();
    await this.webActions.clickElementByRole('link', { name: "Respondent's applications" });
    await this.delay(2000);

    switch (option) {
      case 'TypeA':
        await this.page.getByRole('link', { name: 'Amend response' }).isVisible();
        await this.webActions.clickElementByRole('link', { name: 'Amend response' });
        break;
      case 'TypeB':
        await this.page.getByRole('link', { name: 'Change personal details' }).isVisible();
        await this.webActions.clickElementByRole('link', { name: 'Change personal details' });
        break;
      default:
        throw new Error('... Incorrect input, select correct application type');
    }

    await this.webActions.clickElementByRole('button', { name: 'Respond' });
    await this.page.locator('#respond-to-application-text').isVisible();
    await this.webActions.fillField('#respond-to-application-text', 'Response from claimant');
    await this.webActions.checkElementById('#supporting-material-yes-no-2');
    await this.clickContinue();

    await this.page.locator('#copyToOtherPartyYesOrNo').isVisible();
    await this.webActions.checkElementByLabel('Yes, I confirm I want to copy');
    await this.clickContinue();

    await this.page.waitForSelector('text=Check your answers');
    await this.clickSubmitButton();
  }

  async validateApplicationBanner() {
    await expect(this.page.getByLabel('Important')).toContainText('The respondent has applied to amend response');
    await expect(this.page.getByRole('link', { name: 'Respond to the application' })).toBeVisible();
  }

  async clickRespondentContactDetailsLink() {
    await this.webActions.clickElementByCss(this.elements.clickRespondentContactDetailsLink);
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Respondent contact details');
  }

  async verifyRespondentContactDetails() {
    await this.webActions.verifyElementContainsText(this.page.locator('dl'), 'Name');
    await this.webActions.verifyElementContainsText(this.page.locator('dl'), 'Employer name');
    await this.webActions.verifyElementContainsText(this.page.locator('dl'), 'Preferred method of contact');
  }

  async verifyNotificationBanner(notificationType: string) {
    switch (notificationType) {
      case 'ET1 claim':
      case 'CMO':
      case 'ECC':
        await expect(this.page.locator('#main-content')).toContainText('The tribunal has sent you a notification');
        await this.webActions.clickElementByText('View the notification -');
        break;
      case 'Hearing':
        await expect(this.page.locator('#main-content')).toContainText(
          'The tribunal has sent you a notification about your hearing.',
        );
        await this.webActions.clickElementByText('View the notification');
        break;
      default:
        throw new Error('... Notification Type not provided ...');
    }

    switch (notificationType) {
      case 'ET1 claim':
        await expect(this.page.locator('dl')).toContainText('Claim (ET1)');
        break;
      case 'CMO':
        await expect(this.page.locator('dl')).toContainText('Case management orders / requests');
        await expect(this.page.locator('dl')).toContainText('Case management order');
        break;
      case 'ECC':
        await expect(this.page.locator('dl')).toContainText('Employer Contract Claim');
        break;
      case 'Hearing':
        await this.webActions.clickElementByText('test Notification');
        await expect(this.page.locator('dl')).toContainText('Hearing');
        break;
      default:
        throw new Error('... Please provide Notification type ...');
    }
    await expect(this.page.locator('dl')).toContainText('Tribunal');
  }

  async verifyNotificationBannerForNoticeOfClaim() {
    await expect(this.page.locator('#main-content')).toContainText('The tribunal has acknowledged your claim');
    await this.webActions.clickElementByText('View the Acknowledgement of Claim');
    await expect(this.page.locator('#main-content')).toContainText('Notice of a Claim and Notice of Hearing');
  }

  async verifyLegalRepNotificationBanner() {
    await expect(this.page.locator('h3')).toContainText('You are now being legally represented');
  }

  async contactTheTribunalLink() {
    await this.webActions.clickElementByCss(this.elements.contactTribunalLinkRegistered);
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Contact the tribunal about your case');
    await this.webActions.verifyElementContainsText(
      this.page.locator('#main-content'),
      'You are now being legally represented by',
    );
  }

  async changeMyLegalRep() {
    await this.webActions.clickElementByCss(this.elements.changeMyLegalRep);
    await this.webActions.checkElementById('#legalRep-2');
    await this.clickSubmitButton();
  }

  async verifyLegalRepUnassignedNotificationBanner() {
    await expect(this.page.getByLabel('Important')).toContainText('You are no longer legally represented.');
    await this.page.locator(this.elements.appointLegalRepLink).isVisible();
  }
}
