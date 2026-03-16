import { BasePage } from './basePage.ts';
import { expect } from "@playwright/test";
import dateUtilComponent from '../data-utils/DateUtilComponent';
import icPageData from '../resources/payload/ic-page-content.json';
import { nth } from 'lodash';

export default class InitialConsiderationPage extends BasePage {
  elements = {
    hearingDetails: '#etInitialConsiderationHearingLabel td:nth-child(2)',
    jurisdictionCodeInvalidYes: '#etICJuridictionCodesInvalid_No',
    claimCamProceedYes: '#etICCanProceed_Yes',
    proceedToHearingListed: '#etICHearingListedAnswers_etICHearingListed-Proceed to the hearing already listed',
    preliminaryHearingOptions: '#etICHearingNotListedListForPrelimHearingUpdated_prelimHearingLengthNumTypeV2',
    alreadyDecided: '#etICHearingListedAnswers_etICIsFinalHearingWithJudgeOrMembersJsaReason-Already decided',
    respondentNameET1: "#etInitialConsiderationRespondentLabel td:nth-child(2)",
    respondentNameET3: "#etInitialConsiderationRespondentLabel td:nth-child(3)",
    claimantRespondentHearingPanel: "#etIcPartiesHearingPanelPreferenceLabel td",
    claimantRespondentHearingFormat: '#etIcPartiesHearingFormatLabel td',
    et1VettingIssues: '#icEt1VettingIssuesDetailLabel',
  };

  async validateET1Links() {
    await expect(this.page.getByRole('link', { name: 'ET1', exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'ET1 Vetting', exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'ET3', exact: true })).toBeVisible();
  }

  async validateET3ProcessingLink() {
    await expect(this.page.getByRole('link', { name: 'ET3 Processing', exact: true })).toBeVisible();
  }

  async validateReferralLink() {
    await expect(this.page.getByRole('link', { name: 'Referrals', exact: true })).toBeVisible();
  }

  async validateLinksNotVisible() {
    await expect(this.page.getByRole('link', { name: 'ET1 Vetting', exact: true })).not.toBeVisible();
  }

  async validateHearingDetails() {
    const hearingItems = [
      dateUtilComponent.formatDateWithLeadingZeros(dateUtilComponent.addWeekdays(new Date(), 21)),
      'Costs Hearing',
      '1 Hour',
      'Hybrid',
      'Sit Alone',
      'Leeds ET',
    ];
    await this.page.waitForSelector(this.elements.hearingDetails);
    const locators = this.page.locator(this.elements.hearingDetails).all();
    const names: string[] = [];
    for (const locator of await locators) {
      names.push(await locator.innerText());
    }
    expect(names).toEqual(hearingItems);
  }

  async completeSubmissionWithHearing() {
    await this.proceedToSecondPageIC();
    await this.page.getByRole('checkbox', { name: 'Proceed to the hearing' }).click();
    await this.page.getByRole('radio', { name: 'JSA' }).click();
    await this.page.getByRole('checkbox', { name: 'Already decided' }).click();
    await this.clickContinue();
    await this.clickSubmitButton();
    await expect(this.page.getByText(icPageData.icConfirmationText)).toBeVisible();
    await this.clickCloseAndReturn();
  }

  async proceedToSecondPageIC() {
    await this.webActions.clickElementByCss(this.elements.jurisdictionCodeInvalidYes);
    await this.webActions.clickElementByCss(this.elements.claimCamProceedYes);
    await this.clickContinue();
    await this.delay(2000);
  }

  async preliminaryHearingDetails() {
    await this.proceedToSecondPageIC();
    await this.webActions.clickElementByRole('checkbox',{ name: 'List for preliminary hearing' })
    await this.webActions.clickElementByRole('checkbox', { name: 'Video' })
    await this.webActions.clickElementByRole('checkbox', { name: 'Preliminary issue' })
    await this.webActions.fillFieldByRole('textbox', { name: 'Give details of hearing notice' }, 'Preliminary hearing details');
    await this.webActions.fillFieldByRole('textbox', { name: 'Length of hearing' }, '1');
    await this.webActions.selectByLabelFromDropDown(this.elements.preliminaryHearingOptions, 'Hours');
    await this.webActions.clickElementByRole('radio', { name: 'No' });
    await this.clickContinue();
    await this.clickSubmitButton();
    await expect(this.page.getByText(icPageData.icConfirmationText)).toBeVisible();
    await this.clickCloseAndReturn();
  }

