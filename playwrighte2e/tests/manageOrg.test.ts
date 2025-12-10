import { test } from '../fixtures/common.fixture';
import { params } from '../config/config';

const userDetailsData = require('../data/ui-data/user-details.json');

test.describe('End to End Tests for Manage Organisation for Assigning and Non Assigning Cases', () => {
    test('Verify Assigned Cases for England and Wales', {tag: '@demo'}, async ({ page, loginPage, manageOrgPage }) => {

        await page.goto(params.TestUrlForManageOrg);
        await loginPage.processLogin(params.TestEnvETManageOrgSuperUserName, params.TestEnvETManageOrgSuperPassword);
        await manageOrgPage.assignCaseToSolicitor(userDetailsData.assigneeName, userDetailsData.caseReferenceNumber);
        // await manageOrgPage.unassignCaseFromSolicitor();
    });
});
