import { BasePage } from "./basePage";
import {expect} from "@playwright/test";
import dateUtilComponent from "../utils/DateUtilComponent";

export default class UploadHearingBundlePage extends BasePage {
    futureHearing='#uploadHearingDocumentsSelectPastOrFutureHearing-Future';
    hearingCombo = '#uploadHearingDocumentsSelectFutureHearing';
    claimantRadio= '#uploadHearingDocumentsWhoseDocuments-Claimant';

  async uploadHearingBundleDocuments(){
        await this.webActions.checkElementById(this.futureHearing);
        await this.webActions.selectByOptionFromDropDown(this.hearingCombo, '1: 1');
        await this.addNewButtonClick();
        await this.page.setInputFiles('#uploadHearingDocumentType_0_document',`test/data/welshTest.pdf`);
        await this.webActions.checkElementById(this.claimantRadio);
        await this.webActions.fillField('#uploadHearingDocumentsDateSubmitted-day',dateUtilComponent.getCurrentDateParts().dd);
        await this.webActions.fillField('#uploadHearingDocumentsDateSubmitted-month',dateUtilComponent.getCurrentDateParts().mm);
        await this.webActions.fillField('#uploadHearingDocumentsDateSubmitted-year',dateUtilComponent.getCurrentDateParts().yyyy);
        await this.clickSubmitButton();
  }

  async validateHearingDocument(){
    //TODO
  }

}
