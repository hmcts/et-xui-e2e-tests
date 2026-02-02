import { BasePage } from "../basePage.ts";
import respPageData from '../../data/ui-data/respondent-page-content.json';
import DateUtilComponent from '../../data-utils/DateUtilComponent.ts';
import { expect, Locator, Page } from '@playwright/test';
import { CommonActionsHelper } from '../helpers/CommonActionsHelper.ts';

export default class RespondentDetailsPage extends BasePage {

  private readonly commonActionsHelper: CommonActionsHelper;
  private readonly respondentReceivedDateField: Locator;

  constructor(page: Page, commonActionsHelper: CommonActionsHelper) {
    super(page);
    this.commonActionsHelper = commonActionsHelper;
    this.respondentReceivedDateField = this.page.locator('#responseReceivedDate');
  }

  elements = {
    respondentName: '#respondentCollection_0_respondent_name',
    judgePanelEle: '#respondentCollection_0_respondent_hearing_panel_preference-Judge',
    panelPreferenceReason: '#respondentCollection_0_respondent_hearing_panel_preference_reason',
    orgRespondentType: '#respondentCollection_0_respondentType-Organisation',
    orgNameEle: '#respondentCollection_0_respondentOrganisation',
    expandImgIcon: 'div a img'
  }

  async enterResponseReceivedDate(position: number = 1) {
    const [year, month, day] = DateUtilComponent.getCurrentDateSliced();

    const dateGroups = await this.respondentReceivedDateField.all();
    const dateGroup = dateGroups[position - 1];

    await expect(dateGroup).toBeVisible();

    await dateGroup.locator('input[name="responseReceivedDate-day"]').fill(day);
    await dateGroup.locator('input[name="responseReceivedDate-month"]').fill(month);
    await dateGroup.locator('input[name="responseReceivedDate-year"]').fill(year);
  }

  async enterAddressForRespondentFromET3(position: number = 1 ){
    const postCodeLookup = this.page.locator(`#respondentCollection_${position-1}_responseRespondentAddress_responseRespondentAddress_postcodeInput`)
    const selectAddress = this.page.locator(`#respondentCollection_${position-1}_responseRespondentAddress_responseRespondentAddress_addressList`);

    await expect(postCodeLookup).toBeVisible();
    await this.commonActionsHelper.enterUkAddressWithPostcode(postCodeLookup, selectAddress);
  }

  async processRespondentDetails() {
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.respondentName));
    await this.webActions.fillField(this.elements.respondentName, 'Mr Mark Gill');
    await this.clickSubmitButton();
  }

  async processRespondentDetailsET3(et3accepted:boolean){
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.respondentName));
    await this.webActions.checkElementById(`#respondentCollection_0_responseReceived_Yes`);
    await this.enterResponseReceivedDate();
    await this.webActions.checkElementById('#respondentCollection_0_respondentType-Individual');
    await this.webActions.verifyElementToBeVisible(this.page.locator('#respondentCollection_0_respondentFirstName'));
    await this.webActions.fillField('#respondentCollection_0_respondentFirstName', 'Test');
    await this.webActions.fillField('#respondentCollection_0_respondentLastName', 'Respondent');
    await this.enterAddressForRespondentFromET3();
    if(et3accepted){
      await this.webActions.selectByOptionFromDropDown('#respondentCollection_0_response_status', '1: Accepted');
    } else {
      await this.webActions.selectByOptionFromDropDown('#respondentCollection_0_response_status', '4: Rejected');
    }
    await this.webActions.fillField(`#respondentCollection_0_respondent_email`, 'email@email.com')
    await this.webActions.selectByOptionFromDropDown(`#respondentCollection_0_respondent_contact_preference`, 'Email');
    await this.clickSubmitButton();
  }

  async processPanelPreference() {
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.judgePanelEle));
    await this.webActions.checkElementById(this.elements.judgePanelEle);
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.panelPreferenceReason));
    await this.webActions.fillField(this.elements.panelPreferenceReason, respPageData.panelReason);
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.orgRespondentType));
    await this.webActions.checkElementById(this.elements.orgRespondentType);
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.orgNameEle));
    await this.webActions.fillField(this.elements.orgNameEle, respPageData.orgName);
    await this.clickSubmitButton();
  }

  async verifyRespondentDetails() {
    await this.page.waitForSelector(this.elements.expandImgIcon);
    await this.webActions.clickElementByCss(this.elements.expandImgIcon);

    await this.verifyRespondentDetailsOnTab("Type of respondent", respPageData.orgRespType);
    await this.verifyRespondentDetailsOnTab("Organisation or business name", "Test Organisation Name");
    await this.verifyRespondentDetailsOnTab("Hearing panel preference", respPageData.preferenceNameisJudge);
  }

  async verifyRespondentDetailsOnTab(fieldLabel: string, fieldValue: string) {
    await this.webActions.verifyElementToBeVisible(this.page.locator(`//*[normalize-space()="${fieldLabel}"]/../..//td[normalize-space()="${fieldValue}"]`));
  }
}
