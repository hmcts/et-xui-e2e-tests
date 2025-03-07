import axeTest from "../helpers/accessibilityHelper";
import { BasePage } from "./basePage";
import { expect } from "@playwright/test";
const Continue = 'Continue';


//const et1CaseVetting = 'ET1 case vetting';
export default class Et1VettingPages extends BasePage {
    async processET1CaseVettingPages(accessibilityEnabled?: boolean) {
      if(accessibilityEnabled) axeTest(this.page);
      await this.processBeforeYourStartPage();
      await this.processMinimumRequiredInformationPage();
      await this.processACASCertificatePage();
      await this.processPossibleSubstantiveDefectsPage();
      if(accessibilityEnabled) axeTest(this.page);
      await this.processJurisdictionCodePage();
      await this.processTrackAllocationPage();
      if(accessibilityEnabled) axeTest(this.page);
      await this.processTribunalLocationPage();
      await this.processListingDetailsPage();
      await this.processFurtherQuestionsPage();
      if(accessibilityEnabled) axeTest(this.page);
      await this.processPossibleReferralToACaseOfficerPage();
      await this.processPossibleReferralToARegionalEmploymentJudgeOrPresidentPage();
      await this.processOtherFactorsPage();
      await this.processFinalNotesPage();
      if(accessibilityEnabled) axeTest(this.page);
      await this.processCheckYourAnswersPage();
      await this.processET1CaseVettingPage();
    }


    async processBeforeYourStartPage() {
      await this.webActions.waitForElementToBeVisible('text=ET1 case vetting'),
      await expect(this.page.locator('ccd-case-edit-page')).toContainText('Before you start');
      await this.clickContinue();
    }

    async processMinimumRequiredInformationPage() {
      await expect(this.page.locator('ccd-case-edit-page')).toContainText('Minimum required information');
      await this.page.locator('#caseEditForm').getByRole('group').getByText('Yes').click();
      await this.clickContinue();
    }

    async processACASCertificatePage() {
      await this.page.locator('#et1VettingAcasCertIsYesOrNo1_Yes').click();
      await this.clickContinue();
    }

    async processPossibleSubstantiveDefectsPage() {
      await expect(this.page.locator('#substantiveDefectsList')).toContainText('Possible substantive defects (Optional)');
      await expect(this.page.locator('#caseEditForm')).toContainText('General notes (Optional)');
      await this.clickContinue();
    }

    async processJurisdictionCodePage() {
      await expect(this.page.locator('#areTheseCodesCorrect')).toContainText('Are these codes correct?');
      await this.page.getByLabel('Yes').check();
      await this.clickContinue();
    }

    async processTrackAllocationPage() {
      await expect(this.page.locator('tbody')).toContainText('Track allocation');
      await this.page.getByLabel('Yes').check();
      await this.clickContinue();
    }

    async processTribunalLocationPage() {
      await expect(this.page.locator('h3')).toContainText('Tribunal location');
      await this.page.getByLabel('Yes').check();
      await this.clickContinue();
    }

    async processListingDetailsPage() {
      await expect(this.page.locator('#et1SuggestHearingVenue')).toContainText('Do you want to suggest a hearing venue?');
      await this.page.getByLabel('No', { exact: true }).check();
      await this.clickContinue();
    }

    async processFurtherQuestionsPage() {
      await expect(this.page.locator('ccd-case-edit-page')).toContainText('Further questions');
      await this.page.getByRole('group', { name: 'Is the respondent a government agency or a major employer?' }).getByLabel('No').check();
      await this.page.getByRole('group', { name: 'Are reasonable adjustments required?' }).getByLabel('No').check();
      await this.page.getByRole('group', { name: 'Can the claimant attend a video hearing?' }).getByLabel('Yes').check();
      await this.clickContinue();
    }

    async processPossibleReferralToACaseOfficerPage() {
      await expect(this.page.locator('#referralToJudgeOrLOList')).toContainText('Possible referral to a judge or legal officer (Optional)');
      await this.clickContinue();
    }

    async processPossibleReferralToARegionalEmploymentJudgeOrPresidentPage() {
      await expect(this.page.locator('#referralToREJOrVPList')).toContainText('Possible referral to Regional Employment Judge or Vice-President (Optional)');
      await this.clickContinue();
    }

    async processOtherFactorsPage() {
      await expect(this.page.locator('ccd-case-edit-page')).toContainText('Other factors');
      await this.clickContinue();
    }

    async processFinalNotesPage() {
      await expect(this.page.locator('ccd-case-edit-page')).toContainText('Final notes');
      await this.clickContinue();
    }


  async processCheckYourAnswersPage() {

    await expect(this.page.locator('ccd-case-edit-submit')).toContainText('Check your answers');
    await expect(this.page.locator('ccd-case-edit-submit')).toContainText('Check the information below carefully.');
    await this.submitButton();
    }

  async processET1CaseVettingPage() {
    await expect(this.page.locator('#confirmation-body')).toContainText('You must accept or reject the case or refer the case.');
    await this.closeAndReturn();
  }

}
