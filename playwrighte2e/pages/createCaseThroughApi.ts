// @ts-ignore
// @ts-ignore
import querystring from 'querystring';
import config from '../config/config';
import engCase from '../data/et-england-case-data.json';
import engCaseCaseWorker from '../data/et-england-case-data-caseworker.json';
import scotCaseCaseWorker from '../data/et-scotland-case-data-caseworker.json';
import scotCase from '../data/et-scotland-case-data.json';
import * as OTPAuth from 'totp-generator';
import axios from 'axios';
import { BasePage } from './basePage';

const env = config.TestEnv;
const idamBaseUrl = `https://idam-api.${env}.platform.hmcts.net/loginUser`;
const idamTestingSupportUrl = `https://idam-testing-support-api.${env}.platform.hmcts.net`;
const syaApiBaseUrl = config.EtCosPreviewEtSyaApiUrl || `http://et-sya-api-${env}.service.core-compute-${env}.internal`;
const getUserIdurl = `https://idam-api.${env}.platform.hmcts.net/details`;
const s2sBaseUrl = `http://rpe-service-auth-provider-aat.service.core-compute-aat.internal/testing-support/lease`;
const ccdApiUrl = config.EtCosPreviewCcdUrl || `http://ccd-data-store-api-${env}.service.core-compute-${env}.internal`;
const engCasePayload = engCase.data;
const scotCasePayload = scotCase.data;
const engCasePayloadCaseworker:any = engCaseCaseWorker.data
const scotCasePayloadCaseworker:any = scotCaseCaseWorker.data
const location = 'ET_EnglandWales';

export default class CreateCaseThroughApi extends BasePage {
  async processCaseToAcceptedState(caseType: string, location: string) {
    // Login to IDAM to get the authentication token
    const authToken = await this.getAuthToken(config.TestEnvApiUser, config.TestEnvApiPassword);
    let serviceToken = await this.getS2SServiceToken();

    //Getting the User Id based on the Authentication Token that is passed for this User.
    const userId = await this.getUserDetails(authToken);
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
    const authToken = await this.getAuthTokenForCaseWorker(config.TestEnvApiUser, config.TestEnvApiPassword);
    return await this.getCaseData(authToken, case_id);
  }

  async processCaseWorkerCaseToAcceptedState(caseType: string, location: string, et3submission?: boolean) {
    //Login to IDAM to get the authentication token
    const authToken = await this.getAuthTokenForCaseWorker(config.TestEnvApiUser, config.TestEnvApiPassword);
    let serviceToken = await this.getS2SServiceTokenForCaseWorker();
    const token = await this.createACaseGetRequestForCaseWorker(authToken, serviceToken, location);

    const case_id = await this.createACasePostRequestForCaseWorker(caseType, authToken, serviceToken, token, location);
    console.log('case Id is:' + case_id);
    const vetAndAcceptResponse = await this.vetAndAcceptCuiCase(authToken, case_id);
    console.log('Caseworker created case vet and accepted successfully:' + vetAndAcceptResponse.data);
    if (et3submission) {
      //respondent Idam login
      const authToken = await this.getAuthToken(
        config.TestEnvET3RespondentEmailAddress,
        config.TestEnvET3RespondentPassword,
      );
      console.log('respondent Idam token fetched  successfully');

      //get respondent Idam Id
      const respondentUserId = await this.getUserDetails(authToken);
      console.log('respondent Idam User Id fetched  successfully');

      //assign a case to respondent
      const ccd_id = await this.assignCaseToRespondent(respondentUserId, authToken, case_id);
      console.log('case assigned to respondent successfully');

      //submit ET3
      await this.submitET3(ccd_id, respondentUserId, authToken, case_id);
      console.log('et3 completed successfully');
    }
    return case_id;
  }

