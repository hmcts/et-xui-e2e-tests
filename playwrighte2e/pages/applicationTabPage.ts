import { Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class ApplicationTabPage  extends BasePage {

    notification_tab2 = '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Notifications"]';
    applicationTab = '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Applications"]';
    respondToAnApplicationLink = '//a[.="Respond to an application"]';
    notification_link = 'text=Send a notification';
    respondToNotificationLink = 'text=Respond to an order or request from the tribunal';
    caseFlagsTab = '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Case File View"]';
    caseFileViewTab = '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Case File View"]';
    caseFileViewElement = '#case-file-view';
    searchDocumentFromCaseFileView = '#document-search';
    uncategorisedDocument = '//span[.="Uncategorised documents"]';
    respondToApplication = '#tseAdminSelectApplication';
    responseTitle='#tseAdmReplyEnterResponseTitle';
    cmoRadio='#tseAdmReplyIsCmoOrRequest-Case management order';
    cmoDropdown='#tseAdmReplyCmoMadeBy';
    fullNameTextBox='#tseAdmReplyCmoEnterFullName';
    responseRequiredDropdown:'#tseAdmReplyCmoIsResponseRequired';
    partyRespondDropDown:'#tseAdmReplyCmoSelectPartyRespond';
    partyNotifyRadio:'#tseAdmReplySelectPartyNotify-Both parties';
    fileUpload = 'input#tseAdmReplyAddDocument_0_uploadedDocument';
    recordDecisionFileUpload = '#tseAdminResponseRequiredNoDoc_0_uploadedDocument'
    recordDecision = '//a[.="Record a decision"]';
    grantedRadioButton='#tseAdminDecision-Granted';
    cmoRadioButton='#tseAdminTypeOfDecision-Case management order';
    legalOfficerRadioButton='#tseAdminDecisionMadeBy-Legal officer';
    bothPartiesRadioButton='#tseAdminSelectPartyNotify-Both parties';
    recordDecisionTitle = '#tseAdminEnterNotificationTitle';
    fullName= '#tseAdminDecisionMadeByFullName';
    judgmentRadioButton= '#tseAdminTypeOfDecision-Judgment'

    async selectNotificationLink() {
        await this.page.waitForSelector(this.notification_tab2, { timeout: 20000 });
        await this.page.click(this.notification_tab2);
        await this.page.click(this.notification_link);
    }

    async sendNotification() {
        await this.page.click(this.notification_link);
    }

    async respondToAnOrderOrNotification() {
        await this.page.click(this.respondToNotificationLink);
    }

    async selectCaseFlagTabs() {
        await this.page.click(this.caseFlagsTab);
        await this.page.waitForSelector('text=Alexa Siri');
        await this.page.waitForSelector('text=Henry Marsh');
        await this.page.waitForSelector('text=Case level flags');
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
        await this.page.getByRole('radio', { name:'Both parties'}).check();
        await this.clickContinue();
        await this.delay(3000);

        // await this.submit.isVisible();
        await this.submitButton();
        await this.closeAndReturn();
    }

    async validateRecordDecisionDetails(){
        await this.page.waitForSelector(this.applicationTab, { timeout: 20000 });
        await this.page.click(this.applicationTab);
        await this.page.getByRole('link', { name: 'accordion-img' }).click();
        await expect(this.page.locator('ccd-read-complex-field-collection-table')).toContainText('Record Decision');
        await expect(this.page.locator('ccd-read-complex-field-collection-table')).toContainText('Granted');
    }

    async respondToAnApplication(){
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
        await this.page.getByRole('radio', { name:'Both parties'}).check();

        /* File upload is not working within the respond event, needs testing with newer version of playwright when released
        await this.addNewBtn.click();
        await this.page.waitForSelector(this.fileUpload);
        await this.page.setInputFiles(this.fileUpload,'test/data/test.txt');
        await this.delay(10000);
        */
        await this.clickContinue();

        await this.delay(3000);
        await this.submitButton();
        await this.closeAndReturn();
    }

    async legalRepRespondToAnApplication(){
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
      await this.page.setInputFiles('#tseResponseSupportingMaterial_0_uploadedDocument','test/data/test.txt');
      await this.delay(5000);
      await this.clickContinue();

      await this.webActions.checkElementById('#tseResponseCopyToOtherParty-Yes');
      await this.clickContinue();
      await this.delay(2000);

      await this.submitButton();

      await expect(this.page.locator('h3')).toContainText('What happens next');
      await this.closeAndReturn();
    }
}
