import { test } from '../fixtures/common.fixture';


let subRef, subRef2;
let caseNumber1, caseNumber2;


    test.describe('Link-2-Scottish-Cases - Multiple Reasons - Scotland', async () => {

        test.beforeEach(async ({ page, createCaseStep, caseListPage }) => {
            // Create, vet & accept first case
            ({ subRef, caseNumber: caseNumber1 } = await createCaseStep.setupCaseCreatedViaApi(page, "Scotland", "ET_Scotland"));
            await caseListPage.signoutButton();

            // Create, vet & accept second case
            ({ subRef: subRef2, caseNumber: caseNumber2 } = await createCaseStep.setupCaseCreatedViaApi(page, "Scotland", "ET_Scotland"));
        });

        test('Link-2-Cases - Multiple Reasons - Scotland', {tag: '@demo'}, async ({ caseListPage, caseLinkPage }) => {
    
            // link cases
            await caseListPage.selectNextEvent('Link cases');
            await caseLinkPage.checksCaseLinkStartingPage();
            await caseLinkPage.enterCaseLinkReferenceWithoutHearing(subRef);
        });
    });

    test.describe('Link-2-Cases - Multiple Reasons - England & Wales', async () => {

        test.beforeEach(async ({ page, createCaseStep, caseListPage }) => {
            // Create, vet & accept first case
            ({ subRef, caseNumber: caseNumber1 } = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));
            await caseListPage.signoutButton();

            // Create, vet & accept second case
            ({ subRef: subRef2, caseNumber: caseNumber2 } = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));
        });

        test('Link-2-Cases - Multiple Reasons - England', {tag: '@demo'}, async ({ caseListPage, caseLinkPage }) => {
        
            // link cases
            await caseListPage.selectNextEvent('Link cases');
            await caseLinkPage.checksCaseLinkStartingPage();
            await caseLinkPage.enterCaseLinkReferenceWithoutHearing(subRef);
        });
    });