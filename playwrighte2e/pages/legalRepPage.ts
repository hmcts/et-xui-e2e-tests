import { BasePage } from './basePage';
import { expect, Locator, Page } from '@playwright/test';

export class LegalRepPage extends BasePage {
  readonly continueLegalRepButton: Locator;
  readonly prepareDocContinueButton: Locator;
  readonly changeDocuUploaded: Locator;
  readonly prepareDocPageTwoHeader: Locator;
  readonly prepDecYesOption: Locator;
  readonly prepDocAgreeWithRes: Locator;
  readonly prepDocAgreeWithResTextField: Locator;
  readonly prepDocNoAgreement: Locator;
  readonly prepDocNoAgreementTextField: Locator;
  readonly selectHearingFromDropdown: Locator;
  readonly respondentDocOnly: Locator;
  readonly bothPartiesDoc: Locator;
  readonly hearingDocumentIncludingWitnessStatement: Locator;
  readonly supplementaryHearingDocument: Locator;
  readonly witnessStatementOnly: Locator;
  readonly uploadBundleDocument: Locator;
  readonly legalRepSubmit: Locator;
  readonly closeAndReturnButton: Locator;
  readonly loadingSpinner: Locator;
  readonly closeReturnToCaseDetails: Locator;

  constructor(page: Page) {
    super(page);
    this.continueLegalRepButton = page.locator('//button[@class="button"]');
    this.prepareDocContinueButton = page.locator('[type="submit"]');
    this.changeDocuUploaded = page.locator('[aria-label="Change Upload document"]');
    this.prepareDocPageTwoHeader = page.locator('.govuk-heading-l');
    this.prepDecYesOption = page.locator('#bundlesRespondentAgreedDocWith-Yes');
    this.prepDocAgreeWithRes = page.locator('#bundlesRespondentAgreedDocWith-But');
    this.prepDocAgreeWithResTextField = page.locator('#bundlesRespondentAgreedDocWithBut');
    this.prepDocNoAgreement = page.locator('#bundlesRespondentAgreedDocWith-No');
    this.prepDocNoAgreementTextField = page.locator('#bundlesRespondentAgreedDocWithNo');
    this.selectHearingFromDropdown = page.locator('#bundlesRespondentSelectHearing');
    this.respondentDocOnly = page.locator('#bundlesRespondentWhoseDocuments div:nth-of-type(1) > .form-control');
    this.bothPartiesDoc = page.locator('#bundlesRespondentWhoseDocuments div:nth-of-type(2) > .form-control');
    this.hearingDocumentIncludingWitnessStatement = page.locator('#bundlesRespondentWhatDocuments div:nth-of-type(1) > .form-control');
    this.supplementaryHearingDocument = page.locator('#bundlesRespondentWhatDocuments div:nth-of-type(2) > .form-control');
    this.witnessStatementOnly = page.locator('#bundlesRespondentWhatDocuments div:nth-of-type(3) > .form-control');
    this.uploadBundleDocument = page.locator('#bundlesRespondentUploadFile');
    this.legalRepSubmit = page.locator('[type="submit"]');
    this.closeAndReturnButton = page.locator('[type="submit"]');
    this.loadingSpinner = page.locator('.spinner-container');
    this.closeReturnToCaseDetails = page.locator('//button[@class="button"]');
  }

  async submitDocumentForHearingRespondent(
    agreement: string,
    whoseDocu: string,
    docuType: string,
    checkActiveHearing?: boolean,
  ) {
    await expect(this.page.locator('text=Prepare and submit documents for a hearing')).toBeVisible({ timeout: 10000 });
    await this.continueLegalRepButton.click();
    await expect(this.prepareDocPageTwoHeader).toBeVisible({ timeout: 15000 });
    await this.loadingSpinner.waitFor({ state: 'hidden', timeout: 10000 });
    await expect(this.page.locator('text=Have you agreed these documents with the other party?')).toBeVisible();
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    try {
      switch (agreement) {
        case 'Yes':
          await this.prepDecYesOption.click();
          await this.prepareDocContinueButton.click();
          break;
        case 'Agreed':
          await this.prepDocAgreeWithRes.check();
          await this.prepDocAgreeWithResTextField.fill('Testing prep document for hearing -- Agree with Res');
          await this.prepareDocContinueButton.click();
          break;
        case 'NotAgreed':
          await this.prepDocNoAgreement.check();
          await this.prepDocNoAgreementTextField.fill('Testing prep document for hearing -- No agreement');
          await this.prepareDocContinueButton.click();
          break;
        default:
          // ... check your options or add new option
          break;
      }
    } catch (error) {
      console.error('invalid option', error);
    }
    await expect(this.loadingSpinner).toBeVisible({ timeout: 10000 });
    await expect(this.respondentDocOnly).toBeVisible({ timeout: 10000 });
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(this.page.locator('text=About your hearing documents')).toBeVisible();
    if (checkActiveHearing) {
      const options = await this.selectHearingFromDropdown.locator('option');
      const optionsCount = await options.count();
      expect(optionsCount).toBe(2);
      const optionText = await options.nth(1).textContent();
      expect(optionText).toContain('0 Costs Hearing - Leeds ET');
      expect(optionText).not.toContain('1 Costs Hearing - Leeds ET');
    }
    await this.selectHearingFromDropdown.selectOption({ index: 1 });
    // Whose hearing documents are you uploading
    try {
      switch (whoseDocu) {
        case 'Respondent':
          await this.respondentDocOnly.check();
          break;
        case 'Both Parties':
          await this.bothPartiesDoc.check();
          break;
        default:
          // ... check your options or add new option
          break;
      }
    } catch (error) {
      console.error('invalid option', error);
    }
    // What are these documents?
    try {
      switch (docuType) {
        case 'Hearing Document including witness statement':
          await this.hearingDocumentIncludingWitnessStatement.check();
          break;
        case 'Supplementary hearing documents':
          await this.supplementaryHearingDocument.check();
          break;
        case 'Witness statement only':
          await this.witnessStatementOnly.check();
          break;
        default:
          // ... check your options or add new option
          break;
      }
    } catch (error) {
      console.error('invalid option', error);
    }
    await this.continueLegalRepButton.click();
    await this.loadingSpinner.waitFor({ state: 'hidden', timeout: 10000 });
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(this.page.locator('text=Upload your file of documents')).toBeVisible();
    await this.uploadBundleDocument.setInputFiles('playwrighte2e/resources/test_file/welshTest.pdf');
    await this.page.waitForTimeout(10000);
    await this.continueLegalRepButton.click();
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(this.changeDocuUploaded).toBeVisible({ timeout: 10000 });
    await expect(this.page.locator('text=Check the information below carefully.')).toBeVisible();
    await expect(this.page.locator('text=Upload documents for hearing')).toBeVisible();
    await expect(this.page.locator('text=Check your answers')).toBeVisible();
    await this.legalRepSubmit.click();
    await this.closeReturnToCaseDetails.click();
    await this.page.waitForTimeout(10000);
  }
}
