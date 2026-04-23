// Static config: only static users and session file names, no dynamic user loading
export const staticUsers = {
  etCaseWorker: {
    email: process.env.ET_CASEWORKER_USER_NAME || '',
    password: process.env.ET_CASEWORKER_PASSWORD || ''
  },
  etManageCaseUser: {
    email: process.env.ET_LEGAL_OPS_USER_NAME || '',
    password: process.env.ET_LEGAL_OPS_PASSWORD || '',
  },
  etLegalRepresentative: { email: process.env.ET_LEGALREP_USER_NAME || '',
    password: process.env.ET_LEGALREP_PASSWORD || '',
  },
  etApiUser: {
    email: process.env.ET_CCD_API_USER_NAME || '',
    password: process.env.ET_CCD_API_PASSWORD || '',
  },
  etEnglandJudge: {
    email: process.env.ET_JUDGE_USER_NAME_ENG || '',
    password: process.env.ET_JUDGE_USER_ENG_PASSWORD || '',
 },
  etLegalRepresentative2: {
    email: process.env.ET_REPSONDENT_USER_NAME || '',
    password: process.env.ET_REPSONDENT_PASSWORD || '',
    },
  etManageOrgSuperUser: {
    email: process.env.ET_MANAGE_ORG_USERNAME || '',
    password: process.env.ET_MANAGE_ORG_PASSWORD || '',
     },
  etWorkAllocationJudge: {
    email: process.env.ET_JUDGE_USER_NAME_WORKALLOCATION || '',
    password: process.env.ET_JUDGE_USER_PASSWORD_WORKALLOCATION || '',
    },
};

export const staticConfig = {
  env: process.env.RUNNING_ENV || 'aat',

  etSyaUiUrl: process.env.TEST_URL_CITIZEN_UI || '',
  etSyrUiUrl: process.env.TEST_RESP_URL || '',
  manageCaseBaseUrl: process.env.TEST_MANAGE_CASE_URL || '',
  TestUrlForManageOrg: process.env.MANAGE_ORG_URL || '',
  idamUrl: process.env.IDAM_URL || '',
  EtCosPreviewEtSyaApiUrl: process.env.ET_COS_PREVIEW_ET_SYA_API || '',

  EtCosPreviewCcdUrl: process.env.ET_COS_PREVIEW_CCD || '',
  TestCcdGwSecret: process.env.MICROSERVICE_CCD_GW || '',

  loginPaths: {
    cases: 'cases',
    worklist: 'work/my-work/list',
    organisation: 'organisation',
  },
};

