import { Page, expect } from '@playwright/test';
import { BasePage } from "./basePage";
import exp from 'constants';

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
        await this.page.waitForSelector(this.ElementManageOrg, { timeout: 20000 });
        await this.page.waitForSelector('text=Organisation');
        await this.page.waitForSelector('text=Users');
        await this.page.waitForSelector('text=Unassigned Cases');
        await this.page.waitForSelector('text=Assigned Cases');
        await this.page.click(this.ClickAssignedCases);
        await this.page.waitForSelector('text=Assigned Cases');
        await this.page.click(this.ClickShowCasesFilter);
        await this.page.waitForSelector('text=Filter assigned cases');
        await this.page.waitForSelector('text=All assignees');
        await this.page.click(this.AllAssigneesRadio);
        await this.applyFilterButton.click();
    }

    async filterByAssigneeName(assigneeName: string) {
        await this.page.waitForSelector(this.AssignedCasesElement, { timeout: 20000 });
        await this.page.waitForSelector('text=Assignee name');
        await this.page.click(this.AssigneeNameRadio);
        await this.page.waitForSelector('text=Type the name and select an available match option');
        await this.page.click(this.AssigneeNameSearchBox);
        await this.page.fill(this.AssigneeNameSearchBox, assigneeName); // Add the assignee name here
        await this.applyFilterButton.click();
        await this.verifyResultsCount(5);
    }

    async verifyResultsCount(expTotCount: number) {

        await this.page.locator('tbody tr').first().waitFor();
        const totRes = await this.page.locator('tbody tr').count();
        expect(totRes).toEqual(expTotCount);
    }

    async filterByReferenceNumber(caseReferenceNumber: string) {
        await this.page.waitForSelector(this.AssignedCasesElement, { timeout: 20000 });
        await this.page.waitForSelector('text=Case reference number');
        await this.page.click(this.CaseReferenceSearchBox);
        await this.page.fill(this.CaseRefTextBox, caseReferenceNumber); // Add the case reference number here
        await this.applyFilterButton.click();
        await this.delay(3000);
        await this.verifyResultsCount(1);
    }

    async unassignedCases() {
        await this.page.waitForSelector(this.ElementManageOrg, { timeout: 20000 });
        await this.page.click(this.ClickUnassignedCases);
        await this.page.waitForSelector('text=Unassigned Cases');
        await this.page.waitForSelector('text=Show unassigned cases filter');
        await this.page.click(this.ClickShowUnassignedCasesFilter);
        await this.page.waitForSelector('text=Search for an unassigned case');
        await this.page.click('#case-reference-number');
        await this.page.fill('#case-reference-number', ''); // Add the case reference number here
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