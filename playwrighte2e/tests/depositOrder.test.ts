import { test } from '../fixtures/common.fixture';

// let subRef: string;
// let caseNumber;
const depositOrderData = require('../data/ui-data/deposit-order-content.json');
let formattedAmount;

test.describe('Deposit order test', () => {

    test.beforeEach(async ({ page, createCaseStep }) => {
        
        await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales");
        formattedAmount = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(depositOrderData.depositAmount);
    });

    test('Englad - deposit an order for respondent', async ({ caseListPage, depositOrderPage }) => {

        await caseListPage.selectNextEvent('Deposit Order');
        await depositOrderPage.submitADepositOrder();

        await caseListPage.navigateToTab("Deposit Order");
        await caseListPage.verifyDepositOrderDetailsOnTab("Deposit amount (£)", `£${formattedAmount}`);
        await caseListPage.verifyDepositOrderDetailsOnTab("Deposit ordered against", depositOrderData.respondentName);
        await caseListPage.verifyDepositOrderDetailsOnTab("Deposit requested by", depositOrderData.claimantName);
        await caseListPage.verifyDepositOrderDetailsOnTab("Deposit covers", depositOrderData.coverTypeAll);
        await caseListPage.verifyDepositOrderDetailsOnTab("Deposit order sent", "3 Mar 2025");
    });
});