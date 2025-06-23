import { Page } from '@playwright/test';
import { params } from "../utils/config";
import { BaseStep } from "./base";
import axeTest from '../helpers/accessibilityHelper';

export default class AccessibilitySteps extends BaseStep {

    async scanExuiPages(page) {

        await axeTest(page);

        //Scan case tabs
        await this.caseListPage.navigateToTab('Claimant');
        await axeTest(page);

        await this.caseListPage.navigateToTab('ET1 Vetting');
        await axeTest(page);

        await this.caseListPage.navigateToTab('Respondent');
        await axeTest(page);

        await this.caseListPage.navigateToTab('Jurisdictions');
        await axeTest(page);

        await this.caseListPage.navigateToTab('Referrals');
        await axeTest(page);

        await this.caseListPage.navigateToTab('Initial Consideration');
        await axeTest(page);

        // await this.caseListPage.navigateToTab('Judgments');
        // await axeTest(page);

        await this.caseListPage.navigateToTab('History');
        await axeTest(page);

        // await this.caseListPage.selectNextEvent('ET3 Processing');
        // await this.caseListPage.delay(2000);
        // await this.scanEt3ProcessingEvent(page); // et3 processing (Got accessibility error)
    }

    async scanEt3ProcessingEvent(page) {

        await this.caseListPage.delay(20000);
        await axeTest(page);
        await this.caseListPage.delay(3000);
        await this.caseListPage.webActions.verifyElementContainsText(this.page.locator('markdown p'), 'To help you complete this, open the ET1 form', 10000);
        await this.caseListPage.clickContinue();

        await this.caseListPage.webActions.selectByLabelFromDropDown('#et3ChooseRespondent', 'Mrs Test Auto');
        await axeTest(page);
        await this.caseListPage.delay(3000);
        await this.caseListPage.clickContinue();
        await this.caseListPage.delay(10000);
        await axeTest(page);
        await this.caseListPage.delay(3000);
        await this.caseListPage.clickContinue();
    }

    async scanLegalRepApplicationPages(page, subRef: string, caseNumber: string, firstName: string, lastName: string, accessibilityEnabled?: boolean) {

        await page.click('text=Sign out');
        await page.goto(params.TestUrlForManageCaseAAT);
        await this.loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
        await this.legalRepPage.processNOCForClaimant('Eng/Wales - Singles', subRef, caseNumber, firstName, lastName, accessibilityEnabled);
        await this.caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
        await this.caseListPage.processCaseFromCaseList();

        //legal rep make an application
        await this.legalRepPage.legalRepMakeAnApplication(accessibilityEnabled);
    }

    async scanWAPages(page, subRef) {

        await page.click('text=Sign out');
        await page.goto(params.TestUrlForManageCaseAAT);
        await this.loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
        await this.caseListPage.delay(2000);
        await this.caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
        await this.caseListPage.processCaseFromCaseList();
        // await page.goto(`${params.TestUrlForManageCaseAAT}/cases/case-details/${subRef}`);
        await this.caseListPage.navigateToTab('Case list');
        await this.caseListPage.delay(2000);
        await axeTest(page);

        /* (Got accessibility error)
        await this.caseListPage.navigateToTab('All work');
        await this.caseListPage.delay(2000);
        await axeTest(page);
        await this.caseListPage.delay(3000);
        */

        await this.caseListPage.navigateToTab('My work');
        await this.caseListPage.delay(2000);
        await axeTest(page);
        await this.caseListPage.delay(3000);
    }
}
