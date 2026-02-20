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
