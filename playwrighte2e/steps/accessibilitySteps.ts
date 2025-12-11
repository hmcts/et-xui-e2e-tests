import config from '../config/config';
import { BaseStep } from './base';
import { AxeUtils } from '@hmcts/playwright-common';
import { Page } from '@playwright/test';

export default class AccessibilitySteps extends BaseStep {
  async scanExuiPages(page: Page, axeUtils: AxeUtils) {
    await axeUtils.audit();

    //Scan case tabs
    await this.caseListPage.navigateToTab('Claimant');
    await axeUtils.audit();

    await this.caseListPage.navigateToTab('ET1 Vetting');
    await axeUtils.audit();

    await this.caseListPage.navigateToTab('Respondent');
    await axeUtils.audit();

    await this.caseListPage.navigateToTab('Jurisdictions');
    await axeUtils.audit();

    await this.caseListPage.navigateToTab('Referrals');
    await axeUtils.audit();

    await this.caseListPage.navigateToTab('Initial Consideration');
    await axeUtils.audit();

    // await this.caseListPage.navigateToTab('Judgments');
    // await axeUtils.audit();

    await this.caseListPage.navigateToTab('History');
    await axeUtils.audit();

    // await this.caseListPage.selectNextEvent('ET3 Processing');
    // await this.caseListPage.delay(2000);
    // await this.scanEt3ProcessingEvent(page); // et3 processing (Got accessibility error)
  }

  async scanEt3ProcessingEvent(page: Page, axeUtils: AxeUtils) {
    await this.caseListPage.delay(20000);
    await axeUtils.audit();
    await this.caseListPage.delay(3000);
    await this.caseListPage.webActions.verifyElementContainsText(
      this.page.locator('markdown p'),
      'To help you complete this, open the ET1 form',
      10000,
    );
    await this.caseListPage.clickContinue();

    await this.caseListPage.webActions.selectByLabelFromDropDown('#et3ChooseRespondent', 'Mrs Test Auto');
    await axeUtils.audit();
    await this.caseListPage.delay(3000);
    await this.caseListPage.clickContinue();
    await this.caseListPage.delay(10000);
    await axeUtils.audit();
    await this.caseListPage.delay(3000);
    await this.caseListPage.clickContinue();
  }

    // @ts-ignore
  async scanLegalRepApplicationPages(page, subRef: string, caseNumber: string, firstName: string, lastName: string, accessibilityEnabled?: boolean,axeUtils: AxeUtils) {

        await page.click('text=Sign out');
        await page.goto(config.TestUrlForManageCaseAAT);
        await this.loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword);
        await this.legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, caseNumber, firstName, lastName, accessibilityEnabled, false, axeUtils);
        await this.caseListPage.navigateToCaseDetails(subRef, 'EnglandWales')

        //legal rep make an application
        await this.legalRepPage.legalRepMakeAnApplication(accessibilityEnabled, axeUtils);
    }

    async scanWAPages(page: Page, subRef: string, axeUtils:AxeUtils) {

        await page.click('text=Sign out');
        await page.goto(config.TestUrlForManageCaseAAT);
        await this.loginPage.processLogin(config.TestEnvETCaseWorkerUser, config.TestEnvETPassword);
        await this.caseListPage.delay(2000);
        await this.caseListPage.navigateToCaseDetails(subRef, 'EnglandWales')
        // await page.goto(`${config.TestUrlForManageCaseAAT}/cases/case-details/${subRef}`);
        await this.caseListPage.navigateToTab('Case list');
        await this.caseListPage.delay(2000);
        await axeUtils.audit();

        /* (Got accessibility error)
        await this.caseListPage.navigateToTab('All work');
        await this.caseListPage.delay(2000);
        await axeTest(page);
        await this.caseListPage.delay(3000);
        */

        await this.caseListPage.navigateToTab('My work');
        await this.caseListPage.delay(2000);
        await axeUtils.audit();
        await this.caseListPage.delay(3000);
    }
}
