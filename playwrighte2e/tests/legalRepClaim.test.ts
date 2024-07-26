import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import CaseListPage from '../pages/caseListPage';
import Et1CreateDraftClaim from '../pages/et1CreateDraftClaim';
import PostcodeHelper from '../helper/postcode';
import {params} from '../utils/config';



const postcode = 'LS1 2AJ';
const addressOption = 'Office 1 9 East Parade, Leeds';

test('Claimant Representative creates a claim (England and Wales - Singles) and submit', async ({ page }) => {


    let loginPage = new LoginPage(page);
    let caseListPage= new CaseListPage(page);
    let et1CreateDraftClaim= new Et1CreateDraftClaim(page);


    await page.goto(params.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
    await caseListPage.claimantRepCreateCase('Employment','Eng/Wales - Singles', postcode);

    await et1CreateDraftClaim.et1Section1();
    await et1CreateDraftClaim.et1Section2();
    await et1CreateDraftClaim.et1Section3();
    let submissionReference = await et1CreateDraftClaim.et1SubmitClaim();
    console.log('The value of the Case Number ' + submissionReference);

});
