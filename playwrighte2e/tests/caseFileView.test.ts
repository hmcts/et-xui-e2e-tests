import { test } from '@playwright/test';
import { ApplicationTabPage } from '../pages/applicationTabPage';
import createAndAcceptCase from "../pages/createAndAcceptCase";

let applicationTabPage: ApplicationTabPage;

test.describe('Case File View', () => {
    test.beforeEach(async ({ page }) => {
        let createCase= new createAndAcceptCase();
        applicationTabPage = new ApplicationTabPage(page);
        
        await createCase.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales");
    });

    test('Case File View - Check ET 1 Claim in CFV folder - England-Singles', async () => {
        // Check case file view
        await applicationTabPage.selectCaseFileView();
    });
});

test.describe('Case File View', () => {
    test.beforeEach(async ({ page }) => {
        let createCase= new createAndAcceptCase();
        applicationTabPage = new ApplicationTabPage(page);

        await createCase.setupCaseCreatedViaApi(page, "Scotland", "ET_Scotland");
    });

    test('Case File View - Check ET 1 Claim in CFV folder - Scotland-Singles', async () => {
        // Check case file view
        await applicationTabPage.selectCaseFileView();
    });
});
