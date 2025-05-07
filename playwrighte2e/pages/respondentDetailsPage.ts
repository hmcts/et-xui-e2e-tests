import { BasePage } from "./basePage";

const respPageData = require('../data/ui-data/respondent-page-content.json');

export default class RespondentDetailsPage extends BasePage {

  elements = {
    respondentName: '#respondentCollection_0_respondent_name',
    judgePanelEle: '#respondentCollection_0_respondent_hearing_panel_preference-Judge',
    panelPreferenceReason: '#respondentCollection_0_respondent_hearing_panel_preference_reason',
    orgRespondentType: '#respondentCollection_0_respondentType-Organisation',
    orgNameEle: '#respondentCollection_0_respondentOrganisation',
    expandImgIcon: 'div a img'
  }

  async processRespondentDetails() {
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.respondentName));
    await this.webActions.fillField(this.elements.respondentName, 'Mr Mark Gill');
    await this.submitButton();
  }

  async processRespondentDetailsWithET3Acceptance(){
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.respondentName));
    await this.webActions.checkElementById('#respondentCollection_0_respondentType-Individual');
    await this.webActions.verifyElementToBeVisible(this.page.locator('#respondentCollection_0_respondentFirstName'));
    await this.webActions.fillField('#respondentCollection_0_respondentFirstName', 'Test');
    await this.webActions.fillField('#respondentCollection_0_respondentLastName', 'Respondent');
    await this.webActions.selectByOptionFromDropDown('#respondentCollection_0_response_status', '1: Accepted');
    await this.submitButton();
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
    await this.submitButton();
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
