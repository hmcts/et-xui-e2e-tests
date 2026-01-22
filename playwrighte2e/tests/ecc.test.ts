import { test } from '../fixtures/common.fixture';
import { expect } from '@playwright/test';
import config from '../config/config';

let subRef: any;
let caseNumber: any;

test.describe('ECC', () => {
  test.describe.configure({ mode: 'default' });
  test.beforeEach(async ({ page, createCaseStep, loginPage, caseListPage }) => {
    subRef = await createCaseStep.setupCUIcaseVetAndAcceptViaApi(true);
    await page.goto(config.TestUrlForManageCaseAAT);
    await loginPage.processLogin(config.TestEnvETCaseWorkerUser, config.TestEnvETPassword, config.loginPaths.worklist);
    caseNumber = await caseListPage.navigateToCaseDetails(subRef.toString(), "EnglandWales");
  });

  test('Validate ECC flag is set on case', { tag: '@ecc' }, async ({ caseListPage, jurisdictionPage }) => {
    await caseListPage.selectNextEvent('Jurisdiction');
    await jurisdictionPage.page.getByRole('button', { name: 'Add new' }).nth(1).click();
    await jurisdictionPage.webActions.verifyElementToBeVisible(
      jurisdictionPage.page.locator(jurisdictionPage.elements.jurisdictionDropdown),
    );
    await jurisdictionPage.webActions.selectByOptionFromDropDown(
      jurisdictionPage.elements.jurisdictionDropdown,
      '6: BOC',
    );
    await jurisdictionPage.webActions.selectByLabelFromDropDown(
      '#jurCodesCollection_1_judgmentOutcome',
      'Not allocated',
    );
    await jurisdictionPage.page.getByRole('button', { name: 'Add new' }).nth(1).click();
    await jurisdictionPage.webActions.verifyElementToBeVisible(
      jurisdictionPage.page.locator('#jurCodesCollection_2_juridictionCodesList'),
    );
    await jurisdictionPage.webActions.selectByOptionFromDropDown(
      '#jurCodesCollection_2_juridictionCodesList',
      '15: ECC',
    );
    await jurisdictionPage.webActions.selectByLabelFromDropDown(
      '#jurCodesCollection_2_judgmentOutcome',
      'Not allocated',
    );
    await jurisdictionPage.clickSubmitButton();
    await expect(jurisdictionPage.page.getByRole('tab', { name: 'Case Details' }).locator('div')).toContainText(
      'Case Details',
    );
    await expect(jurisdictionPage.page.getByText('ECC', { exact: true })).toBeVisible();
  });

  test('Validate ECC error message', { tag: '@ecc' }, async ({ caseListPage, jurisdictionPage }) => {
    await caseListPage.selectNextEvent('Jurisdiction');
    await jurisdictionPage.page.getByRole('button', { name: 'Add new' }).nth(1).click();
    await jurisdictionPage.webActions.verifyElementToBeVisible(
      jurisdictionPage.page.locator(jurisdictionPage.elements.jurisdictionDropdown),
    );
    await jurisdictionPage.webActions.selectByOptionFromDropDown(
      jurisdictionPage.elements.jurisdictionDropdown,
      '15: ECC',
    );
    await jurisdictionPage.webActions.selectByLabelFromDropDown(
      '#jurCodesCollection_1_judgmentOutcome',
      'Not allocated',
    );
    await jurisdictionPage.clickSubmitButton();
    await expect(
      jurisdictionPage.page.getByText(
        "ECC jurisdiction code can only be added if there's a corresponding BOC jurisdiction code",
        { exact: true },
      ),
    ).toBeVisible();
  });

  test(
    'ECC Notification - should create BF Action and show notification banner to claimant',
    { tag: '@ecc' },
    async ({ caseWorkerNotificationPage, caseListPage, citizenHubPage }) => {
      await caseWorkerNotificationPage.navigateToSendANotifications();
      await caseWorkerNotificationPage.sendNotification('ECC');
      await expect(caseListPage.page.getByRole('tab', { name: 'BF Actions' })).toBeVisible();
      await caseListPage.navigateToTab('BF Actions');
      await caseListPage.verifyBFActionsTab('Action', 'ECC served');
      await caseListPage.signoutButton();
      await citizenHubPage.processCitizenHubLogin(
        config.TestEnvETClaimantEmailAddress,
        config.TestEnvETClaimantPassword,
      );
      await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
      await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);
      await citizenHubPage.verifyNotificationBanner('ECC')

    },
  );

  test(
    'Should show ECC in table once set on respondent',
    { tag: '@ecc' },
    async ({ caseListPage, respondentDetailsPage }) => {
      await caseListPage.selectNextEvent('Respondent Details');
      await respondentDetailsPage.processRespondentDetailsET3(true);
      await caseListPage.selectNextEvent('Respondent Details');
      await respondentDetailsPage.page.getByRole('group', { name: 'Is there an ECC?' }).getByLabel('Yes').check();
      await respondentDetailsPage.clickSubmitButton();
      await expect(caseListPage.page.getByRole('tab', { name: 'Respondents' })).toBeVisible();
      await caseListPage.navigateToTab('Respondents');
      await expect(caseListPage.page.getByText('Is there an ECC?', { exact: true })).toBeVisible();
    },
  );
});
