import { BasePage } from "./basePage";
import { expect } from "@playwright/test";

export default class NocPage extends BasePage{
  elements={
    nocLink:'[href="/noc"]',
    caseRef:'#caseRef',
    respName:'#respondentName',
    claimantFirstName:'#claimantFirstName',
    claimantLastName:'#claimantLastName',
    confirmDetailsCheckBox:'#affirmation',
    serveNoticeCheckBox:'#notifyEveryParty',

  }

}
