import { test  } from '../fixtures/common.fixture';
import config from '../config/config.ts';
import { Events } from '../config/case-data.ts';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';

test.describe('Judgement tests', () => {
    let caseId: string;
    let caseNumber: string;

    test.beforeEach(async () => {
      ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
    });

    test(
      'Submit and Issue Judgement',
      { tag: '@demo' },
      async ({
        manageCaseDashboardPage,
        loginPage,
        caseListPage,
        caseDetailsPage,
        draftJudgementPage,
        issueJudgementPage,
      }) => {

        //Judge creates a draft judgement
        await manageCaseDashboardPage.visit();
        //judge logs in
        await loginPage.processLogin(
          config.etEnglandJudge.email,
          config.etEnglandJudge.password,
          config.loginPaths.cases,
        );
        await caseListPage.navigateToCaseDetails(caseId, 'EnglandWales');

        //Create a draft judgment
        await caseListPage.navigateToTab('Judgments');
        await caseListPage.verifyAndClickLinkInTab('Draft and sign judgment/order');
        await draftJudgementPage.submitDraftJudgement();

        await caseListPage.navigateToTab('Judgments');
        await caseDetailsPage.assertTabData([
          {
            tabName: 'Judgments',
            tabContent: [
              { tabItem: 'Is this a Judgment', value: 'Yes' },
              { tabItem: 'Document', value: 'test.txt' },
              { tabItem: 'Any further directions', value: 'Test Draft Judgement' },
            ],
          },
        ]);
        await caseListPage.signoutButton();

        //Case worker issues the judgement
        await loginPage.processLogin(
          config.etCaseWorker.email,
          config.etCaseWorker.password,
          config.loginPaths.worklist,
        );
        await caseListPage.navigateToCaseDetails(caseId, 'EnglandWales');

        await caseListPage.selectNextEvent(Events.judgment.listItem);
        await issueJudgementPage.issueJudgement();

        await caseListPage.navigateToTab('Judgments');
        await caseDetailsPage.assertTabData([
          {
            tabName: 'Judgments',
            tabContent: [
              { tabItem: 'Jurisdiction Code', value: 'DAG' },
              { tabItem: 'Non Hearing Judgment?', value: 'Yes' },
              { tabItem: 'Judgment Type', value: 'Case Management' },
              { tabItem: 'Date Judgment made', value: '1 Jan 2025' },
              { tabItem: 'Date Judgment sent', value: '2 Jan 2025' },
            ],
          },
        ]);
      },
    );
})
