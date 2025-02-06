import { expect, test } from "@playwright/test";
import CaseListPage from "../pages/caseListPage";
import CreateCaseFlag from "../pages/createCaseFlag";
import ManageCaseFlag from "../pages/manageCaseFlag";
import createAndAcceptCase from "../pages/createAndAcceptCase";



test.describe('Case Flag', () => {
    test.beforeEach(async ({ page }) => {
        let createCase= new createAndAcceptCase();
        await createCase.setupCase(page, "England", "ET_EnglandWales");
    });

    test('Create and remove case Flag for E/W-Single case',async ({ page }) => {
        let caseListPage = new CaseListPage(page);
        let createCaseFlag = new CreateCaseFlag(page);
        let manageCaseFlag = new ManageCaseFlag(page);

        //Create case flag
        await caseListPage.selectNextEvent('Create a case flag');
        await createCaseFlag.createCaseFlag();

        //remove case flag
        await caseListPage.selectNextEvent('Manage case flags');
        await manageCaseFlag.manageCaseFlag();
    });
});

test.describe('Case Flag', () => {
        test.beforeEach(async ({ page }) => {
            let createCase= new createAndAcceptCase();
            await createCase.setupCase(page, "Scotland", "ET_Scotland");
        });

        test('Create and remove case Flag for Scotland-Single case',async ({ page }) => {
            let caseListPage = new CaseListPage(page);
            let createCaseFlag = new CreateCaseFlag(page);
            let manageCaseFlag = new ManageCaseFlag(page);

            //Create case flag
            await caseListPage.selectNextEvent('Create a case flag');
            await createCaseFlag.createCaseFlag();

            //remove case flag
            await caseListPage.selectNextEvent('Manage case flags');
            await manageCaseFlag.manageCaseFlag();
        });
    });


