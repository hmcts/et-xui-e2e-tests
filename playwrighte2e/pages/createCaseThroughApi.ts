
import querystring from "querystring";
import { params } from "../utils/config";
import engCase from "../data/et-england-case-data.json";
import scotCase from "../data/et-scotland-case-data.json";
import * as OTPAuth from "totp-generator";
import axios from "axios";
import { BasePage } from "./basePage";

const env = params.TestEnv;
const idamBaseUrl = `https://idam-api.${env}.platform.hmcts.net/loginUser`;
const syaApiBaseUrl = `http://et-sya-api-${env}.service.core-compute-${env}.internal`;
const getUserIdurl = `https://idam-api.${env}.platform.hmcts.net/details`;
const s2sBaseUrl = `http://rpe-service-auth-provider-aat.service.core-compute-aat.internal/testing-support/lease`;
const ccdApiUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
const engCasePayload = engCase.data;
const scotCasePayload = scotCase.data;
const location = 'ET_EnglandWales';

export default class CreateCaseThroughApi extends BasePage {

  async processCaseToAcceptedState(caseType: string, location: string) {

    // Login to IDAM to get the authentication token
    const authToken = await this.getAuthToken(params.TestEnvApiUser, params.TestEnvApiPassword);
    let serviceToken = await this.getS2SServiceToken();

    //Getting the User Id based on the Authentication Token that is passed for this User.
    const userId = await this.getUserDetails(authToken);
    const token = await this.createACaseGetRequest(authToken, serviceToken, userId, location);
    const case_id= await this.createACasePostRequest(caseType, authToken, serviceToken, userId, token, location);
    console.log('case Id is:' +case_id);
    const response = await this.performCaseVettingEventGetRequest(authToken, serviceToken, case_id);
    await this.performCaseVettingEventPostRequest(authToken, serviceToken, case_id, response);
    //Initiate accept case
    // const acceptCaseToken= await this.acceptTheCaseEventFirstRequest(authToken, serviceToken, case_id);
    // console.log('token to accept the case:' +acceptCaseToken);
    //await this.acceptTheCaseEventSecondRequest(authToken, serviceToken, case_id, acceptCaseToken);
    return case_id;

  }

  async processCuiCaseToAcceptedState() {

    // Login to IDAM to get the authentication token
    const authToken = await this.getAuthToken(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);

    // Create a draft case
    const case_id= await this.createADraftCuiCasePostRequest(authToken);
    console.log('case Id is:' + case_id);

    // Update and submit the draft case
    const updateResponse = await this.submitDraftCuiCase(authToken, case_id, "update");
    console.log('CUI case updated successfully:' + updateResponse.data);

    const submitResponse = await this.submitDraftCuiCase(authToken, case_id, "submit");
    console.log('CUI case submitted successfully:' + submitResponse.data);
    return case_id;
  }

