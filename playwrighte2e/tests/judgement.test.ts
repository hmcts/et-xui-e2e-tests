import { test  } from '../fixtures/common.fixture';
import config from '../config/config.ts';
import { Events } from '../config/case-data.ts';

test.describe('Judgement tests', () => {
    let subRef: string;
    let caseNumber: string;

    test.beforeEach(async ({ page, createCaseStep }) => {
        ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));
    });

    test('Submit and Issue Judgement', {tag: '@demo'}, async ({ page, loginPage,
                                                                caseListPage,
                                                                caseDetailsPage,
                                                                draftJudgementPage,
                                                                issueJudgementPage

    }) => {
      //Judge creates a draft judgement
      await caseListPage.signoutButton();
      await page.goto(config.TestUrlForManageCaseAAT);

      //judge logs in
      await loginPage.processLogin(config.TestEnvETJudgeUserEng, config.TestEnvETJudgeUserEngPassword, config.loginPaths.cases);
      await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales')

      //Create a draft judgement
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
            { tabItem: 'Any further directions', value: 'Test Draft Judgement' }
          ]
        }
        ]);
      await caseListPage.signoutButton();

        //Case worker issues the judgement
      await loginPage.processLogin(config.TestEnvETCaseWorkerUser, config.TestEnvETPassword, config.loginPaths.worklist);
      await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales')

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
          ]
        }
      ]);
    });
})
