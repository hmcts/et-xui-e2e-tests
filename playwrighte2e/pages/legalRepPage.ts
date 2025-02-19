import { BasePage } from './basePage';
import { params } from "../utils/config";
import { expect } from '@playwright/test';

export class LegalRepPage extends BasePage {
    // private page: Page;

    // constructor(page: Page) {
    //     this.page = page;
    // }

    applyButtonOnLegalRep = '.workbasket-filters-apply';
    manageCasesLinkLegalRep = '[aria-label="Manage Cases"]';
    continueButton = '.button';
    nocLinkLegalRep = '//a[contains(.,"Notice of change")]';
    continueLegalRepButton = '//button[@class="button"]';
    submitButtonLegalRep = '//button[@class="button"]';
    caseidFilfield = '#caseRef';
    respondentDetailsLegalRep = '#respondentName';
    fieldSetLegalRep = '#fieldset-q-and-a-form';
    claimantFirstNamelegalRep = '#claimantFirstName';
    claimantLastNamelegalRep = '#claimantLastName';
    detailConfirmationCheckbox = '#affirmation';
    notifyPartyCheckbox = '#notifyEveryParty';
    confirmdiv = 'affirmation-section';
    linkToCasesLegalRep = '.hmcts-header__link';
    caseListText = 'Case list';
    caseTypeDropdown = '#wb-case-type';
    manageCasesLink = '.hmcts-header__link';
    prepareDocContinueButton = '[type="submit"]';
    changeDocuUploaded = '[aria-label="Change Upload document"]';
    submissionReferenceLocator = '#feeGroupReference';
    respondentTextfield = '#respondent';
    applyButton = '[aria-label="Apply filter"]';
    resetButton = '[aria-label="Reset filter"]';
    nextEventDropdown = '#next-step';
    submitEventButton = '[type="submit"]';
    successfulMessageHeader = '//h1[@class="govuk-panel__title"]';
    prepareDocPageTwoHeader = '.govuk-heading-l';
    prepDecYesOption = '#bundlesRespondentAgreedDocWith-Yes';
    prepDocAgreeWithRes = '#bundlesRespondentAgreedDocWith-But';
    prepDocAgreeWithResTextField = '#bundlesRespondentAgreedDocWithBut';
    prepDocNoAgreement = '#bundlesRespondentAgreedDocWith-No';
    prepDocNoAgreementTextField = '#bundlesRespondentAgreedDocWithNo';
    selectHearingFromDropdown = '#bundlesRespondentSelectHearing';
    respondentDocOnly = '#bundlesRespondentWhoseDocuments div:nth-of-type(1) > .form-control';
    bothPartiesDoc = '#bundlesRespondentWhoseDocuments div:nth-of-type(2) > .form-control';
    hearingDocumentIncludingWitnessStatement = '#bundlesRespondentWhatDocuments div:nth-of-type(1) > .form-control';
    supplementaryHearingDocument = '#bundlesRespondentWhatDocuments div:nth-of-type(2) > .form-control';
    witnessStatementOnly = '#bundlesRespondentWhatDocuments div:nth-of-type(3) > .form-control';
    uploadBundleDocument = '#bundlesRespondentUploadFile';
    legalRepSubmit = '[type="submit"]';
    successfulmsgHeader = '.heading-h1';
    hearingTabLegalRep = '//div[8]';
    closeAndReturnButton = '[type="submit"]';
    loadingSpinner = '.spinner-container';
    legalRepNotificationTab = '#mat-tab-label-0-6';
    viewJudgmentOrderOrNotificationLink = '//a[.="View a judgment, order or notification"]';
    selectJudgmentOrderorNotificationDropdown = '#pseRespondentSelectJudgmentOrderNotification';
    lrRespondToTribunal = '//a[.="Respond to an order or request from the tribunal"]';
    responseNotificationDropdown = '#pseRespondentSelectOrderOrRequest';
    casedetailsEditForm = '#caseEditForm';
    lrAddCommentToResponse = '#pseRespondentOrdReqResponseText';
    noSupportingMaterial = '#pseRespondentOrdReqHasSupportingMaterial_No';
    legalRepYesOptionR92 = '#pseRespondentOrdReqCopyToOtherParty-Yes';
    et3respondentFormDropdown = '#submitEt3Respondent';
    contractClaimCorrectYesButton = '#et3ResponseIsClaimantNameCorrect_Yes';
    respondentLegalname = '#et3ResponseRespondentLegalName';
    et3postCodeInput = '#et3RespondentAddress_et3RespondentAddress_postcodeInput';
    findAddressButton = '//button[@class="button button-30"]';
    addressListDropdown = '#et3RespondentAddress_et3RespondentAddress_addressList';
    et3ContactPreferenceEmail = '#et3ResponseContactPreference-Email';
    hearingAttendanceRepresentative = '[field_id="et3ResponseHearingRepresentative"] [value="Phone hearings"]';
    hearingAttendanceRespondent = '[field_id="et3ResponseHearingRespondent"] [value="Video hearings"]';
    mentalHealthIssueNo = '#et3ResponseRespondentSupportNeeded-No';
    cyaFirstChange = '[aria-label="Change Select which respondent this ET3 is for"]';
    employmentDetailLink = '//a[.="ET3 - Employment Details"]';
    whichRespondentDropdown = '#et3RepresentingRespondent_0_dynamicList';
    respondentMultipleYes = '#et3ResponseMultipleSites_Yes';
    claimantDateOfEmploymentCorrectYes = '#et3ResponseAreDatesCorrect-Yes';
    employmentContinuingYes = '#et3ResponseContinuingEmployment-Yes';
    jobTitleCorrectYes = '#et3ResponseIsJobTitleCorrect-Yes';
    weeklyWorkingCorrectYes = '#et3ResponseClaimantWeeklyHours-Yes';
    earningDetailsCorrectYes = '#et3ResponseEarningDetailsCorrect-Yes';
    noticeCorrectYes = '#et3ResponseIsNoticeCorrect-Yes';
    responsePensionDetailCorrectYes = '#et3ResponseIsPensionCorrect-Yes';
    responseDetailLink = '//a[.="ET3 - Response Details"]';
    respondentDetailDropDownList = '#et3RepresentingRespondent_0_dynamicList';
    acasReconciliationOption = '#et3ResponseAcasAgree_Yes';
    respondentContestClaim = '#et3ResponseRespondentContestClaim-No';
    employmentContractClaimYes = '#et3ResponseEmployerClaim_Yes';
    eccTextField = '#et3ResponseEmployerClaimDetails';
    et3EccUploadButton = '#et3ResponseEmployerClaimDocument';
    changeButtonOneCyaRespondentDetail = '[aria-label="Change Select which Respondent this ET3 Form is for"]';
    closeReturnToCaseDetails = '//button[@class="button"]';
    selectCompletedDraftET3 = '#submitEt3Respondent';
    checkConfirmationCheckbox = '#confirmEt3Submit-Yes';
    makeAnApplicationLink = '//a[.="Make an application"]';
    uploadDocumentContactTribunal = '#resTseDocument1';
    textArea= '#resTseTextBox1';
    applicationTypeDropDown = '#resTseSelectApplication';
    YesCorrespondenceRadioOption = '#resTseCopyToOtherPartyYesOrNo-Yes';
    checkYourAnswerHeading = '//h2[@class="heading-h2"]';
    applicationTab = '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Applications"]';
    expandImgIcon = 'div a img';


