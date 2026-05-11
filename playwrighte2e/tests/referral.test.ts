import { test } from '../fixtures/common.fixture';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import { CaseTypeLocation, Events } from '../config/case-data.ts';
import { users } from '../config/config.dynamic.ts';

let caseId: string;
let caseNumber: string;

test.describe.serial('England - Referral test - case worker sends referral', () => {

    test.use({
        storageState: users.etCaseWorker.sessionFile,
    })
    test(
      'New referral',
      { tag: '@demo' },
      async ({ manageCaseDashboardPage, loginPage, referralPage, initialConsiderationPage, caseDetailsPage }) => {

        ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
        await manageCaseDashboardPage.visit();
        await loginPage.processLogin(
          users.etCaseWorker
        );

        caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

        //Send new referral
        await caseDetailsPage.navigateToTab('Referrals');
        await caseDetailsPage.verifyAndClickLinkInTab('Send a new referral');
        await referralPage.sendNewReferral(false);

        await caseDetailsPage.assertTabData([
          {
              tabName: 'Referrals',
              tabContent: [
                  { tabItem: 'ET1', value: ' | Judge | Yes', clickable: true },
                  'Awaiting instructions',
                  { tabItem: 'Details of the referral', value: 'This is a test referral' },
              ]
          }
          ]);

        await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
        await caseDetailsPage.selectNextEvent(Events.initialConsideration);
        await initialConsiderationPage.validateReferralLink();
      },
    );
});


test.describe.serial('England - Referral test - Judge Replies and closes referral', () => {
    test.use({
        storageState: users.etEnglandJudge.sessionFile,
    })
    test(
      'Reply to a referral',
      { tag: '@demo' },
      async ({ manageCaseDashboardPage, loginPage, referralPage, caseDetailsPage }) => {
        await manageCaseDashboardPage.visit();

        //judge logs in
        await loginPage.processLogin(
          users.etEnglandJudge
        );
        caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

        //Reply & verify a referral
        await caseDetailsPage.navigateToTab('Referrals');
        await caseDetailsPage.verifyAndClickLinkInTab('Reply to a referral');
        await referralPage.replyToReferral();

        //verify referral details
        await caseDetailsPage.assertTabData([
            {
                tabName: 'Referrals',
                tabContent: [
                    { tabItem: 'ET1', value: ' | Judge | Yes', clickable: true },
                    'Instructions issued',
                    { tabItem: 'Details of the referral', value: 'This is a test referral' },
                    { tabItem: 'Reply to', value: 'Admin' },
                    { tabItem: 'Urgent', value: 'Yes', position: 1 },
                    { tabItem: 'Directions', value: 'This is a test direction' },
                    { tabItem: 'Referral Document', value: 'Referral Summary.pdf' }
                ]
            }
        ]);
      },
    );

    test(
      'Z - Close a referral',
      { tag: '@demo' },
      async ({ manageCaseDashboardPage, loginPage, referralPage, caseDetailsPage }) => {
        await manageCaseDashboardPage.visit();

        //judge logs in
          await loginPage.processLogin(
            users.etEnglandJudge
          );
        caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

        // Close & verify a referral
        await caseDetailsPage.navigateToTab('Referrals');
        await caseDetailsPage.verifyAndClickLinkInTab('Close a referral');
        await referralPage.closeAReferral();

        //verify referral details
        await caseDetailsPage.assertTabData([
          {
              tabName: 'Referrals',
              tabContent: [
                  { tabItem: 'ET1', value: ' | Judge | Yes', clickable: true },
                  'Closed',
                  'This is a test close referral'
              ]
          }
          ]);

      },
    );
});
