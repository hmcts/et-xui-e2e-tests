import {expect, Page} from '@playwright/test';
import { BasePage } from './basePage';
import {th} from "@faker-js/faker";

export class ApplicationTabPage  extends BasePage{

    notification_tab2 = '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Notifications"]';
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
        await this.page.getByRole('link', { name: 'Respond to an application' }).click();
        await expect(this.page.locator('ccd-case-edit-page')).toContainText('Respond to an application');
        await this.page.selectOption(this.respondToApplication, '1 - Amend response');
        await this.clickContinue();

        await this.page.fill(this.responseTitle, 'Response of Response');
        await this.page.check(this.cmoRadio);
        await this.page.selectOption(this.cmoDropdown, 'Legal officer');
        await this.page.fill(this.fullNameTextBox, 'Caseworker 1')

        await this.page.selectOption(this.responseRequiredDropdown, 'Yes - view document for details');
        await this.page.selectOption(this.partyRespondDropDown, 'Both parties');

        await this.page.check(this.partyNotifyRadio);
        await this.addNewButtonClick();
        await this.page.setInputFiles('#tseAdmReplyAddDocument_0_uploadedDocument','test/data/welshTest.pdf');
        await this.clickContinue();

        await expect(this.page.locator('h2')).toContainText('Check your answers');
        await this.submitButton();
    }
}
