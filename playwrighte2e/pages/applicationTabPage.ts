import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { CommonActionsHelper } from './helpers/CommonActionsHelper.ts';
import { AxeUtils } from '@hmcts/playwright-common';

export class ApplicationTabPage extends BasePage {

  private readonly commonActionHelper: CommonActionsHelper;
  private readonly selectAnApplicationTitle: Locator;
  private readonly applicationTypeDropdown: Locator;
  private readonly fileUpload: Locator;
  private readonly informationInputTextArea: Locator;
  private readonly copyThisCorrepondenceTitle: Locator;
  private readonly copyThisCorrespondenceToOtherPartyYes: Locator;
  private readonly copyThisCorrespondenceToOtherPartyNo: Locator;
  private readonly copyThisCorrespondenceNoTextArea: Locator;
  private readonly openApplicationRadio: Locator;
  private readonly closedApplicationRadio: Locator;
  private readonly viewApplicationDropdown: Locator;

  notification_tab2 =
    '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Notifications"]';
  applicationTab =
    '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Applications"]';
  respondToAnApplicationLink = '//a[.="Respond to an application"]';
  notification_link = 'text=Send a notification';
  respondToNotificationLink = 'text=Respond to an order or request from the tribunal';
  caseFlagsTab =
    '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Case File View"]';
  caseFileViewTab =
    '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Case File View"]';
  caseFileViewElement = '#case-file-view';
  searchDocumentFromCaseFileView = '#document-search';
  respondToApplication = '#tseAdminSelectApplication';
  responseTitle = '#tseAdmReplyEnterResponseTitle';
  recordDecision = '//a[.="Record a decision"]';
  grantedRadioButton = '#tseAdminDecision-Granted';
  recordDecisionTitle = '#tseAdminEnterNotificationTitle';
  fullName = '#tseAdminDecisionMadeByFullName';
  judgmentRadioButton = '#tseAdminTypeOfDecision-Judgment';

  constructor(page: Page, commonActionHelper: CommonActionsHelper) {
    super(page);
    this.commonActionHelper = commonActionHelper;
    this.selectAnApplicationTitle = this.page.getByRole('heading', { name: 'Select an application' });
    this.applicationTypeDropdown = this.page.locator(`#resTseSelectApplication`);

    this.fileUpload = this.page.locator(`#resTseDocument1`);
    this.informationInputTextArea = this.page.locator(`#resTseTextBox1`);
    this.copyThisCorrepondenceTitle = this.page.getByRole('heading', {
      name: 'Copy this correspondence to the other party',
    });
    this.copyThisCorrespondenceToOtherPartyYes = this.page.locator(`#resTseCopyToOtherPartyYesOrNo-Yes`);
    this.copyThisCorrespondenceToOtherPartyNo = this.page.locator(`#resTseCopyToOtherPartyYesOrNo-No`);
    this.copyThisCorrespondenceNoTextArea = this.page.locator(`#resTseCopyToOtherPartyTextArea`);
    this.openApplicationRadio = this.page.locator(`#tseViewApplicationOpenOrClosed-Open`);
    this.closedApplicationRadio = this.page.locator(`#tseViewApplicationOpenOrClosed-Closed`);
    this.viewApplicationDropdown = this.page.locator(`#tseViewApplicationSelect`);
  }

  async selectEitherViewOrMakeOrRespondOrRecordADecisionLink(linkName: string) {
    await this.page.waitForLoadState('load');
    const linkLocator = this.page.locator(`//a[normalize-space()="${linkName}"]`);
    await this.webActions.verifyElementToBeVisible(linkLocator);
    await linkLocator.click();
    await this.page.waitForLoadState('load');
  }

  async selectApplicationType(applicationType: string) {
    await this.page.waitForLoadState('load');
    await expect(this.selectAnApplicationTitle).toBeVisible();
    await this.applicationTypeDropdown.selectOption(applicationType);
  }

  async fillApplicationDetails(details: string) {
    await expect(this.informationInputTextArea).toBeVisible();
    await this.informationInputTextArea.fill(details);

    await this.commonActionHelper.uploadWithRateLimitRetry(
      this.page,
      this.fileUpload,
      'playwrighte2e/resources/test_file/welshTest.pdf',
    );
  }

