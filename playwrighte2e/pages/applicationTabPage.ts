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
        await this.page.waitForSelector(this.caseFileViewTab, { timeout: 20000 });
        await this.page.click(this.caseFlagsTab);
        await this.page.waitForSelector(this.caseFileViewElement, { timeout: 25000 });
        await this.page.locator('h2.govuk-heading-l').waitFor();
        await this.page.waitForSelector(this.searchDocumentFromCaseFileView);
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
        await this.page.waitForSelector('#tseAdmReplyIsCmoOrRequest', { timeout: 30000 });
        await this.page.getByRole('radio', { name: 'Neither' }).check();
        await this.page.getByRole('radio', { name:'Both parties'}).check();

        await this.addNewButtonClick();
        await this.page.waitForSelector('#tseAdmReplyAddDocument_0_uploadedDocument', {timeout:3000})
        await this.page.setInputFiles('#tseAdmReplyAddDocument_0_uploadedDocument','test/data/welshTest.pdf');
        await this.clickContinue();

        await expect(this.page.locator('h2')).toContainText('Check your answers');
        await this.submitButton();
    }
}
