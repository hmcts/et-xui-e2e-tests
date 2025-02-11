
export const params = {

    TestUrlCitizenUi:process.env.TEST_URL||'https://et-sya.aat.platform.hmcts.net',
    TestUrlRespondentUi:process.env.TEST_RESP_URL||'https://et-syr.aat.platform.hmcts.net',
    TestUrlForManageCaseAAT:process.env.TEST_MANAGE_CASE_URL||'https://manage-case.aat.platform.hmcts.net',
    TestIdamUrl:process.env.IDAM_URL||'https://idam-api.aat.platform.hmcts.net/testing-support/accounts',
    IdamAcccountUrl:process.env.IDAM_ACCOUNT_URL||'https://idam-api.aat.platform.hmcts.net/testing-support/accounts',
    TestShowBrowserWindow:process.env.SHOW_BROWSER_WINDOW||false,
    TestsPathToRun:process.env.E2E_TEST_PATH||'./**/*.js',
    TestReportFolder:process.env.E2E_OUTPUT_DIR||'./functional-output/reports',
    TestEnvETClaimantEmailAddress:process.env.ET_CITIZEN_USER_NAME||'',
    TestEnvETClaimantPassword:process.env.ET_CITIZEN_PASSWORD||'',
    TestApiKey:process.env.API_KEY||'',
    TestEnvETCaseWorkerUser:process.env.ET_CASEWORKER_USER_NAME||'',
    TestEnvETPassword:process.env.ET_CASEWORKER_PASSWORD||'',
    TestEnvETManageCaseUser:process.env.ET_LEGAL_OPS_USER_NAME||'',
    TestEnvETManageCasePassword:process.env.ET_LEGAL_OPS_PASSWORD||'',
    TestEnvETLegalRepUser:process.env.ET_LEGALREP_USER_NAME||'',
    TestEnvETLegalRepPassword:process.env.ET_LEGALREP_PASSWORD||'',
    TestEnvETLegalOpsUser:process.env.ET_CTSC_ADMIN_USER_NAME||'',
    TestEnvETHearingJudgeUserScot:process.env.ET_HEARING_JUDGE_USER_NAME_SCOT||'',
    TestEnvETHearingJudgeUserEng:process.env.ET_HEARING_JUDGE_USER_NAME_ENG||'',
    TestEnvETAdminUserEng:process.env.ET_HEARING_ADMIN_USER_NAME_ENG||'',
    TestEnvETAdminUserScot:process.env.ET_HEARING_ADMIN_USER_NAME_SCOT||'',
    TestCcdGwSecret:process.env.MICROSERVICE_CCD_GW||'',
    TestEnvApiUser:process.env.ET_CCD_API_USER_NAME||'',
    TestEnvApiPassword:process.env.ET_CCD_API_PASSWORD||'',
    TestEnv:process.env.RUNNING_ENV||'',
    TestEnvETJudgeUserEng:process.env.ET_JUDGE_USER_NAME_ENG||'',
    TestEnvETJudgeUserEngPassword:process.env.ET_JUDGE_USER_ENG_PASSWORD||'',
    TestEnvET3RespondentEmailAddress:process.env.ET3_REPSONDENT_USER_NAME||'',
    TestEnvET3RespondentPassword:process.env.ET3_REPSONDENT_PASSWORD||'',
    TestEnvETRespondentEmailAddress:process.env.ET_REPSONDENT_USER_NAME||'',
    TestEnvETRespondentPassword:process.env.ET_REPSONDENT_PASSWORD||''

};

