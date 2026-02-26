// Interface for Case Events
export enum CaseTypeLocation {
  EnglandAndWales = 'ET_EnglandWales',
  Scotland = 'ET_Scotland',
}

export const CaseDetailsValues = {
  claimantFirstName: 'Grayson',
  claimantLastName: 'Becker',
  respondentName: 'Mrs Test Auto',
}

export const PayloadPath = {
  CaseWorker: {
    england: './playwrighte2e/resources/payload/caseworker/et-england-case-data-caseworker.json',
    scotland: './playwrighte2e/resources/payload/caseworker/et-scotland-case-data-caseworker.json',
  },
  LegalRep: {
    createEnglandWalesCase: './playwrighte2e/resources/payload/legalRep/et-england-create-case-data.json',
    et1section1: './playwrighte2e/resources/payload/legalRep/et1-claimant-details.json',
    et1Section2: './playwrighte2e/resources/payload/legalRep/et1-employment-respondent-details.json',
    et1Section3: './playwrighte2e/resources/payload/legalRep/et1-claim-details.json',
    et1SubmitClaim: './playwrighte2e/resources/payload/legalRep/et1-submit-claim-details.json',
  },
  events: {
    et1vetting: './playwrighte2e/resources/payload/events/et1Vetting.json',
    acceptCase: './playwrighte2e/resources/payload/events/acceptCase.json',
  },
};

export interface CaseEvent {
  listItem: string;
  ccdCallback: string;
}

export const Events: Record<string, CaseEvent> = {
  createCase: {
    listItem: 'Create Case',
    ccdCallback: 'initiateCase',
  },
  createLegalRepCase: {
    listItem: '',
    ccdCallback: 'et1ReppedCreateCase',
  },
  et1SectionOneClaimantDetails: {
    listItem: 'ET1 Claimant',
    ccdCallback: 'et1SectionOne',
  },
  et1SectionTwoRespondentDetails: {
    listItem: 'ET1 Respondent',
    ccdCallback: 'et1SectionTwo',
  },
  et1SectionThreeClaimDetails: {
    listItem: 'ET1 Claim Details',
    ccdCallback: 'et1SectionThree',
  },
  et1SubmitClaim: {
    listItem: 'ET1 Submit Claim',
    ccdCallback: 'submitEt1Draft',
  },
  et1Vetting: {
    listItem: 'ET1 case vetting',
    ccdCallback: 'et1Vetting',
  },
  acceptRejectCase: {
    listItem: 'Accept/Reject Case',
    ccdCallback: 'preAcceptanceCase',
  },
  listHearing: {
    listItem: 'List Hearing',
    ccdCallback: 'addAmendHearing',
  },
  uploadDocumentsForHearing: {
    listItem: 'Upload documents for hearing',
    ccdCallback: 'bundlesRespondentPrepareDoc',
  },
  refreshSharedUsers: {
    listItem: 'Refresh Shared Users',
    ccdCallback: 'refreshSharedUsers',
  },
  judgment: {
    listItem: 'Judgment',
    ccdCallback: 'addAmendJudgment',
  },
  claimantRepresentative: {
    listItem: 'Claimant Representative',
    ccdCallback: 'addAmendClaimantRepresentative',
  },
};