  async processCuiCaseToAcceptedState() {
    // Login to IDAM to get the authentication token
    const authToken = await this.getAuthToken(config.TestEnvETClaimantEmailAddress, config.TestEnvETClaimantPassword);

    // Create a draft case
    const case_id = await this.createADraftCuiCasePostRequest(authToken);
    console.log('case Id is:' + case_id);

    // Update and submit the draft case
    const updateResponse = await this.submitDraftCuiCase(authToken, case_id, 'update');
    console.log('CUI case updated successfully:' + updateResponse.data);

    const submitResponse = await this.submitDraftCuiCase(authToken, case_id, 'submit');
    console.log('CUI case submitted successfully:' + submitResponse.data);
    return case_id;
  }

  async processCuiCaseVetAndAcceptState(et3Submission?: boolean) {
    // Login to IDAM to get the authentication token
    const authToken = await this.getAuthToken(config.TestEnvETClaimantEmailAddress, config.TestEnvETClaimantPassword);

    // Create a draft case
    const case_id = await this.createADraftCuiCasePostRequest(authToken);
    console.log('case Id is:' + case_id);

    // Update and submit the draft case
    const updateResponse = await this.submitDraftCuiCase(authToken, case_id, 'update');
    console.log('CUI case updated successfully:' + updateResponse.data);

    const submitResponse = await this.submitDraftCuiCase(authToken, case_id, 'submit');
    console.log('CUI case submitted successfully:' + submitResponse.data);

    const vetAndAcceptResponse = await this.vetAndAcceptCuiCase(authToken, case_id);
    console.log('CUI case vet and accepted successfully:' + vetAndAcceptResponse.data);

    if (et3Submission) {
      //respondent Idam login
      const authToken = await this.getAuthToken(
        config.TestEnvET3RespondentEmailAddress,
        config.TestEnvET3RespondentPassword,
      );
      console.log('respondent Idam token fetched  successfully');

      //get respondent Idam Id
      const respondentUserId = await this.getUserDetails(authToken);
      console.log('respondent Idam User Id fetched  successfully');

      //assign a case to respondent
      const ccd_id = await this.assignCaseToRespondent(respondentUserId, authToken, case_id);
      console.log('case assigned to respondent successfully');

      //submit ET3
      await this.submitET3(ccd_id, respondentUserId, authToken, case_id);
      console.log('et3 completed successfully');
    }
    return case_id;
  }

