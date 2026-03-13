import { test } from '../fixtures/common.fixture';
import config from "../config/config";
import referralData from '../resources/payload/referral-content.json';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import { CaseTypeLocation } from '../config/case-data.ts';

let caseId: string;
let caseNumber: string;

test.describe.serial('England - Referral test', () => {

    test(
      'New referral',
      { tag: '@demo' },
      async ({ manageCaseDashboardPage, loginPage, caseListPage, referralPage }) => {
        ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
        await manageCaseDashboardPage.visit();
        await loginPage.processLogin(
          config.etCaseWorker.email,
          config.etCaseWorker.password,
          config.loginPaths.worklist,
        );

        caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

        //Send new referral
        await caseListPage.navigateToTab(referralData.tabName);
        await caseListPage.verifyAndClickLinkInTab(referralData.createNewReferral);
        await referralPage.sendNewReferral(false);

        //verify referral details
        await caseListPage.navigateToTab(referralData.tabName);
        await caseListPage.verifyReferralDetails();

        //sign out as caseworker
        await manageCaseDashboardPage.signOut();
      },
    );

    test(
      'Reply to a referral',
      { tag: '@demo' },
      async ({ manageCaseDashboardPage, caseListPage, loginPage, referralPage }) => {
        await manageCaseDashboardPage.visit();

        //judge logs in
        await loginPage.processLogin(
          config.etEnglandJudge.email,
          config.etEnglandJudge.password,
          config.loginPaths.cases,
        );
        caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

        //Reply & verify a referral
        await caseListPage.navigateToTab(referralData.tabName);
        await caseListPage.verifyAndClickLinkInTab(referralData.replyToReferral);
        await referralPage.replyToReferral();

        //verify referral details
        await caseListPage.navigateToTab(referralData.tabName);
        await caseListPage.verifyReplyReferralDetails();

        await caseListPage.verifyReplyDetailsOnTab('Admin');
        await caseListPage.verifyReplyDetailsOnTab('This is a test direction');
        await manageCaseDashboardPage.signOut();
      },
    );

    test(
      'Z - Close a referral',
      { tag: '@demo' },
      async ({ manageCaseDashboardPage, loginPage, caseListPage, referralPage }) => {
        await manageCaseDashboardPage.visit();

        //judge logs in
        await loginPage.processLogin(
          config.etEnglandJudge.email,
          config.etEnglandJudge.password,
          config.loginPaths.cases,
        );
        caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

        // Close & verify a referral
        await caseListPage.navigateToTab(referralData.tabName);
        await caseListPage.verifyAndClickLinkInTab(referralData.closeReferral);
        await referralPage.closeAReferral();

        //verify referral details
        await caseListPage.navigateToTab(referralData.tabName);
        await caseListPage.verifyCloseReferralDetails();

        await manageCaseDashboardPage.signOut();
      },
    );

});