    async loadExistingApplications(option: string) {
        await this.page.reload();
        await this.page.waitForSelector(this.nocLinkLegalRep, { timeout: 30000 });
        await this.page.click(this.linkToCasesLegalRep);
        await this.page.waitForSelector(this.caseTypeDropdown, { timeout: 30000 });
        await this.page.reload();
        await this.page.waitForTimeout(5000);
        await this.page.waitForSelector(this.resetButton, { timeout: 35000 });
        await this.page.waitForSelector(`text=${this.caseListText}`);
        await this.page.waitForTimeout(5000);
        try {
            switch (option) {
                case 'Eng/Wales - Singles':
                    await this.page.selectOption(this.caseTypeDropdown, 'Eng/Wales - Singles');
                    break;
                case 'Scotland':
                case 'Scotland - Singles':
                    await this.page.selectOption(this.caseTypeDropdown, 'Scotland - Singles (RET)');
                    break;
                default:
                    throw new Error('... check your options or add new option');
            }
        } catch (error) {
            console.error('invalid option', error.message);
        }
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await this.page.waitForTimeout(3000);
        await this.page.click(this.applyButton);
    }

    async processNOC(option: string, submissionReference: string, respondentName: string, ClaimantFirstName: string, ClaimantLastName: string) {
        await this.loadExistingApplications(option);
        await this.page.reload();
        await this.page.waitForSelector(this.nocLinkLegalRep, { timeout: 25000 });
        await this.page.click(this.nocLinkLegalRep);
        await this.page.waitForTimeout(10000);

        await this.page.waitForSelector(this.caseidFilfield, { timeout: 10000 });
        await this.page.fill(this.caseidFilfield, submissionReference);
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.fieldSetLegalRep, { timeout: 10000 });
        await this.page.fill(this.respondentDetailsLegalRep, respondentName);
        await this.page.fill(this.claimantFirstNamelegalRep, ClaimantFirstName);
        await this.page.fill(this.claimantLastNamelegalRep, ClaimantLastName);
        await this.page.waitForTimeout(5000);
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForTimeout(10000);
        await this.page.waitForSelector(this.detailConfirmationCheckbox, { timeout: 10000 });
        await this.page.check(this.detailConfirmationCheckbox);
        await this.page.check(this.notifyPartyCheckbox);
        await this.page.waitForTimeout(2000);
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await this.page.click(this.submitButtonLegalRep);
        await this.page.waitForSelector(this.successfulMessageHeader, { timeout: 20000 });
        await this.page.goto(`${params.TestUrlForManageCaseAAT}/cases/case-details/${submissionReference}`);
        await this.page.waitForTimeout(10000);
    }

    async submitDocumentForHearingRespondent(agreement: string, whoseDocu: string, docuType: string, checkActiveHearing?: boolean) {
        await this.page.waitForSelector('text=Prepare and submit documents for a hearing', { timeout: 10000 });
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.prepareDocPageTwoHeader, { timeout: 15000 });
        await this.page.waitForSelector(this.loadingSpinner, { state: 'hidden', timeout: 10000 });
        await this.page.waitForSelector('text=Have you agreed these documents with the other party?');
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        try {
            switch (agreement) {
                case 'Yes':
                    await this.page.check(this.prepDecYesOption);
                    await this.page.click(this.prepareDocContinueButton);
                    break;
                case 'Agreed':
                    await this.page.check(this.prepDocAgreeWithRes);
                    await this.page.fill(this.prepDocAgreeWithResTextField, 'Testing prep document for hearing -- Agree with Res');
                    await this.page.click(this.prepareDocContinueButton);
                    break;
                case 'NotAgreed':
                    await this.page.check(this.prepDocNoAgreement);
                    await this.page.fill(this.prepDocNoAgreementTextField, 'Testing prep document for hearing -- No agreement');
                    await this.page.click(this.prepareDocContinueButton);
                    break;
                default:
                    throw new Error('... check your options or add new option');
            }
        } catch (error) {
            console.error('invalid option', error.message);
        }
        await this.page.waitForSelector(this.loadingSpinner, { state: 'hidden', timeout: 10000 });
        await this.page.waitForSelector(this.respondentDocOnly, { timeout: 10000 });
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await this.page.waitForSelector('text=About your hearing documents');
        if(checkActiveHearing) {
            const options = await this.page.locator('#bundlesRespondentSelectHearing option');
            const optionsCount = await options.count();
            expect(optionsCount).toBe(2);

            const optionText = await options.nth(1).textContent();
            expect(optionText).toContain('1 Costs Hearing - Harrogate CJC');
            expect(optionText).not.toContain('2 Costs Hearing - Harrogate CJC');
        }

        await this.page.selectOption(this.selectHearingFromDropdown, '1: 1');
        // Whose hearing documents are you uploading
        try {
            switch (whoseDocu) {
                case 'Respondent':
                    await this.page.check(this.respondentDocOnly);
                    break;
                case 'Both Parties':
                    await this.page.check(this.bothPartiesDoc);
                    break;
                default:
                    throw new Error('... check your options or add new option');
            }
        } catch (error) {
            console.error('invalid option', error.message);
        }
        // What are these documents?
        try {
            switch (docuType) {
                case 'Hearing Document including witness statement':
                    await this.page.check(this.hearingDocumentIncludingWitnessStatement);
                    break;
                case 'Supplementary hearing documents':
                    await this.page.check(this.supplementaryHearingDocument);
                    break;
                case 'Witness statement only':
                    await this.page.check(this.witnessStatementOnly);
                    break;
                default:
                    throw new Error('... check your options or add new option');
            }
        } catch (error) {
            console.error('invalid option', error.message);
        }
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.loadingSpinner, { state: 'hidden', timeout: 10000 });
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await this.page.waitForSelector('text=Upload your file of documents');
        await this.page.setInputFiles(this.uploadBundleDocument, 'test/data/welshTest.pdf');
        await this.page.waitForTimeout(10000);
        await this.page.click(this.continueLegalRepButton);
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await this.page.waitForSelector(this.changeDocuUploaded, { timeout: 10000 });
        await this.page.waitForSelector('text=Check the information below carefully.');
        await this.page.waitForSelector('text=Upload documents for hearing');
        await this.page.waitForSelector('text=Check your answers');
        await this.page.click(this.legalRepSubmit);
        await this.page.waitForTimeout(10000);
        // await this.page.waitForSelector(this.successfulmsgHeader, { timeout: 10000 });
        // await this.page.waitForSelector('text=You have sent your hearing documents to the tribunal');
        // await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        // await this.page.click(this.closeAndReturnButton);
        // await this.page.waitForSelector(this.loadingSpinner, { state: 'hidden', timeout: 10000 });
    }

    async verifyHearingDocumentTabLegalRep() {
        await this.page.waitForSelector(this.hearingTabLegalRep, { timeout: 10000 });
        await this.page.click(this.hearingTabLegalRep);
        await this.page.waitForSelector('text=Hearing Documents');
        await this.page.waitForSelector('text=Respondent Hearing Documents');
        await expect(this.page.getByText('welshTest.pdf')).toBeVisible();
    }

    async verifyHearingDocumentReceipientValues(fieldLabel: string, fieldValue: string) {
        await this.page.locator(this.expandImgIcon).click();
        await expect(this.page
            .locator(`//*[normalize-space()="${fieldLabel}"]/../..//td[normalize-space()="${fieldValue}"]`)).toBeVisible();
    }

    async respondToNotificationFromTribunal() {
        await this.page.click(this.legalRepNotificationTab);
        await this.page.waitForSelector(this.lrRespondToTribunal, { timeout: 10000 });
        await this.page.click(this.lrRespondToTribunal);
        await this.page.waitForSelector(this.responseNotificationDropdown, { timeout: 15000 });
        await this.page.selectOption(this.responseNotificationDropdown, '1:2');
        await this.page.waitForTimeout(2000);
        await this.page.click(this.continueButton);
        await this.page.waitForSelector(this.casedetailsEditForm, { timeout: 10000 });
        await this.page.fill(this.lrAddCommentToResponse, 'test response to notification from Trib');
        await this.page.check(this.noSupportingMaterial);
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.legalRepYesOptionR92, { timeout: 10000 });
        await this.page.check(this.legalRepYesOptionR92);
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.casedetailsEditForm, { timeout: 10000 });
        await this.page.waitForSelector('text=Check your answers');
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector('//button[@class="button"]');
    }

    async completeDraftET3ResponseForm() {
        await this.page.waitForSelector(this.legalRepSubmit, { timeout: 10000 });
        await this.page.waitForSelector('text=ET3 - Response to Employment tribunal claim (ET1)');
        await this.page.click(this.legalRepSubmit);
        await this.page.waitForSelector(this.et3respondentFormDropdown, { timeout: 10000 });
        await this.page.selectOption(this.et3respondentFormDropdown, '1: R: Henry Marsh');
        await this.page.waitForTimeout(2000);
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.contractClaimCorrectYesButton, { timeout: 10000 });
        await this.page.waitForSelector('text=Is this the correct claimant for the claim you\'re responding to?');
        await this.page.check(this.contractClaimCorrectYesButton);
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.respondentLegalname, { timeout: 10000 });
        await this.page.fill(this.respondentLegalname, 'ET Test Org');
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.et3postCodeInput, { timeout: 10000 });
        await this.page.fill(this.et3postCodeInput, 'KA11 5DG');
        await this.page.click(this.findAddressButton);
        await this.page.waitForSelector(this.addressListDropdown, { timeout: 2000 });
        await this.page.selectOption(this.addressListDropdown, '1: Object');
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForTimeout(5000);
        await this.page.waitForSelector('text=What is your contact phone number? (Optional)');
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForTimeout(5000);
        await this.page.waitForSelector('text=What is your reference number? (Optional)');
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.et3ContactPreferenceEmail, { timeout: 10000 });
        await this.page.waitForSelector('text=How would you prefer to be contacted?');
        await this.page.check(this.et3ContactPreferenceEmail);
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.hearingAttendanceRepresentative, { timeout: 10000 });
        await this.page.waitForSelector('text=Hearing format');
        await this.page.check(this.hearingAttendanceRepresentative);
        await this.page.check(this.hearingAttendanceRespondent);
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.mentalHealthIssueNo, { timeout: 10000 });
        await this.page.check(this.mentalHealthIssueNo);
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.cyaFirstChange, { timeout: 10000 });
        await this.page.click(this.continueLegalRepButton);
        // Employment Details
        await this.page.waitForSelector(this.employmentDetailLink, { timeout: 30000 });
        await this.page.click(this.employmentDetailLink);
        await this.page.waitForSelector(this.continueLegalRepButton, { timeout: 10000 });
        await this.page.waitForSelector('text=ET3 - Response to Employment tribunal claim (ET1)');
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.whichRespondentDropdown, { timeout: 10000 });
        await this.page.selectOption(this.whichRespondentDropdown, 'Henry Marsh');
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.respondentMultipleYes, { timeout: 10000 });
        await this.page.waitForSelector('text=Respondent\'s workforce');
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.claimantDateOfEmploymentCorrectYes, { timeout: 20000 });
        await this.page.check(this.claimantDateOfEmploymentCorrectYes);
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.employmentContinuingYes, { timeout: 10000 });
        await this.page.waitForSelector('text=Is the claimant\'s employment with the respondent continuing?');
        await this.page.check(this.employmentContinuingYes);
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.jobTitleCorrectYes, { timeout: 10000 });
        await this.page.waitForSelector('text=Is the claimant\'s description of their job or job title correct?');
        await this.page.check(this.jobTitleCorrectYes);
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.weeklyWorkingCorrectYes, { timeout: 10000 });
        await this.page.waitForSelector('text=Are the claimant\'s total weekly work hours correct?');
        await this.page.check(this.weeklyWorkingCorrectYes);
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.earningDetailsCorrectYes, { timeout: 10000 });
        await this.page.waitForSelector('text=Are the earnings details given by the claimant correct?');
        await this.page.check(this.earningDetailsCorrectYes);
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.noticeCorrectYes, { timeout: 10000 });
        await this.page.waitForSelector('text=Is the information given by the claimant correct about their notice?');
        await this.page.check(this.noticeCorrectYes);
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.responsePensionDetailCorrectYes, { timeout: 10000 });
        await this.page.waitForSelector('text=Are the details about pension and other benefits correct?');
        await this.page.check(this.responsePensionDetailCorrectYes);
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForTimeout(5000);
        await this.page.waitForSelector('text=Check your answers');
        await this.page.click(this.continueLegalRepButton);
        // Employment Details
        await this.page.waitForSelector(this.responseDetailLink, { timeout: 10000 });
        await this.page.click(this.responseDetailLink);
        await this.page.waitForSelector(this.continueLegalRepButton, { timeout: 10000 });
        await this.page.waitForSelector('text=How to fill in this form');
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.respondentDetailDropDownList, { timeout: 10000 });
        await this.page.selectOption(this.respondentDetailDropDownList, 'Henry Marsh');
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.acasReconciliationOption, { timeout: 10000 });
        await this.page.check(this.acasReconciliationOption);
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.respondentContestClaim, { timeout: 10000 });
        await this.page.waitForSelector('text=Does the respondent contest the claim?');
        await this.page.check(this.respondentContestClaim);
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.employmentContractClaimYes, { timeout: 10000 });
        await this.page.check(this.employmentContractClaimYes);
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForSelector(this.eccTextField, { timeout: 10000 });
        await this.page.fill(this.eccTextField, 'ECC Respondent Test');
        await this.page.setInputFiles(this.et3EccUploadButton, 'test/data/welshTest.pdf');
        await this.page.waitForTimeout(5000);
        await this.page.click(this.continueLegalRepButton);
        await this.page.waitForTimeout(5000);
        await this.page.waitForSelector('text=Check your answers');
        await this.page.click(this.submitButtonLegalRep);
        await this.page.waitForTimeout(5000);
        await this.page.click(this.continueLegalRepButton);
    }