  async caseManagementHearingOptions() {
    await this.proceedToSecondPageIC();
    await this.webActions.clickElementByRole('checkbox',{ name: 'Postpone hearing' })
    await this.webActions.clickElementByRole('radio',{ name: 'With members' })
    await this.webActions.verifyElementToBeVisible(this.page.locator('#etICHearingListedAnswers_etICIsHearingWithMembers'))
    await this.webActions.clickElementByRole('radio',{ name: 'JSA' })
    await this.webActions.verifyElementToBeVisible(this.page.getByRole('radio', { name: 'Case management only' }));
    await this.webActions.verifyElementToBeVisible(this.page.getByRole('radio', { name: 'Already decided' }));
    await this.webActions.verifyElementToBeVisible(this.page.getByRole('radio', { name: 'Other' }));
    await this.webActions.clickElementByRole('radio', { name: 'Case management only' });
    await this.clickContinue();
    await this.clickSubmitButton();
    await expect(this.page.getByText(icPageData.icConfirmationText)).toBeVisible();
    await this.clickCloseAndReturn();
  }

  async finalHearingOptions() {
    await this.proceedToSecondPageIC();
    await this.webActions.clickElementByRole('checkbox',{ name: 'Postpone hearing' })
    await this.webActions.clickElementByRole('radio',{ name: 'With members' })
    await this.webActions.verifyElementToBeVisible(this.page.getByRole('checkbox', { name: 'Already decided' }));
    await this.webActions.verifyElementToBeVisible(
      this.page.getByRole('checkbox', {
        name: "Members' experience is likely to add significant value to the adjudication process",
      }),
    );
    await this.webActions.verifyElementToBeVisible(this.page.getByRole('checkbox', { name: 'No views expressed by parties'}));
    await this.webActions.verifyElementToBeVisible(this.page.locator('#etICHearingListedAnswers_etICIsFinalHearingWithJudgeOrMembersReason').getByRole('checkbox', { name: 'Other' }));
    await this.webActions.clickElementByRole('checkbox', { name: 'Already decided' });
    await this.clickContinue();
    await this.clickSubmitButton();
    await expect(this.page.getByText(icPageData.icConfirmationText)).toBeVisible();
    await this.clickCloseAndReturn();
  }

  async validateEnhancedAllPartyDetails() {
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.respondentNameET1));
    await this.webActions.verifyElementContainsText(this.page.locator(this.elements.respondentNameET1), 'Mrs Test Auto');
    await this.webActions.verifyElementContainsText(this.page.locator(this.elements.respondentNameET3), 'Test Auto');
    await this.webActions.verifyElementContainsText(this.page.locator(this.elements.claimantRespondentHearingPanel).nth(1), 'Panel')
    await this.webActions.verifyElementContainsText(this.page.locator(this.elements.claimantRespondentHearingPanel).nth(2),'Test Panel Preference Reason');
    await this.webActions.verifyElementContainsText(this.page.locator(this.elements.claimantRespondentHearingPanel).nth(4), 'Judge');
    await this.webActions.verifyElementContainsText(this.page.locator(this.elements.claimantRespondentHearingPanel).nth(5),'Test Panel reasons');
    await this.webActions.verifyElementContainsText(this.page.locator(this.elements.claimantRespondentHearingFormat).nth(1), 'Video');
    await this.webActions.verifyElementContainsText(this.page.locator(this.elements.claimantRespondentHearingFormat).nth(3), 'Video hearings');
  }

  async validateET1VettingIssues() {
    await this.isVettingIssueDisplayed('Details of Substantive Defects')
    await this.isVettingIssueDisplayed('Details of Track Allocation Issue');
  }

  async isVettingIssueDisplayed(fieldValue:string){
    await expect(this.page.locator(`//summary/span[text()="${fieldValue}"]`).first()).toBeVisible();
  }

  async validateTribunalCaseFileLink() {
    await this.webActions.verifyElementToBeVisible(this.page.getByRole('link', { name: 'Tribunal case file', exact: true }));
  }

  async waitForTribunalCaseFileLink() {
    await this.delay(20000)
  }
}