  async selectCopyThisCorrespondence(option: string) {
    await this.page.waitForLoadState('load');
    await expect(this.copyThisCorrepondenceTitle).toBeVisible();
    switch (option.toLowerCase()) {
      case 'yes':
        await expect(this.copyThisCorrespondenceToOtherPartyYes).toBeVisible();
        await this.copyThisCorrespondenceToOtherPartyYes.check();
        break;
      case 'no':
        await expect(this.copyThisCorrespondenceToOtherPartyNo).toBeVisible();
        await this.copyThisCorrespondenceToOtherPartyNo.check();
        await this.copyThisCorrespondenceNoTextArea.fill("Reason for not copying to other party");
        break;
      default:
        throw new Error(`R92 option: ${option} is not recognized.`);
    }
  }

  async assertCheckYourAnswersPage(applicationType: string, details: string) {
    await this.page.waitForLoadState('load');
    const checkYourAnswersPageTitle = this.page.getByRole('heading', { name: 'Check your answers' });
    await expect(checkYourAnswersPageTitle).toBeVisible();

    const applicationTypeCya = this.page.locator(
      `xpath=//th/span[normalize-space()='Select an application']/../following-sibling::td[1]`,
    );
    await expect(applicationTypeCya).toBeVisible();
    await expect(applicationTypeCya).toHaveText(applicationType);

    const document = this.page.locator(`xpath=//th/span[normalize-space()='Document']/../following-sibling::td[1]`);
    await expect(document).toBeVisible();
    await expect(document).toHaveText('welshTest.pdf');

    const additionalInformation = this.page.locator(
      `xpath=//th/span[normalize-space()='Use this box for any accompanying information']/../following-sibling::td[1]`,
    );
    await expect(additionalInformation).toBeVisible();
    await expect(additionalInformation).toHaveText(details);
  }

  async enterDetailsForMakingApplication(applicationType: string, axeUtils?: AxeUtils) {
    await this.selectEitherViewOrMakeOrRespondOrRecordADecisionLink('Make an application');
    await this.selectApplicationType(applicationType);
    if(axeUtils) await axeUtils.audit();
    await this.clickContinue();

    await this.page.waitForLoadState('load');
    const applicationTypeTitle = this.page.getByRole('heading', { name: applicationType });
    await expect(applicationTypeTitle).toBeVisible();
    const details = 'Details of application for ' + applicationType;
    await this.fillApplicationDetails(details);
    if (axeUtils) await axeUtils.audit();
    await this.clickContinue();

    await this.selectCopyThisCorrespondence('Yes');
    if (axeUtils) await axeUtils.audit();
    await this.clickContinue();

    await this.assertCheckYourAnswersPage(applicationType, details);
    if (axeUtils) await axeUtils.audit();
    await this.clickSubmitButton();

    await expect(this.page.getByRole('heading' ,{name:'What happens next'})).toBeVisible();
    if (axeUtils) await axeUtils.audit();
    await this.clickCloseAndReturn();
  }

  async selectWhatApplicationYouWishToView(openOrClosed: string) {
    await this.page.waitForLoadState('load');

    switch (openOrClosed.toLowerCase()) {
      case 'open':
        await expect(this.openApplicationRadio).toBeVisible();
        await this.openApplicationRadio.check();
        break;
      case 'closed':
        await expect(this.closedApplicationRadio).toBeVisible();
        await this.closedApplicationRadio.check();
        break;
      default:
        throw new Error(`Option: ${openOrClosed} is not recognized.`);
    }
  }

  async selectApplicationToView(applicationName: string) {
    await this.page.waitForLoadState('load');
    await expect(this.viewApplicationDropdown).toBeVisible();
    await this.viewApplicationDropdown.selectOption(`1 ${applicationName}`);
  }

  async assertViewApplicationPageDetails(details: string[]) {
    await this.page.waitForLoadState('load');
    const viewApplicationData = this.page.locator(`#tseApplicationSummaryAndResponsesMarkupLabel`);
    for(const detail of details) {
      const key = detail.split('-')[0].trim();
      const value = detail.split('-')[1].trim();
      const detailLocator = viewApplicationData.locator(
        `xpath=//td[normalize-space()='${key}']/following-sibling::td`,
      );
      await expect(detailLocator).toBeVisible();
      await expect(detailLocator).toHaveText(value);
    }
  }

  async viewApplicationAndAssertDetails(applicationType: string, openOrClosed: string, details: string[]) {
    await this.page.waitForLoadState('load');
    await this.selectEitherViewOrMakeOrRespondOrRecordADecisionLink('View an application');
    await expect(this.page.getByRole('heading', { name: 'View application' })).toBeVisible();
    await this.selectWhatApplicationYouWishToView(openOrClosed);
    await this.clickContinue();
    await this.selectApplicationToView(applicationType);
    await this.clickContinue();
    await this.assertViewApplicationPageDetails(details);
  }

