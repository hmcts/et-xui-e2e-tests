import { BasePage } from "./basePage";
import { expect } from "@playwright/test";

const params = require('../utils/config');

export default class CaseListPage extends BasePage{
  elements = {
      caseListText:'Case list',
      caseListLink: this.page.locator('[href="/cases"]'), caseTypeDropdown: this.page.locator('#wb-case-type'),
      submissionReferenceLocator: this.page.locator('#feeGroupReference'),
      applyButton: this.page.locator('//button[@class="button workbasket-filters-apply"]'),
      nextEventDropdown: this.page.locator('#next-step'),
      submitEventButton: '//button[@class="button"]',
      createCaseLink: this.page.getByText('Create case'),
      jurisdictionDropdownLR: this.page.locator('#cc-jurisdiction'),
      casetypeDropdownLR: this.page.locator('#cc-case-type'),
      eventLR: this.page.locator('#cc-event'),
      state:this.page.locator('#wb-case-state'),
      managingOffice:this.page.locator('#managingOffice'),
      venueDropdown: this.page.locator('#listingVenue'),
      causeListText :this.page.locator( '//div[@class="alert-message"]')
  };

    async searchCaseApplicationWithSubmissionReference(option, submissionReference) {
      await this.page.reload();
      await expect(this.elements.caseListLink).toBeVisible();
      await this.elements.caseListLink.click();
      await expect(this.elements.caseTypeDropdown).toBeVisible();
      await expect(this.elements.applyButton).toBeVisible();
      await expect(this.page.locator('h1')).toContainText('Case list');
      try {
        switch (option) {
          case 'Eng/Wales - Singles':
            await this.elements.caseTypeDropdown.selectOption('Eng/Wales - Singles');
            break;
          case 'Scotland - Singles':
            await this.elements.caseTypeDropdown.selectOption('Scotland - Singles (RET)');
            break;
          default:
            throw new Error('... check you options or add new option');
        }
      } catch (error) {
        console.error('invalid option', error.message);
      }

      await this.elements.submissionReferenceLocator.fill(submissionReference);
      await this.elements.applyButton.click();
      await expect(this.page.locator('#search-result')).toContainText(submissionReference);
    }


    async processCaseFromCaseList() {
      let caseNumber = await this.page.getByLabel('go to case with Case').allTextContents();
      console.log('The value of the Case Number ' +caseNumber);
      await this.page.getByLabel('go to case with Case').click();
      await expect(this.page.getByRole('tab', { name: 'Case Details' }).locator('div')).toContainText('Case Details');
     // await this.page.waitForSelector('#mat-tab-label-0-1');
      return caseNumber;
    }

    async selectNextEvent(option) {

      await Promise.all([
        await this.page.locator(this.elements.submitEventButton).waitFor({ state: 'visible' }),
        await this.page.getByLabel('Next step').selectOption(option),
        // expect(this.page.getByRole('button', { name: 'Go', exact: true })).toBeEnabled(),
        await this.delay(3000),
        await this.page.locator(this.elements.submitEventButton).click()
      ]);
    }

    async verifyCaseDetailsPage(et1VettingFlag) {
      if (et1VettingFlag) {
        //TO DO fix this tab Ids are not consistent
        // await expect(this.page.locator('#mat-tab-label-0-0')).toContainText('Case Details');
        // await expect(this.page.locator('#mat-tab-label-0-1')).toContainText('Claimant');
        // await expect(this.page.locator('#mat-tab-label-0-2')).toContainText('Respondent');
        // await expect(this.page.locator('#mat-tab-label-0-4')).toContainText('Jurisdictions');
        // await expect(this.page.locator('#mat-tab-label-0-5')).toContainText('Referrals');
        // await expect(this.page.locator('#mat-tab-label-0-6')).toContainText('History');
        // await expect(this.page.locator('#mat-tab-label-0-7')).toContainText('Documents');
      }
      else {
        //await expect(this.page.locator('#mat-tab-label-1-2')).toContainText('ET1 Vetting');
      }
    }


  async claimantRepCreateCase(jurisdiction, caseType, postcode) {
      await this.elements.createCaseLink.click();
      await this.elements.jurisdictionDropdownLR.selectOption(jurisdiction);
      await this.elements.casetypeDropdownLR.selectOption(caseType);
      await this.elements.eventLR.selectOption('Create draft claim');
      this.page.locator(this.elements.submitEventButton).click()

      await this.enterPostCode(postcode);
      await this.submitButton();
    }

  async clickTab(tabName){
    await this.page.getByText(tabName).click();
  }

  async navigateToTab(tabName : string): Promise<void> {

    switch(tabName) {
        case "ICTab": {
            await this.page.getByRole('tab', { name: 'Initial Consideration', exact: true }).click();
            break;
        }
        case "Respondent": {
            await this.page.getByRole('tab', { name: 'Respondent', exact: true }).click();
            break;
        }
        case "Claimant": {
          await this.page.getByRole('tab', { name: 'Claimant', exact: true }).click();
          break;
        }
        case "Documents":{
            await this.page.getByRole('tab', { name: 'Documents', exact: true }).click();
            break;
        } default: {
          //statements;
          break;
      }
    }
  }

    async searchHearingReports(option, state, officeLocation ) {
        await expect(this.elements.caseListLink).toBeVisible();
        await this.elements.caseListLink.click();
        await expect(this.elements.caseTypeDropdown).toBeVisible();
        await expect(this.elements.applyButton).toBeVisible();
        await expect(this.page.locator('h1')).toContainText('Case list');
        try {
            switch (option) {
                case 'Eng/Wales - Hearings/Reports':
                    await this.elements.caseTypeDropdown.selectOption('Eng/Wales - Hearings/Reports');
                    break;
                default:
                    throw new Error('... check you options or add new option');
            }
        } catch (error) {
            console.error('invalid option', error.message);
        }

        await this.elements.state.selectOption(state);
        await this.elements.managingOffice.selectOption(officeLocation);
        await this.elements.applyButton.click();
    }

    async selectHearingReport(){
        await this.page.getByRole('link', { name: 'go to case with Case' }).click();
    }

    async generateReport(){
        await this.elements.venueDropdown.selectOption('Newcastle CFCTC');
        await this.submitButton();
    }

    async validateHearingReport(caseNumber){
        await expect(this.elements.causeListText).toContainText('has been updated with event: Generate Report');
        await expect(this.page.locator('ccd-read-complex-field-collection-table')).toContainText(caseNumber);
        await expect(this.page.locator('ccd-read-complex-field-collection-table')).toContainText('Newcastle CFCTC');
    }
}
