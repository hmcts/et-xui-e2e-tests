import { BasePage } from "./basePage";
import { expect } from "@playwright/test";
import { params } from "../config/config";
import dateUtilComponent from "../utils/DateUtilComponent";

const referralData = require('../data/ui-data/referral-content.json');

export default class CaseListPage extends BasePage{
  elements = {
      caseListText:'Case list',
      caseListLink: '[href="/cases"]',
      caseTypeDropdown: '#wb-case-type',
      submissionReferenceLocator: '#feeGroupReference',
      applyButton: '//button[@class="button workbasket-filters-apply"]',
      nextEventDropdown: this.page.locator('#next-step'),
      submitEventButton: '//button[@class="button"]',
      createCaseLink: 'Create case',
      jurisdictionDropdownLR: '#cc-jurisdiction',
      casetypeDropdownLR: '#cc-case-type',
      eventLR: '#cc-event',
      state: '#wb-case-state',
      managingOffice:'#managingOffice',
      venueDropdown: '#listingVenue',
      causeListText :this.page.locator( '//div[@class="alert-message"]'),
      refferTableEle: this.page.locator('ccd-read-text-field'),
      textAreaField:this.page.locator('ccd-read-text-area-field'),
      expandImgIcon: 'div a img',
      referralTab: '//div[contains(text(), "Referrals")]',
      depositOrderTab: '//div[contains(text(), "Deposit Order")]',
      tasksTab: '//div[contains(text(), "Tasks")]',
      caseListTab: '//a[contains(text(), "Case list")]',
      allWorkTab: '//a[contains(text(), "All work")]',
      myWorkTab: '//a[contains(text(), "My work")]',
      documentsTab: '//div[contains(text(), "Documents")]',
      hearingTab: '//div[contains(text(), "Hearing Documents")]',
      judgmentTab: '//div[contains(text(), "Judgement")]',
      claimantRepresentative: '//div[contains(text(), "Claimant Representative")]'

  };

    async navigateToCaseDetails(subRef: string, option: string) {
      await this.page.waitForLoadState('load');
      const type = option === 'EnglandWales' ? 'ET_EnglandWales' : option === 'Scotland' ? 'Scotland' : '';
      const url = `${params.TestUrlForManageCaseAAT}/case-details/EMPLOYMENT/${type}/${subRef}`;
      await this.page.goto(url);
      await this.page.waitForLoadState('load');
      await expect(this.page.getByText(subRef)).toBeVisible();

      const caseNumberText = await this.page.locator('h1', { hasText: 'Case Number:' }).textContent();
      const match = caseNumberText?.match(/Case Number:(\d+\/\d+)/);
      const caseNumber = match ? match[1] : null;
      console.log('Navigated to case number: ' + caseNumber);
      return caseNumber;
    }

