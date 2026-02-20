import { test } from '../fixtures/common.fixture';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import { CaseTypeLocation } from '../config/case-data.ts';
import config from '../config/config.ts';

const depositOrderData = require('../resources/payload/deposit-order-content.json');
let formattedAmount: string;
let caseNumber: string;
let caseId: string;

test.describe('Deposit order test', () => {

    test.beforeEach(async () => {

      ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
        formattedAmount = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(depositOrderData.depositAmount);
    });

    test(
      'England - deposit an order for respondent',
      { tag: '@demo' },
      async ({ manageCaseDashboardPage, loginPage, caseListPage, depositOrderPage }) => {
        await manageCaseDashboardPage.visit();
        await loginPage.processLogin(
          config.etCaseWorker.email,
          config.etCaseWorker.password,
          config.loginPaths.worklist,
        );

        caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
        await caseListPage.selectNextEvent('Deposit Order');
        await depositOrderPage.submitADepositOrder();

        await caseListPage.navigateToTab('Deposit Order');
        await caseListPage.verifyDepositOrderDetailsOnTab('Deposit amount (£)', `£${formattedAmount}`);
        await caseListPage.verifyDepositOrderDetailsOnTab('Deposit ordered against', depositOrderData.respondentName);
        await caseListPage.verifyDepositOrderDetailsOnTab('Deposit requested by', depositOrderData.claimantName);
        await caseListPage.verifyDepositOrderDetailsOnTab('Deposit covers', depositOrderData.coverTypeAll);
        await caseListPage.verifyDepositOrderDetailsOnTab('Deposit order sent', '3 Mar 2025');
        await manageCaseDashboardPage.signOut();
      },
    );
});