  async getAuthToken(username: string, password: string): Promise<string> {
    let access_token;
    let data = querystring.stringify({
      username: username,
      password: password,
    });
    let apiConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: idamBaseUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };
    return await axios.request(apiConfig).then(response => {
      console.log(JSON.stringify(response.data));
      access_token = response.data.access_token;
      return access_token;
    });
  }

  async getAuthTokenForCaseWorker(username: string, password: string): Promise<string> {
    let access_token;
    let data = querystring.stringify({
      username: username,
      password: password,
      client_id: 'et-sya',
      'client-secret': '111111',
      redirect_uri: 'https://localhost:3001/oauth2/callback',
      scope: 'roles',
      grant_type: 'password',
    });
    let apiConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: idamBaseUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };
    return await axios.request(apiConfig).then(response => {
      console.log(JSON.stringify(response.data));
      access_token = response.data.access_token;
      return access_token;
    });
  }

  async getS2SServiceToken() {
    let serviceToken;
    let oneTimepwd = (await OTPAuth.TOTP.generate(config.TestCcdGwSecret, { digits: 6, period: 30 })).otp;
    console.log('checking OTP => :' + oneTimepwd);

    let data = JSON.stringify({
      microservice: 'xui_webapp',
      oneTimePassword: oneTimepwd,
    });

    let apiConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: s2sBaseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    return await axios
      .request(apiConfig)
      .then(response => {
        console.log('s2s response is :' + JSON.stringify(response.data));
        return (serviceToken = response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async getS2SServiceTokenForCaseWorker() {
    let serviceToken;
    let oneTimepwd = (await OTPAuth.TOTP.generate(config.TestCcdGwSecret, { digits: 6, period: 30 })).otp;
    console.log('checking OTP => :' + oneTimepwd);
    let data = JSON.stringify({
      microservice: 'et_cos',
      oneTimePassword: oneTimepwd,
    });

    let apiConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: s2sBaseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    return await axios
      .request(apiConfig)
      .then(response => {
        console.log('s2s response is :' + JSON.stringify(response.data));
        return (serviceToken = response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async getUserDetails(authToken: string) {
    let userId;
    let apiConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: getUserIdurl,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    return await axios
      .request(apiConfig)
      .then(response => {
        console.log(JSON.stringify(response.data));
        return (userId = response.data.id);
      })
      .catch(error => {
        console.log(error);
      });
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

  async createACasePostRequestForCaseWorker(
    caseType: string,
    authToken: string,
    serviceToken: string,
    initiateEventToken: string,
    location: string,
  ) {
    const ccdSaveCasePath = `/case-types/${location}/cases?ignore-warning=false`;
    let createCaseUrl = ccdApiUrl + ccdSaveCasePath;
    let dataPayload;

    const payloadMap: { [key: string]: any } = {
      England: engCasePayloadCaseworker,
      Scotland: scotCasePayloadCaseworker,
    };

    dataPayload = payloadMap[caseType] || new Error('Unsupported case type');

    //start case creation
    let createCaseTemp = {
      data: dataPayload,
      event: {
        id: 'initiateCase',
        summary: 'Creating Case',
        description: 'For ExUI Caseworker Playwright E2E Test',
      },
      event_token: initiateEventToken,
      ignore_warning: false,
      draft_id: null,
    };

    let createCaseBody = `${JSON.stringify(createCaseTemp)}`;
    console.log('case body:' + createCaseBody);

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

  async createADraftCuiCasePostRequest(authToken: string) {
    const cuiDraftCasePath = '/cases/initiate-case';
    let createCaseUrl = syaApiBaseUrl + cuiDraftCasePath;

    //start case creation
    let createCaseBody = {
      case_type_id: 'ET_EnglandWales',
      case_data: {
        caseType: 'Single',
        caseSource: 'Manually Created',
      },
    };

    let apiConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: createCaseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
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

  async submitDraftCuiCase(authToken: string, case_id: string, methodType: string) {
    let updateCaseUrl = `${syaApiBaseUrl}/cases/${methodType}-case`;
    //start case creation
    let updateCaseBody = {
      case_id: case_id.toString(),
      case_type_id: 'ET_EnglandWales',
      case_data: engCasePayload,
    };

    let apiConfig = {
      method: 'put',
      maxBodyLength: Infinity,
      url: updateCaseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      data: updateCaseBody,
    };

    return await axios
      .request(apiConfig)
      .then(response => {
        console.log('CUI Updated case is :' + JSON.stringify(response.data));
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  async vetAndAcceptCuiCase(authToken: string, case_id: string) {
    const cuiDraftCasePath = `/vetAndAcceptCase?caseId=${case_id}`;
    let createCaseUrl = syaApiBaseUrl + cuiDraftCasePath;

    let apiConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: createCaseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

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

  async getCaseData(authToken: string, case_id: string) {
    const getCaseDataUrl = `/getCaseData?caseIds=${case_id}`;
    let etSyaApiGetCaseData = syaApiBaseUrl + getCaseDataUrl;
    let request = {
      method: 'GET',
      maxBodyLength: Infinity,
      url: etSyaApiGetCaseData,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };
    return await axios
      .request(request)
      .then(response => {
        return response.data[0];
      })
      .catch(error => {
        console.log(error);
      });
  }

  async assignCaseToRespondent(respondentAuthToken: string, authToken: string, case_id: string) {
    const modifyCasePath = `/manageCaseRole/modifyCaseUserRoles?modificationType=Assignment`;
    let createCaseUrl = syaApiBaseUrl + modifyCasePath;
    let ccd_id;
    let data = JSON.stringify({
      case_users: [
        {
          case_type_id: 'ET_EnglandWales',
          respondent_name: 'Mrs Test Auto',
          case_id: `${case_id}`,
          user_id: `${respondentAuthToken}`,
          case_role: '[DEFENDANT]',
        },
      ],
    });

    let apiConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: createCaseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    return await axios
      .request(apiConfig)
      .then(response => {
        console.log(JSON.stringify(response.data));
        return (ccd_id = response.data[0].case_data.respondentCollection[0].id);
      })
      .catch(error => {
        console.log(error);
      });
  }
  async submitET3(ccdId: string, respondentAuthToken: string, authToken: string, case_id: string) {
    const modifyCasePath = `/et3/modifyEt3Data`;
    let createCaseUrl = syaApiBaseUrl + modifyCasePath;

    let updateCaseBody = {
      caseSubmissionReference: `${case_id}`,
      requestType: 'submit',
      caseTypeId: 'ET_EnglandWales',
      caseDetailsLinksSectionId: 'respondentResponse',
      caseDetailsLinksSectionStatus: 'submit',
      responseHubLinksSectionId: 'contactDetails',
      responseHubLinksSectionStatus: 'submit',
      respondent: {
        id: `${ccdId}`,
        value: {
          respondent_name: 'Mrs Test Auto',
          respondentType: 'Organisation',
          respondentOrganisation: 'Test Company',
          respondentFirstName: 'Test',
          respondentLastName: 'Company',
          respondentAcasQuestion: 'Yes',
          respondentAcas: 'R123456/78/90',
          respondentAcasNo: 'Test respondent acas no',
          respondent_address: {
            AddressLine1: 'Test address line 1',
            AddressLine2: 'Test address line 2',
            AddressLine3: 'Test address line 3',
            PostTown: 'PostTown',
            Country: 'England',
            PostCode: 'SL6 2DE',
          },
          respondentPhone1: '+447444518903',
          respondentEmail: 'respondent@gmail.com',
          respondentContactPreference: 'Email',
          responseRespondentAddress: {
            AddressLine1: 'Test address line 1',
            AddressLine2: 'Test address line 2',
            AddressLine3: 'Test address line 3',
            PostTown: 'PostTown',
            Country: 'England',
            PostCode: 'SL6 2DE',
          },
          responseRespondentPhone1: '+447444518905',
          responseRespondentEmail: 'responseRespondent@gmail.com',
          responseRespondentContactPreference: 'Post',
          responseReceived: 'No',
          responseRespondentNameQuestion: 'Yes',
          responseRespondentName: 'Mrs Test Auto',
          responseContinue: 'Yes',
          et3ResponseIsClaimantNameCorrect: 'Yes',
          et3ResponseRespondentCompanyNumber: '12345678901234567890',
          et3ResponseRespondentPreferredTitle: 'Mr',
          et3ResponseRespondentContactName: 'Real Company Contact Name',
          et3ResponseDXAddress: 'Test ET3 response DX address',
          et3ResponseContactReason: 'Test ET3 response contact reason',
          et3ResponseHearingRepresentative: ['Phone hearings', 'Video hearings'],
          et3ResponseHearingRespondent: ['Phone hearings', 'Video hearings'],
          et3ResponseEmploymentCount: 200,
          et3ResponseMultipleSites: 'Yes',
          et3ResponseSiteEmploymentCount: 20,
          et3ResponseAcasAgree: 'No',
          et3ResponseAcasAgreeReason: 'If I agreed ACAS then why am I still dealing with these documents?',
          et3ResponseAreDatesCorrect: 'No',
          et3ResponseEmploymentStartDate: '2020-01-01',
          et3ResponseEmploymentEndDate: '2022-01-01',
          et3ResponseEmploymentInformation: 'Claimant gave wrong dates',
          et3ResponseContinuingEmployment: 'No',
          et3ResponseIsJobTitleCorrect: 'No',
          et3ResponseCorrectJobTitle: 'IT Director',
          et3ResponseClaimantCorrectHours: 36,
          et3ResponseEarningDetailsCorrect: 'No',
          et3ResponsePayFrequency: 'Annually',
          et3ResponsePayBeforeTax: 35000,
          et3ResponsePayTakehome: 30000,
          et3ResponseIsNoticeCorrect: 'No',
          et3ResponseCorrectNoticeDetails: 'Her notice period was only for 3 weeks',
          et3ResponseIsPensionCorrect: 'No',
          et3ResponsePensionCorrectDetails: "His pension was 300 and he didn't have a car.",
          et3ResponseRespondentContestClaim: 'Yes',
          et3ResponseContestClaimDetails: 'Test ET3 Response contest claim details',
          et3ResponseEmployerClaim: 'Yes',
          et3ResponseEmployerClaimDetails: "I want to make employer's contract claim.",
          et3ResponseRespondentSupportNeeded: 'No',
          idamId: `${respondentAuthToken}`,
          et3CaseDetailsLinksStatuses: {
            ET3CaseDetailsLinksStatuses: {
              personalDetails: 'notAvailableYet',
              et1ClaimForm: 'notViewedYet',
              respondentResponse: 'notStartedYet',
              hearingDetails: 'notAvailableYet',
              respondentRequestsAndApplications: 'notAvailableYet',
              claimantApplications: 'notAvailableYet',
              otherRespondentApplications: 'notAvailableYet',
              contactTribunal: 'optional',
              tribunalOrders: 'notAvailableYet',
              tribunalJudgements: 'notAvailableYet',
              documents: 'optional',
            },
          },
          et3HubLinksStatuses: {
            ET3HubLinksStatuses: {
              contactDetails: 'notStartedYet',
              employerDetails: 'notStartedYet',
              conciliationAndEmployeeDetails: 'notStartedYet',
              payPensionBenefitDetails: 'notStartedYet',
              contestClaim: 'notStartedYet',
              employersContractClaim: null,
              checkYorAnswers: 'cannotStartYet',
            },
          },
          et3ResponseLanguagePreference: null,
          et3ResponseHearingRespondentNoDetails: null,
          et3Status: 'submitted',
          et3IsRespondentAddressCorrect: null,
          contactDetailsSection: null,
          employerDetailsSection: null,
          conciliationAndEmployeeDetailsSection: null,
          payPensionBenefitDetailsSection: null,
          contestClaimSection: null,
          employersContractClaimSection: null,
        },
      },
    };

    console.log('body is:' + JSON.stringify(updateCaseBody));

    let apiConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: createCaseUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      data: updateCaseBody,
    };

    return await axios
      .request(apiConfig)
      .then(response => {
        console.log(JSON.stringify(response.data));
        // return case_id = response.data.id;
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

  async createDynamicRespondentUser(userEmail: string, userPassword: string) {
    const authToken = await this.getAuthToken(config.TestEnvApiUser, config.TestEnvApiPassword);
    await this.createCitizenPostRequest(authToken, userEmail, userPassword);
  }

  private async createCitizenPostRequest(authToken: string, userEmail: string, userPassword: string) {
    let idamUserCreationUrl = idamTestingSupportUrl + '/test/idam/users';
    let respJsonBody = {
      password: `${userPassword}`,
      user: {
        email: `${userEmail}`,
        forename: 'ET',
        surname: 'respodent',
        displayName: 'ET Respondent',
        roleNames: ['citizen'],
        accountStatus: 'ACTIVE',
        recordType: 'LIVE',
      },
    };
    console.log('body is:' + JSON.stringify(respJsonBody));

    let data = respJsonBody;

    let apiConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: idamUserCreationUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    return await axios
      .request(apiConfig)
      .then(response => {
        console.log('User created response ' + JSON.stringify(response.status));
      })
      .catch(error => {
        console.log(error);
      });
  }
}