    // needed for share case feature
  async searchCaseApplicationWithSubmissionReference(option, submissionReference) {
    await this.page.reload();
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.caseListLink));

    await this.webActions.clickElementByCss(this.elements.caseListLink);
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.caseTypeDropdown));

    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.applyButton));
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Case list');
    try {
      switch (option) {
        case 'Eng/Wales - Singles':
          await this.webActions.selectByLabelFromDropDown(this.elements.caseTypeDropdown, 'Eng/Wales - Singles');
          break;
        case 'Scotland - Singles':
          await this.webActions.selectByLabelFromDropDown(this.elements.caseTypeDropdown, 'Scotland - Singles (RET)');
          break;
        default:
          throw new Error('... check you options or add new option');
      }
    } catch (error) {
      console.error('invalid option', error.message);
    }
    await this.webActions.fillField(this.elements.submissionReferenceLocator, submissionReference);
    await this.webActions.clickElementByCss(this.elements.applyButton);
    await this.webActions.verifyElementContainsText(this.page.locator('#search-result'), submissionReference);
  }

    async checkAndShareCaseFromList(subRef){
      await this.page.locator('#select-'+subRef).check();
      await this.clickShareCaseButton();
      await this.page.getByRole('combobox', { name: 'Search by name or email' }).fill('et');
      await this.page.getByText('Test Factory - et.legalrep.').click();
      await this.page.getByRole('button', { name: 'Add user' }).click();
      await this.clickContinue();
      await this.page.getByRole('button', { name: 'Confirm' }).click();
      await expect(this.page.getByLabel('Your cases have been updated')).toContainText('Your cases have been updated');
      await this.page.getByRole('link', { name: 'Go back to the case list.' }).click();

    }

    async selectNextEvent(option) {

      await Promise.all([
        await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.submitEventButton)),
        await this.page.getByLabel('Next step').selectOption(option),
        await this.delay(3000),
        await this.webActions.clickElementByCss(this.elements.submitEventButton)
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
      await this.webActions.clickElementByText(this.elements.createCaseLink);
      await this.webActions.selectByLabelFromDropDown(this.elements.jurisdictionDropdownLR, jurisdiction);

      await this.webActions.selectByLabelFromDropDown(this.elements.casetypeDropdownLR, caseType);
      await this.webActions.selectByLabelFromDropDown(this.elements.eventLR, 'Create draft claim');
      await this.webActions.clickElementByCss(this.elements.submitEventButton);

      await this.enterPostCode(postcode);
      await this.clickSubmitButton();
      await this.delay(2000);
    }

  async clickTab(tabName){
    await this.webActions.clickElementByText(tabName);
  }

  async navigateToTab(tabName : string): Promise<void> {

    switch(tabName) {
        case "ICTab": {
            await this.webActions.clickElementByRole('tab', { name: 'Initial Consideration', exact: true });
            break;
        }
        case "Respondent": {
            await this.webActions.clickElementByRole('tab', { name: 'Respondent', exact: true });
            break;
        }
        // When there is an ECC, the tab name for Respondent is appended with an s as the names can't be the same
        case "Respondents": {
          await this.webActions.clickElementByRole('tab', { name: 'Respondents', exact: true });
          break;
        }
        case "Claimant": {
          await this.webActions.clickElementByRole('tab', { name: 'Claimant', exact: true });
          break;
        }
        case "Documents":{
            await this.webActions.clickElementByRole('tab', { name: 'Documents', exact: true });
            break;
        }
        case "ADR/Privileged":{
            await this.webActions.clickElementByRole('tab', { name: 'ADR/Privileged', exact: true });
            break;
        }
        case "Referrals":{
            await this.delay(2000);
            await this.webActions.clickElementByCss(this.elements.referralTab);
            break;
        }
        case "Judgments": {
            await this.webActions.clickElementByRole('tab', { name: 'Judgments', exact: true });
            break;
        }
        case "BF Actions": {
          await this.webActions.clickElementByRole('tab', { name: 'BF Actions', exact: true });
          break;
       }
       case "Case list": {
        await this.webActions.clickElementByCss(this.elements.caseListTab);
        break;
       }
       case "All work": {
        await this.webActions.clickElementByCss(this.elements.allWorkTab);
        break;
       }
       case "My work": {
        await this.webActions.clickElementByCss(this.elements.myWorkTab);
        break;
       }
       case "Deposit Order": {
          const ele = this.page.locator(this.elements.depositOrderTab).nth(1);
          await this.webActions.verifyElementToBeVisible(ele);
          await ele.click();
          break;
       }
      case "Tasks":{
            await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.tasksTab));
            await this.webActions.clickElementByCss(this.elements.tasksTab);
            break;
        }
      case "Hearing Documents":{
        await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.hearingTab));
        await this.webActions.clickElementByCss(this.elements.hearingTab);
        break;
      }
      case "Judgment": {
        const ele = this.page.locator(this.elements.judgmentTab).nth(1);
        await this.webActions.verifyElementToBeVisible(ele);
        await ele.click();
        break;
      }
      case "Claimant Representative":{
        await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.claimantRepresentative));
        await this.webActions.clickElementByCss(this.elements.claimantRepresentative);
        break;
      }
        default: {
          break;
      }
    }
  }

  async searchHearingReports(option, state, officeLocation ) {

      await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.caseListLink));
      await this.webActions.clickElementByCss(this.elements.caseListLink);

        await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.caseTypeDropdown));
        await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.applyButton));
        await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Case list');

        try {
          switch (option) {
              case 'Eng/Wales - Hearings/Reports':
                await this.webActions.selectByLabelFromDropDown(this.elements.caseTypeDropdown, 'Eng/Wales - Hearings/Reports');
                break;
              default:
                throw new Error('... check you options or add new option');
          }
        } catch (error) {
            console.error('invalid option', error.message);
        }
        await this.webActions.selectByLabelFromDropDown(this.elements.state, state);
        await this.webActions.selectByLabelFromDropDown(this.elements.managingOffice, officeLocation);
        await this.webActions.clickElementByCss(this.elements.applyButton);
  }

    async selectHearingReport(){
        await this.webActions.clickElementByRole('link', { name: 'go to case with Case' });
    }

    async generateReport(){
        await this.webActions.selectByLabelFromDropDown(this.elements.venueDropdown, 'Newcastle CFCTC');
        await this.clickSubmitButton();
    }

    async validateHearingReport(caseNumber){
        await this.webActions.verifyElementContainsText(this.elements.causeListText, 'has been updated with event: Generate Report');
        await this.webActions.verifyElementContainsText(this.page.locator('ccd-read-complex-field-collection-table'), 'Newcastle CFCTC');
    }

    async verifyAndClickLinkInTab(referralText: string){

        const elements = await this.page.locator('markdown p a').allTextContents();
        expect(elements).toContain(referralText);
        await this.webActions.clickElementByText(referralText);
    }

    async verifyReferralDetails(){

      let actStatus =  await this.elements.refferTableEle.nth(7).textContent();
      let actSubj =  await this.elements.refferTableEle.nth(1).textContent();
      let actReferredTo = await this.elements.refferTableEle.nth(3).textContent();
      let actReferredDetails = await this.elements.textAreaField.textContent();


      expect(actStatus).toEqual(referralData.awaitingStatus);
      expect(actSubj).toEqual(referralData.subject);
      expect(actReferredTo).toEqual(referralData.expReferredTo);
      expect(actReferredDetails).toEqual(referralData.details);
    }

    async verifyReplyReferralDetails(){

      let actStatus =  await this.elements.refferTableEle.nth(7).textContent();
      let actSubj =  await this.elements.refferTableEle.nth(1).textContent();
      let actReferredTo = await this.elements.refferTableEle.nth(3).textContent();
      let actReferredDetails = await this.elements.textAreaField.first().textContent();


      expect(actStatus).toEqual(referralData.issuedStatus);
      expect(actSubj).toEqual(referralData.subject);
      expect(actReferredTo).toEqual(referralData.expReferredTo);
      expect(actReferredDetails).toEqual(referralData.details);

      await this.page.locator(this.elements.expandImgIcon).nth(1).click();
    }

    async verifyReplyDetailsOnTab(fieldValue: string) {

      await expect(this.page
          .locator(`//span[normalize-space()="${fieldValue}"]`).first()).toBeVisible();
    }

    async verifyCloseReferralDetails(){

      let actStatus =  await this.elements.refferTableEle.nth(7).textContent();
      let actCloseReason =  await this.page.locator('ccd-read-text-area-field').nth(1).textContent();


      expect(actStatus).toEqual(referralData.closedStatus);
      expect(actCloseReason).toEqual(referralData.closeRefNotes);
    }

    async verifyJudgementDetailsOnTab(fieldValue: string) {

      await expect(this.page
          .locator(`//span[normalize-space()="${fieldValue}"]`).first()).toBeVisible();
    }

    async verifyAcasCertificateDetailsOnTab(documentValue: string, docTypeValue: string) {
      await this.delay(2000)
      await expect(this.page
        .locator(`//button[normalize-space()="${documentValue}"]`)).toBeVisible();

        await expect(this.page
          .locator(`//span[normalize-space()="${docTypeValue}"]`).first()).toBeVisible();
    }

    async verifyCaseDetailsOnTab(fieldLabel: string, fieldValue: string) {
      await this.webActions.verifyElementToBeVisible(this.page.locator(`//*[normalize-space()="${fieldLabel}"]/../..//td[normalize-space()="${fieldValue}"]`));
    }

    async verifyBFActionsTab(fieldLabel: string, fieldValue: string) {

      await expect(this.page.getByText(dateUtilComponent.addDaysAndMonths(29))).toBeVisible();
      await this.webActions.clickElementByCss(this.elements.expandImgIcon);
      await this.webActions.verifyElementToBeVisible(this.page.locator(`//*[normalize-space()="${fieldLabel}"]/../..//td[normalize-space()="${fieldValue}"]`));
    }

    async verifyDepositOrderDetailsOnTab(fieldLabel: string, fieldValue: string) {
      await this.webActions.verifyElementToBeVisible(this.page.locator(`//*[normalize-space()="${fieldLabel}"]/../../td[normalize-space()="${fieldValue}"]`));
    }

    async verifyET3DetailsOnRespondentTab() {

      await this.webActions.clickElementByCss(this.elements.expandImgIcon);
      const testDataMap = new Map<string, string>([
        ['Is there an ET3 response?', 'Yes'],
        ['Select the respondent you are processing', 'Mrs Test Auto'],
        ['Did we receive the ET3 response in time?', 'Yes'],
        ["Do we have the respondent's name?", 'Yes'],
        ["Does the respondent's name match?", 'Yes'],
        ["Do we have the respondent's address?", 'Yes'],
        ["Does the respondent's address match?", 'Yes'],
        ['Is the case listed for hearing?', 'No'],
        ['Is this location correct?', 'Yes'],
        ['Does the respondent wish to contest any part of the claim?', 'No']
      ]);

      // @ts-ignore
      for (let [key, value] of testDataMap) {
        await this.webActions.verifyElementToBeVisible(this.page.locator(`//*[normalize-space()="${key}"]/../../td[normalize-space()="${value}"]`));
      }
    }
}