  async selectCaseFileView() {
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.caseFileViewTab), 20000);
    await this.webActions.clickElementByCss(this.caseFileViewTab);
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.caseFileViewElement), 25000);

    await this.page.locator('h2.govuk-heading-l').waitFor();
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.searchDocumentFromCaseFileView));
  }

  async recordADecision() {
    await this.page.waitForSelector(this.applicationTab, { timeout: 20000 });
    await this.page.click(this.applicationTab);
    await this.page.waitForSelector(this.recordDecision);
    await this.page.click(this.recordDecision);
    await expect(this.page.locator('ccd-case-edit-page')).toContainText('Record a decision');
    await this.page.selectOption(this.respondToApplication, '1 - Amend response');
    await this.clickContinue();

    await this.page.waitForSelector(this.recordDecisionTitle, { timeout: 40000 });
    await this.page.fill(this.recordDecisionTitle, 'Record Decision');
    await this.page.check(this.grantedRadioButton);
    await this.page.check(this.judgmentRadioButton);

    /* File upload is not working within the respond event, needs testing with newer version of playwright when released
        await this.addNewBtn.click();
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.page.click(this.recordDecisionFileUpload)
        ]);
        await fileChooser.setFiles(path.join(__dirname, '../data/test-file/test-doc.pdf'));
        */

    await this.page.getByRole('radio', { name: 'Legal officer' }).check();
    await this.page.fill(this.fullName, 'caseworker');
    await this.page.getByRole('radio', { name: 'Both parties' }).check();
    await this.clickContinue();
    await this.delay(3000);

    // await this.submit.isVisible();
    await this.clickSubmitButton();
    await this.clickCloseAndReturn();
  }

  async validateRecordDecisionDetails() {
    await this.page.getByRole('link', { name: 'accordion-img' }).click();
    await expect(this.page.locator('ccd-read-complex-field-collection-table')).toContainText('Record Decision');
    await expect(this.page.locator('ccd-read-complex-field-collection-table')).toContainText('Granted');
  }

  async respondToAnApplication() {
    await this.page.waitForSelector(this.applicationTab, { timeout: 20000 });
    await this.page.click(this.applicationTab);
    await this.page.waitForSelector(this.respondToAnApplicationLink);
    await this.page.click(this.respondToAnApplicationLink);
    await expect(this.page.locator('ccd-case-edit-page')).toContainText('Respond to an application');
    await this.page.selectOption(this.respondToApplication, '1 - Amend response');
    await this.clickContinue();

    await this.page.waitForSelector(this.responseTitle, { timeout: 30000 });
    await this.page.fill(this.responseTitle, 'Response of Response');

    await this.page.getByRole('radio', { name: 'Neither' }).check();
    await this.page.getByRole('radio', { name: 'Both parties' }).check();

    /* File upload is not working within the respond event, needs testing with newer version of playwright when released
        await this.addNewBtn.click();
        await this.page.waitForSelector(this.fileUpload);
        await this.page.setInputFiles(this.fileUpload,'playwrighte2e/resources/test_file/test.txt');
        await this.delay(10000);
        */
    await this.clickContinue();

    await this.delay(3000);
    await this.clickSubmitButton();
    await this.clickCloseAndReturn();
  }

  async legalRepRespondToAnApplication() {
    await this.page.waitForSelector(this.applicationTab, { timeout: 20000 });
    await this.page.click(this.applicationTab);
    await this.page.waitForSelector(this.respondToAnApplicationLink);
    await this.page.click(this.respondToAnApplicationLink);
    await expect(this.page.locator('ccd-case-edit-page')).toContainText('Respond to an application');
    await this.page.selectOption('#tseRespondSelectApplication', '1: 1');
    await this.clickContinue();

    await this.page.waitForSelector('#tseResponseText', { timeout: 30000 });
    await this.page.fill('#tseResponseText', 'Response of an application');
    await this.webActions.checkElementById('#tseResponseHasSupportingMaterial_Yes');
    //RET-3852
    //await this.clickContinue();

    await this.addNewBtn.click();
    await this.page.waitForSelector('#tseResponseSupportingMaterial_0_uploadedDocument');
    await this.page.setInputFiles(
      '#tseResponseSupportingMaterial_0_uploadedDocument',
      'playwrighte2e/resources/test_file/test.txt',
    );
    await this.delay(5000);
    await this.clickContinue();

    await this.webActions.checkElementById('#tseResponseCopyToOtherParty-Yes');
    await this.clickContinue();
    await this.delay(2000);

    await this.clickSubmitButton();

    await expect(this.page.locator('h3')).toContainText('What happens next');
    await this.clickCloseAndReturn();
  }
}
