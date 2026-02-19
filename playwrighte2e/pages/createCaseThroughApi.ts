// @ts-ignore
// @ts-ignore
import querystring from 'querystring';
import config from '../config/config';
import engCase from '../resources/payload/citizen/et-england-case-data.json';
import scotCase from '../resources/payload/citizen/et-scotland-case-data.json';
import axios from 'axios';
import { BasePage } from './basePage';
import { getServiceToken, getUserAuthToken, getUserId } from '../data-utils/api/TokenHelperApi.ts';
import { cuiApi } from '../fixtures/common.fixture.ts';
import { CaseTypeLocation } from '../config/case-data.ts';

const env = config.env;

const ccdApiUrl = config.EtCosPreviewCcdUrl || `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
const engCasePayload = engCase.data;
const scotCasePayload = scotCase.data;

export default class CreateCaseThroughApi extends BasePage {
  async processCaseToAcceptedState(caseType: string, location: string) {
    // Login to IDAM to get the authentication token
    const authToken = await getUserAuthToken(config.etApiUser.email, config.etApiUser.password);
    let serviceToken = await getServiceToken();

    //Getting the User Id based on the Authentication Token that is passed for this User.
    const userId = await getUserId(authToken, config.etApiUser.email);
    const token = await this.createACaseGetRequest(authToken, serviceToken, userId, location);
    const case_id = await this.createACasePostRequest(caseType, authToken, serviceToken, userId, token, location);
    console.log('case Id is:' + case_id);
    const response = await this.performCaseVettingEventGetRequest(authToken, serviceToken, case_id);
    await this.performCaseVettingEventPostRequest(authToken, serviceToken, case_id, response);
    //Initiate accept case
    // const acceptCaseToken= await this.acceptTheCaseEventFirstRequest(authToken, serviceToken, case_id);
    // console.log('token to accept the case:' +acceptCaseToken);
    //await this.acceptTheCaseEventSecondRequest(authToken, serviceToken, case_id, acceptCaseToken);
    return case_id;
  }

  async getCaseDataForCaseWorker(case_id: string) {
    return await cuiApi.getCaseData(config.etApiUser.email, config.etApiUser.password, case_id);
  }

  async processCuiCaseToAcceptedState() {
    // Create a draft case
    const case_id = await cuiApi.initiateCuiCase(config.etClaimant.email, config.etClaimant.password, CaseTypeLocation.EnglandAndWales);
    console.log('case Id is:' + case_id);

    // Update and submit the draft case
    const updateResponse = await cuiApi.updateDraftCuiCase(
      config.etClaimant.email,
      config.etClaimant.password,
      case_id,
      CaseTypeLocation.EnglandAndWales
    );
    console.log('CUI case updated successfully:' + updateResponse.id);

    const submitResponse = await cuiApi.submitDraftCuiCase(
      config.etClaimant.email,
      config.etClaimant.password,
      case_id,
      CaseTypeLocation.EnglandAndWales,
    );
    console.log('CUI case submitted successfully:' + submitResponse.id);
    return case_id;
  }

  async createACaseGetRequest(authToken: string, serviceToken: string, userId: string, location: string) {
    const ccdStartCasePath = `/caseworkers/${userId}/jurisdictions/EMPLOYMENT/case-types/${location}/event-triggers/initiateCase/token`;

    let initiateCaseUrl = ccdApiUrl + ccdStartCasePath;
    let initiateEventToken;

    let apiConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: initiateCaseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
        ServiceAuthorization: `${serviceToken}`, //may be bearer word not needed
        'Content-Type': 'application/json',
      },
    };

    return await axios
      .request(apiConfig)
      .then(response => {
        console.log(JSON.stringify(response.data));
        return (initiateEventToken = response.data.token);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async createACasePostRequest(
    caseType: string,
    authToken: string,
    serviceToken: string,
    userId: string,
    initiateEventToken: string,
    location: string,
  ) {
    const ccdSaveCasePath = `/caseworkers/${userId}/jurisdictions/EMPLOYMENT/case-types/${location}/cases?ignore-warning=false`;
    let createCaseUrl = ccdApiUrl + ccdSaveCasePath;
    let dataPayload;

    const payloadMap: { [key: string]: any } = {
      England: engCasePayload,
      Scotland: scotCasePayload,
    };

    dataPayload = payloadMap[caseType] || new Error('Unsupported case type');

    //start case creation
    let createCasetemp = {
      data: dataPayload,
      event: {
        id: 'initiateCase',
        summary: 'Creating Case',
        description: 'For ExUI/CUI Playwright E2E Test',
      },
      event_token: initiateEventToken,
    };

    let createCaseBody = `${JSON.stringify(createCasetemp)}`;

    let apiConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: createCaseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
        ServiceAuthorization: `Bearer ${serviceToken}`,
        'Content-Type': 'application/json',
        experimental: 'true',
      },
      data: createCaseBody,
    };

    let case_id;
    return await axios
      .request(apiConfig)
      .then(response => {
        console.log(JSON.stringify(response.data));
        return (case_id = response.data.id);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async performCaseVettingEventGetRequest(authToken: string, serviceToken: string, case_id: string) {
    // initiate et1 vetting
    const initiateEvent = `/cases/${case_id}/event-triggers/et1Vetting?ignore-warning=false`;

    let et1VettingUrl = ccdApiUrl + initiateEvent;

    let apiConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: et1VettingUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
        ServiceAuthorization: `Bearer ${serviceToken}`,
        'Content-Type': 'application/json',
      },
    };

    return await axios
      .request(apiConfig)
      .then(response => {
        console.log('ET1 vetting response:' + JSON.stringify(response.data));
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  async performCaseVettingEventPostRequest(authToken: string, serviceToken: string, case_id: string, response: any) {
    // execute et1 vetting
    const execuEt1teUrl = ccdApiUrl + `/cases/${case_id}/events`;

    const executeEventBody = {
      data: response.case_details.case_data,
      data_classification: response.case_details.data_classification,
      event: {
        id: 'et1Vetting',
        summary: 'Vetting a Case',
        description: 'For ExUI/CUI Playwright E2E Test',
      },
      event_token: response.token,
      ignore_warning: false,
      draft_id: null,
    };
    let executeEt1payload = JSON.stringify(executeEventBody);
    console.log('vetting body => ' + executeEt1payload);

    let apiConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: execuEt1teUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
        ServiceAuthorization: `Bearer ${serviceToken}`,
        experimental: true,
        'Content-Type': 'application/json',
      },
      data: executeEt1payload,
    };

    console.log('... executing et1Vetting event ...');
    axios
      .request(apiConfig)
      .then(response => {
        console.log('et1 vetting completed successfully...' + JSON.stringify(response.data));
      })
      .catch(error => {
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
  //   let apiConfig = {
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
  //   return await axios.request(apiConfig)
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
  //   let apiConfig = {
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
  //   axios.request(apiConfig)
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
  private async createACaseGetRequestForCaseWorker(authToken: string, serviceToken: string, location: string) {
    const ccdStartCasePath = `/case-types/${location}/event-triggers/initiateCase?ignore-warning=false`;

    let initiateCaseUrl = ccdApiUrl + ccdStartCasePath;
    let initiateEventToken;

    let apiConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: initiateCaseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
        ServiceAuthorization: `${serviceToken}`, //may be bearer word not needed
        'Content-Type': 'application/json',
        experimental: true,
      },
    };

    return await axios
      .request(apiConfig)
      .then(response => {
        console.log(JSON.stringify(response.data));
        return (initiateEventToken = response.data.token);
      })
      .catch(error => {
        console.log(error);
      });
  }

}
