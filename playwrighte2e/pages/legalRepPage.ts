import { BasePage } from './basePage';
import { expect } from '@playwright/test';

export class LegalRepPage extends BasePage {
  continueLegalRepButton = '//button[@class="button"]';
  prepareDocContinueButton = '[type="submit"]';
  changeDocuUploaded = '[aria-label="Change Upload document"]';
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
  // @ts-ignore
  closeAndReturnButton = '[type="submit"]';
  loadingSpinner = '.spinner-container';
  closeReturnToCaseDetails = '//button[@class="button"]';

  async submitDocumentForHearingRespondent(
    agreement: string,
    whoseDocu: string,
    docuType: string,
    checkActiveHearing?: boolean,
  ) {
    await this.webActions.verifyElementToBeVisible(
      this.page.locator('text=Prepare and submit documents for a hearing'),
      10000,
    );

    await this.webActions.clickElementByCss(this.continueLegalRepButton);
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.prepareDocPageTwoHeader), 15000);

    await this.page.waitForSelector(this.loadingSpinner, { state: 'hidden', timeout: 10000 });
    await this.page.waitForSelector('text=Have you agreed these documents with the other party?');
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    try {
      switch (agreement) {
        case 'Yes':
          await this.webActions.clickElementByCss(this.prepDecYesOption);
          await this.webActions.clickElementByCss(this.prepareDocContinueButton);
          break;
        case 'Agreed':
          await this.webActions.checkElementById(this.prepDocAgreeWithRes);
          await this.webActions.fillField(
            this.prepDocAgreeWithResTextField,
            'Testing prep document for hearing -- Agree with Res',
          );
          await this.webActions.clickElementByCss(this.prepareDocContinueButton);
          break;
        case 'NotAgreed':
          await this.webActions.checkElementById(this.prepDocNoAgreement);
          await this.webActions.fillField(
            this.prepDocNoAgreementTextField,
            'Testing prep document for hearing -- No agreement',
          );
          await this.webActions.clickElementByCss(this.prepareDocContinueButton);
          break;
        default:
          throw new Error('... check your options or add new option');
      }
    } catch (error) {
      console.error('invalid option', error);
    }
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.loadingSpinner), 10000);
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.respondentDocOnly), 10000);

    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForSelector('text=About your hearing documents');
    if (checkActiveHearing) {
      const options = await this.page.locator('#bundlesRespondentSelectHearing option');
      const optionsCount = await options.count();
      expect(optionsCount).toBe(2);

      const optionText = await options.nth(1).textContent();
      expect(optionText).toContain('0 Costs Hearing - Leeds ET');
      expect(optionText).not.toContain('1 Costs Hearing - Leeds ET');
    }

    await this.page.locator(this.selectHearingFromDropdown).selectOption({ index: 1 });
    // Whose hearing documents are you uploading
    try {
      switch (whoseDocu) {
        case 'Respondent':
          await this.webActions.checkElementById(this.respondentDocOnly);
          break;
        case 'Both Parties':
          await this.webActions.checkElementById(this.bothPartiesDoc);
          break;
        default:
          throw new Error('... check your options or add new option');
      }
    } catch (error) {
      console.error('invalid option', error);
    }
    // What are these documents?
    try {
      switch (docuType) {
        case 'Hearing Document including witness statement':
          await this.webActions.checkElementById(this.hearingDocumentIncludingWitnessStatement);
          break;
        case 'Supplementary hearing documents':
          await this.webActions.checkElementById(this.supplementaryHearingDocument);
          break;
        case 'Witness statement only':
          await this.webActions.checkElementById(this.witnessStatementOnly);
          break;
        default:
          throw new Error('... check your options or add new option');
      }
    } catch (error) {
      console.error('invalid option', error);
    }
    await this.webActions.clickElementByCss(this.continueLegalRepButton);

    await this.page.waitForSelector(this.loadingSpinner, { state: 'hidden', timeout: 10000 });
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForSelector('text=Upload your file of documents');
    await this.page.setInputFiles(this.uploadBundleDocument, 'playwrighte2e/resources/test_file/welshTest.pdf');
    await this.page.waitForTimeout(10000);

    await this.webActions.clickElementByCss(this.continueLegalRepButton);

    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.changeDocuUploaded), 10000);

    await this.page.waitForSelector('text=Check the information below carefully.');
    await this.page.waitForSelector('text=Upload documents for hearing');
    await this.page.waitForSelector('text=Check your answers');
    await this.webActions.clickElementByCss(this.legalRepSubmit);
    await this.webActions.clickElementByCss(this.closeReturnToCaseDetails);
    await this.page.waitForTimeout(10000);
  }

}
