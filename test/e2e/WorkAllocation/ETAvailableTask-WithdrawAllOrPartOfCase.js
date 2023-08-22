const testConfig = require('../config.js');

Feature('CTSC Admin - "WithdrawAllOrPartOfCase" Task for Admin');
Scenario(
  'Verify CTSC Admin can see created task from Available Task - Create "WithdrawAllOrPartOfCase" Task for Admin',
  async ({ I, loginPage, caseListPage }) => {
    // I.amOnPage('/');
    // await basePage.processPreLoginPagesForTheDraftApplication(postcode);
    // await loginPage.processLogin(testConfig.TestEnvETUser, testConfig.TestEnvETPassword);
    // await taskListPage.processPostLoginPagesForTheDraftApplication();
    // await personalDetailsPage.processPersonalDetails(postcode, 'England', addressOption);
    // await employmentAndRespondentDetailsPage.processStillWorkingJourney(
    //   workPostcode,
    //   selectedWorkAddress,
    //   firstLineOfAddress,
    // );
    // await claimDetailsPage.processClaimDetails();
    // //let submissionReference = await submitClaimPage.submitClaim();
    let submissionReference = 1692609628153834;
    // // login as cstc admin and check that the case is available under available task
    // I.wait(120);
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLogin(testConfig.TestEnvETCstcAdminUser, testConfig.TestEnvETCstcAdminPassword);
    await caseListPage.proceedtoWATaskPage();
    await caseListPage.proceedToAvailableTask();
    await caseListPage.proceedToMyTasks();
    await caseListPage.naviagtetoTask(submissionReference);
    await caseListPage.verifyWaTaskDetailsPage();
  },
).tag('@localTestNish');
