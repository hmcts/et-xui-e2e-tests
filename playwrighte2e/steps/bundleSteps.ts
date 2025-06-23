import { BaseStep } from "./base";
import { params } from "../utils/config";
import {expect, Page} from '@playwright/test';

export class BundleSteps extends BaseStep {

    constructor(page: Page) {
        super(page);
    }


    async submitHearingPreparationDocument (page, region, subRef, caseNumber, firstName, lastName) {

        await this.caseListPage.selectNextEvent('List Hearing');
        await this.listHearingPage.listCase(region, 1,false);
        await page.click('text=Sign out');

        await this.loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
        const searchReference = region === "England" ? 'Eng/Wales - Singles' : `${region} - Singles`;
        await this.legalRepPage.processNOCForClaimant(searchReference, subRef, caseNumber, firstName, lastName);
        await this.caseListPage.searchCaseApplicationWithSubmissionReference(searchReference, subRef);
        await this.caseListPage.processCaseFromCaseList();

        await this.caseListPage.selectNextEvent('Upload documents for hearing');
        await this.legalRepPage.submitDocumentForHearingRespondent('Yes', 'Both Parties', 'Witness statement only');
        await this.legalRepPage.verifyHearingDocumentTabLegalRep();
    };

}