async legalRepViewJudgmentOrderorNotification() {
    await this.page.waitForSelector(this.viewJudgmentOrderOrNotificationLink, { timeout: 10000 });
    await this.page.click(this.viewJudgmentOrderOrNotificationLink);
    await this.page.waitForSelector('text=View a judgment, order or notification');
    await this.page.selectOption(this.selectJudgmentOrderorNotificationDropdown, '1: 1');
    await this.page.waitForTimeout(3000);
    await this.page.click(this.continueLegalRepButton);
    await this.page.waitForSelector('text=View Application');
}

async submitET3ResponseForm() {
    await this.page.waitForSelector(this.selectCompletedDraftET3, { timeout: 10000 });
    await this.page.selectOption(this.selectCompletedDraftET3, 'Henry Marsh');
    await this.page.click(this.continueLegalRepButton);
    await this.page.waitForSelector(this.checkConfirmationCheckbox, { timeout: 10000 });
    await this.page.waitForSelector('text=Do you want to submit this ET3?');
    await this.page.check(this.checkConfirmationCheckbox);
    await this.page.click(this.continueLegalRepButton);
    await this.page.waitForTimeout(5000);
    await this.page.click(this.continueLegalRepButton);
    await this.page.waitForTimeout(5000);
    await this.page.click(this.continueLegalRepButton);
}

