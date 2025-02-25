import { test  } from '../fixtures/common.fixture';

test.describe('Judgement tests', () => {    
    let subRef: string;
    let caseNumber;

    test.beforeEach(async ({ page, createCaseStep }) => {
        ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));
    });

    test('Submit and Issue Judgement', {tag: '@wip-jud'}, async ({ caseListPage, judgementSteps }) => {

    
        //Judge creates a draft judgement
        await judgementSteps.createDraftJudgement(subRef);
        await caseListPage.signoutButton();

        //Case worker issues the judgement
        await judgementSteps.issueJudgement(subRef);
    });
})