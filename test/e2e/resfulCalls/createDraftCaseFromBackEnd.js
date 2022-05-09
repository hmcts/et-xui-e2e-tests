Feature('Create Draft Cases from CCD backend');
const { expect } = require('chai');

const request = require('../../data/request.json');
Scenario('get token from idam', async ({ I }) => {
  let url = JSON.stringify(request.idam_url);
  let payload = JSON.stringify(request.idam_payload);
  let headers = JSON.stringify(request.headers);
  const res = await I.sendPostRequest(url, payload, headers);
  expect(res.status).to.eql(201);
  return res.access_token;
}).tag('@test');

Scenario('England: create single draft case via api', async ({ I }) => {
  // to retest after fixing 400 error
  let url = JSON.stringify(request.ew_url);
  let access_token = res.access_token;
  let headers = {
    Authorization: `Bearer ${access_token}`,
    content_type: 'application/json',
  };
  let payload = JSON.stringify(request.draft_case_payload);
  const res = await I.sendPostRequest(url, payload, headers);
  expect(res.status).to.eql(201);
  return res;
}).tag('@test');
