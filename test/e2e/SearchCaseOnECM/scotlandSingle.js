Feature('Search For Single Application -Scotland');
const ecmLogin = require('../../util');
const aat_ecm_url = 'https://manage-case.aat.platform.hmcts.net/';
let hearingDetailsCaseId = '1652878476111438';
let judgementcaseId = '1656069102041894';
const judgementcaseDetailsUrl = `https://manage-case.aat.platform.hmcts.net/cases/case-details/${judgementcaseId}`;
const hearingcaseDetailsUrl = `https://manage-case.aat.platform.hmcts.net/cases/case-details/${hearingDetailsCaseId}`;

Scenario('Judgement Event For Single Case List', async ({ I, caseListPage, judgementCollectionPage }) => {
  I.amOnPage(aat_ecm_url);
  ecmLogin.signInWithCredentials();
  await caseListPage.searchCaseApplication('Scotland - Singles (RET)');
  I.amOnPage(judgementcaseDetailsUrl);
  await caseListPage.selectNextEvent('Judgment');
  await judgementCollectionPage.fillJurisdictionData('No Hearings', 'Judgment', 'COM');
  await judgementCollectionPage.fillJudgementMadeDates(21, 3, 2022);
  await judgementCollectionPage.fillJudgementSentDates(23, 3, 2022);
  await judgementCollectionPage.submitForm;
}).tag('@RET-2046');

Scenario('Hearing Details Event For Single Case List', async ({ I, caseListPage }) => {
  I.amOnPage(aat_ecm_url);
  ecmLogin.signInWithCredentials();
  await caseListPage.searchCaseApplication('Scotland - Singles (RET)');
  I.amOnPage(hearingcaseDetailsUrl);
  await caseListPage.selectNextEvent('Hearing Details');
}).tag('@ecmtest');
