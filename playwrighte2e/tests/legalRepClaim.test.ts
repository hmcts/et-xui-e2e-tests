import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';

import {params} from '../utils/config';

test('Claimant Representative creates a claim (England and Wales - Singles) and submit', async ({ page }) => {


    let loginPage = new LoginPage(page);

    await page.goto(params.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);



});
