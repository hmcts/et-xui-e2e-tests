import { BasePage } from './basePage';
import dateUtilComponent from '../data-utils/DateUtilComponent';
import { CommonActionsHelper } from './helpers/CommonActionsHelper.ts';
import { Page } from '@playwright/test';

export default class UploadHearingBundlePage extends BasePage {
  private readonly commonActionsHelper: CommonActionsHelper;
  futureHearing = '#uploadHearingDocumentsSelectPastOrFutureHearing-Future';
  hearingCombo = '#uploadHearingDocumentsSelectFutureHearing';
  claimantRadio = '#uploadHearingDocumentsWhoseDocuments-Claimant';

  constructor(page: Page, commonActionsHelper: CommonActionsHelper) {
    super(page);
    this.commonActionsHelper = commonActionsHelper;
  }

  async uploadHearingBundleDocuments() {
    await this.webActions.checkElementById(this.futureHearing);
    await this.webActions.selectByOptionFromDropDown(this.hearingCombo, '1: 1');
    await this.addNewButtonClick();
    await this.commonActionsHelper.uploadWithRateLimitRetry(this.page, this.page.locator('#uploadHearingDocumentType_0_document'), `test/data/welshTest.pdf`);
    const whatHearingDocument = this.page.locator(`#uploadHearingDocumentType_0_type`);
    await whatHearingDocument.getByRole('radio', { name: 'Hearing Bundle' }).check();

    await this.webActions.checkElementById(this.claimantRadio);
    await this.webActions.fillField(
      '#uploadHearingDocumentsDateSubmitted-day',
      dateUtilComponent.getCurrentDateParts().dd,
    );
    await this.webActions.fillField(
      '#uploadHearingDocumentsDateSubmitted-month',
      dateUtilComponent.getCurrentDateParts().mm,
    );
    await this.webActions.fillField(
      '#uploadHearingDocumentsDateSubmitted-year',
      dateUtilComponent.getCurrentDateParts().yyyy,
    );
    await this.page.waitForLoadState('load');
    await this.clickSubmitButton();
    await this.page.waitForLoadState('load');
  }

  async validateHearingDocument() {
    //TODO
  }
}