  async getAuthToken(username: string, password: string) {
    let access_token;
    let data = querystring.stringify({
      'username':  username,
      'password': password
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: idamBaseUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    return await axios.request(config).then((response) => {
        console.log(JSON.stringify(response.data));
        access_token = response.data.access_token;
      return access_token;
      });
  }


async getS2SServiceToken() {
  let serviceToken;
  let oneTimepwd = OTPAuth.TOTP.generate(params.TestCcdGwSecret, {digits: 6, period: 30}).otp;
  console.log("checking OTP => :" + oneTimepwd);

  let data = JSON.stringify({
    'microservice': 'xui_webapp',
    'oneTimePassword': oneTimepwd
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: s2sBaseUrl,
    headers: {
      'Content-Type': 'application/json'
    },
    data : data
  };

  return await axios.request(config)
    .then((response) => {
      console.log('s2s response is :' +(JSON.stringify(response.data)));
      return serviceToken = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

  async getUserDetails(authToken) {
    let userId;
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: getUserIdurl,
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    };

    return await axios.request(config).then((response) => {
      console.log(JSON.stringify(response.data));
      return userId = response.data.id;
    })
      .catch((error) => {
        console.log(error);
      });
  }


  async createACaseGetRequest(authToken, serviceToken, userId, location) {

    const ccdStartCasePath = `/caseworkers/${userId}/jurisdictions/EMPLOYMENT/case-types/${location}/event-triggers/initiateCase/token`;

    let initiateCaseUrl = ccdApiUrl + ccdStartCasePath;
    let initiateEventToken;

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: initiateCaseUrl,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'ServiceAuthorization': `${serviceToken}`, //may be bearer word not needed
        'Content-Type': 'application/json',
      }
    };

    return await axios.request(config).then((response) => {
      console.log(JSON.stringify(response.data));
      return initiateEventToken = response.data.token;
    })
      .catch((error) => {
        console.log(error);
      });

  }

  async createACasePostRequest(caseType, authToken, serviceToken, userId, initiateEventToken, location) {

    const ccdSaveCasePath = `/caseworkers/${userId}/jurisdictions/EMPLOYMENT/case-types/${location}/cases?ignore-warning=false`;
    let createCaseUrl = ccdApiUrl + ccdSaveCasePath ;
    let dataPayload;

    const payloadMap: { [key: string]: any } = {
      "England": engCasePayload,
      "Scotland": scotCasePayload
    };

   dataPayload = payloadMap[caseType] || new Error("Unsupported case type");

   //start case creation
    let createCasetemp = {
      data: dataPayload,
      event: {
        id: 'initiateCase',
        summary: 'Creating Case',
        description: 'For ExUI/CUI Playwright E2E Test'
      },
      'event_token': initiateEventToken
    };

    let createCaseBody = `${JSON.stringify(createCasetemp)}`;

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: createCaseUrl,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'ServiceAuthorization': `Bearer ${serviceToken}`,
        'Content-Type': 'application/json',
        'experimental': 'true'
      },
      data : createCaseBody
    };

    let case_id;
    return await axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        return case_id = response.data.id
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async createADraftCuiCasePostRequest(authToken) {

    const cuiDraftCasePath = "/cases/initiate-case/";
    let createCaseUrl = syaApiBaseUrl + cuiDraftCasePath ;

   //start case creation
    let createCaseBody = {
        "case_type_id": "ET_EnglandWales",
        "case_data": {
            "caseType": "Single",
            "caseSource": "Manually Created"
        }
    };

    // let createCaseBody = `${JSON.stringify(createCasetemp)}`;

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: createCaseUrl,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      data : createCaseBody
    };

    let case_id;
    return await axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        return case_id = response.data.id;
      })
      .catch((error) => {
        console.log(error);
      });

  }

  async submitDraftCuiCase(authToken, case_id, methodType) {
     
    let updateCaseUrl = `${syaApiBaseUrl}/cases/${methodType}-case/`;
    //start case creation
    let updateCaseBody = {
      "case_id": case_id.toString(),
      "case_type_id": "ET_EnglandWales",
      "case_data": engCasePayload
    };

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: updateCaseUrl,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      data : updateCaseBody
    };

    return await axios.request(config)
      .then((response) => {
        console.log('CUI Updated case is :' +JSON.stringify(response.data));
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });

  }


  async performCaseVettingEventGetRequest(authToken, serviceToken, case_id) {
    // initiate et1 vetting
    const initiateEvent = `/cases/${case_id}/event-triggers/et1Vetting?ignore-warning=false`;

    let et1VettingUrl = ccdApiUrl + initiateEvent;

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: et1VettingUrl,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'ServiceAuthorization': `Bearer ${serviceToken}`,
        'Content-Type': 'application/json'
      }
    };

    return await axios.request(config)
      .then((response) => {
        console.log('ET1 vetting response:' +JSON.stringify(response.data));
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });

  }

  async performCaseVettingEventPostRequest(authToken, serviceToken, case_id, response) {
    // execute et1 vetting
    const execuEt1teUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal/cases/${case_id}/events`;

    const executeEventBody = {
      data: response.case_details.case_data,
      data_classification: response.case_details.data_classification,
      event: {
        id: 'et1Vetting',
        summary: 'Vetting a Case',
        description: 'For ExUI/CUI Playwright E2E Test'
      },
      event_token: response.token,
      ignore_warning: false,
      draft_id: null
    };
    let executeEt1payload = JSON.stringify(executeEventBody);
    console.log("vetiing body => " + executeEt1payload);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: execuEt1teUrl,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'ServiceAuthorization': `Bearer ${serviceToken}`,
        'experimental': true,
        'Content-Type': 'application/json'
      },
      data:executeEt1payload
    };

    console.log("... executing et1Vetting event ...")
    axios.request(config)
      .then((response) => {
        console.log('et1 vetting completed successfully...' +JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

  }


  //TODO fix accept event through API call
  // async acceptTheCaseEventFirstRequest(authToken, serviceToken, case_id) {
  //
  //   console.log("... application vetted, starting accept event...");
  //   const initiateNextEvent = `/cases/${case_id}/event-triggers/preAcceptanceCase?ignore-warning=false`;
  //
  //
  //   let initiateAcceptUrl = ccdApiUrl + initiateNextEvent;
  //
  //   let config = {
  //     method: 'get',
  //     maxBodyLength: Infinity,
  //     url: initiateAcceptUrl,
  //     headers: {
  //       'Authorization': `Bearer ${authToken}`,
  //       'ServiceAuthorization': `Bearer ${serviceToken}`,
  //       'Content-Type': 'application/json'
  //     }
  //   };
  //
  //   let acceptEventToken;
  //   return await axios.request(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //       return acceptEventToken = response.data.token;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  //
  // async acceptTheCaseEventSecondRequest(authToken, serviceToken, case_id, acceptEventToken) {
  //   // execute case
  //   let acceptBody = {
  //     "data": {
  //       "preAcceptCase": {
  //         "caseAccepted": "Yes",
  //         "dateAccepted": "2022-08-18"
  //       }
  //     },
  //     "event": {
  //       "id": "preAcceptanceCase",
  //       "summary": "",
  //       "description": ""
  //     },
  //     "event_token": acceptEventToken
  //   };
  //
  //   console.log("... This is the payload for triggering next event" + acceptBody);
  //   let acceptUrl = `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal/cases/${case_id}/events`
  //   let acceptPayload = JSON.stringify(acceptBody);
  //
  //
  //   let config = {
  //     method: 'post',
  //     maxBodyLength: Infinity,
  //     url: acceptUrl,
  //     headers: {
  //       'Authorization': `Bearer ${authToken}`,
  //       'ServiceAuthorization': `Bearer ${serviceToken}`,
  //       'experimental': true,
  //       'Content-Type': 'application/json'
  //     },
  //     data: acceptPayload
  //   };
  //
  //   axios.request(config)
  //     .then((response) => {
  //       console.log("... executing accept event ...")
  //       console.log(JSON.stringify(response.data));
  //       console.log("... accept event completed successfully ...")
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //
  // }
}