async grantAccessToMultiples(caseNumber: string) {
    await this.page.waitForSelector(`text=${caseNumber}`, { timeout: 10000 });
    await this.page.click(this.continueLegalRepButton);
}

    async legalRepMakeAnApplication() {
        await this.page.waitForSelector(this.applicationTab, { timeout: 20000 });
        await this.page.click(this.applicationTab);
        await this.page.waitForSelector(this.makeAnApplicationLink);
        await this.page.click(this.makeAnApplicationLink);
        await this.page.selectOption(this.applicationTypeDropDown, '1: Amend response');
        await this.page.click(this.continueLegalRepButton);

        await this.page.waitForSelector(this.uploadDocumentContactTribunal, { timeout: 30000 });
        await this.page.setInputFiles(this.uploadDocumentContactTribunal, 'test/data/welshTest.pdf');
        await this.page.waitForTimeout(3000);
        await this.page.fill(this.textArea, 'Make an application text');
        await this.page.click(this.continueLegalRepButton);

        await this.page.waitForSelector(this.YesCorrespondenceRadioOption);
        await this.page.check(this.YesCorrespondenceRadioOption);
        await this.page.click(this.continueLegalRepButton);

        await this.page.waitForSelector(this.checkYourAnswerHeading);
        await this.page.click(this.submitButtonLegalRep);

        await this.page.waitForSelector(this.closeAndReturnButton);
        await this.page.click(this.closeAndReturnButton);

    }
};
