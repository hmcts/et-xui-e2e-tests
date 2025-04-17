import { Page, expect } from '@playwright/test';
import { BasePage } from "./basePage";
import { params } from '../utils/config';

export class ManageOrgPage extends BasePage {

    ElementManageOrg = '.hmcts-header__link';
    ClickAssignedCases = '//a[.="Assigned cases"]';
    ClickUnassignedCases = '//a[.="Unassigned cases"]';
    ClickShowCasesFilter = '.govuk-button--secondary';
    ClickShowUnassignedCasesFilter = '.govuk-button';
    AllAssigneesRadio = '[for="caa-filter-all-assignees"]';
    AssignedCasesElement = '.govuk-heading-xl';
    AssigneeNameSearchBox = '#assignee-person';
    AssigneeNameRadio = '[for="caa-filter-assignee-name"]';
    CaseReferenceSearchBox = '#caa-filter-case-reference-number';
    CaseRefTextBox = "#case-reference-number";

    async allAssignedCases() {
        await this.webActions.verifyElementToBeVisible(this.page.locator(this.ElementManageOrg), 20000);
        await this.page.waitForSelector('text=Organisation');
        await this.page.waitForSelector('text=Users');
        await this.page.waitForSelector('text=Unassigned Cases');
        await this.page.waitForSelector('text=Assigned Cases');
        await this.webActions.clickElementByCss(this.ClickAssignedCases);
        await this.page.waitForSelector('text=Assigned Cases');
        await this.webActions.clickElementByCss(this.ClickShowCasesFilter);
        await this.page.waitForSelector('text=Filter assigned cases');
        await this.page.waitForSelector('text=All assignees');
        await this.webActions.clickElementByCss(this.AllAssigneesRadio);
        await this.applyFilterButton.click();
    }

    async filterByAssigneeName(assigneeName: string) {
        await this.webActions.verifyElementToBeVisible(this.page.locator(this.AssignedCasesElement), 20000);
        await this.page.waitForSelector('text=Assignee name');
        await this.webActions.clickElementByCss(this.AssigneeNameRadio);
        await this.page.waitForSelector('text=Type the name and select an available match option');
        await this.webActions.clickElementByCss(this.AssigneeNameSearchBox);
        await this.webActions.fillField(this.AssigneeNameSearchBox, assigneeName);
        await this.applyFilterButton.click();
        (params.TestEnv == 'demo') ? await this.verifyResultsCount(25): await this.verifyResultsCount(5);
    }

    async verifyResultsCount(expTotCount: number) {
        await this.page.locator('tbody tr').first().waitFor();
        const totRes = await this.page.locator('tbody tr').count();
        expect(totRes).toEqual(expTotCount);
    }

    async filterByReferenceNumber(caseReferenceNumber: string) {
        await this.webActions.verifyElementToBeVisible(this.page.locator(this.AssignedCasesElement), 20000);
        await this.page.waitForSelector('text=Case reference number');
        await this.webActions.clickElementByCss(this.CaseReferenceSearchBox);
        await this.webActions.fillField(this.CaseRefTextBox, caseReferenceNumber);
        await this.applyFilterButton.click();
        await this.delay(3000);
        (params.TestEnv == 'aat') ? await this.verifyResultsCount(1): console.log('No results found');
    }

    async unassignedCases() {
        await this.webActions.verifyElementToBeVisible(this.page.locator(this.ElementManageOrg), 20000);
        await this.webActions.clickElementByCss(this.ClickUnassignedCases);
        await this.page.waitForSelector('text=Unassigned Cases');
        await this.page.waitForSelector('text=Show unassigned cases filter');
        await this.webActions.clickElementByCss(this.ClickShowUnassignedCasesFilter);
        await this.page.waitForSelector('text=Search for an unassigned case');
        await this.webActions.clickElementByCss('#case-reference-number');
        await this.webActions.fillField('#case-reference-number', '');
        await this.applyFilterButton.click();
    }

    async assignCaseToSolicitor(assigneeName: string, caseReferenceNumber: string) {
        await this.allAssignedCases();
        await this.filterByAssigneeName(assigneeName);
        await this.filterByReferenceNumber(caseReferenceNumber);
    }

    async unassignCaseFromSolicitor() {
        await this.unassignedCases();
    }
}
