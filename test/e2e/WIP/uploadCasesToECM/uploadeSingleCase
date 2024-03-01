Feature('Create Draft Cases from CCD backend');
//import { expect } from 'playwright/test';

const querystring = require('querystring');

const request = require('../../../data/request.json');
let test_case_username = process.env.TEST_CASE_USERNAME;
let test_case_password = process.env.TEST_CASE_PASSWORD;
const et_manage_case_url = 'https://manage-case.aat.platform.hmcts.net/cases';
const case_payload = request.case_payload;
//const sub_payload = request.sub_payload;

Scenario('England: create single draft case via api', async ({ I }) => {
  // get idam token
  //let url = process.env.IDAM_URL;
  let url = 'https://idam-api.aat.platform.hmcts.net/loginUser';
  let payload = querystring.stringify({
    // eslint-disable-next-line no-undef
    username: test_case_username,
    // eslint-disable-next-line no-undef
    password: test_case_password,
  });

  let header = { 'Content-Type': 'application/x-www-form-urlencoded' };
  console.log(`${test_case_username}`, `${test_case_password}`);
  let res = await I.sendPostRequest(url, payload, header);
  expect(res.status).to.eql(200);
  //use token to make draft application
  await res;
  //console.log (res);
  console.log('... finished getting token ...starting case initiation');
  let new_url = process.env.ET_CASE_API_URL;
  let access_token = res.data.access_token;
  console.log(access_token);
  let new_header = {
    Authorization: `Bearer ${access_token}`,
    'Content-Type': 'application/json',
  };
  let new_payload = `${JSON.stringify(case_payload)}`;
  console.log(new_payload);
  let result = await I.sendPostRequest(new_url, new_payload, new_header);
  console.log(result.data.id);
  //expect(result.status).to.eql(200);
  await result;
  console.log('... finished case initiation ... starting case submission');
  //submit the draft application
  // let submit_app_url = process.env.ET_SUBMIT_DRAFT_CASE_URL;
  //let latest_payload = Object.assign({ case_id: `${result.data.id}` }, sub_payload);
  // let submit_payload = `${JSON.stringify(latest_payload)}`;
  //console.log(submit_payload);
  //let testresult = await I.sendPutRequest(submit_app_url, submit_payload, new_header);
  //console.log(testresult);
  //expect(testresult.status).to.eql(200);
  //expect(testresult.data.state).to.eql('Submitted');
  let case_detail_url = `https://manage-case.aat.platform.hmcts.net/cases/case-details/${result.data.id}`;
  //verify case is loaded unto EXUI
  I.amOnPage(et_manage_case_url);
  I.waitForElement('#username', 10);
  I.fillField('#username', test_case_username);
  I.fillField('#password', test_case_password);
  I.click('[type="submit"]');
  I.amOnPage(case_detail_url);
  I.waitForElement('[class="mat-tab-label-content"]', 15);
  I.see('Case Number:');
}).tag('@test');
