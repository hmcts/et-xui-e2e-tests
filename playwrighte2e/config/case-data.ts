// Interface for Case Events
export interface CaseEvent {
  listItem: string;
  ccdCallback: string;
}

export const Events: Record<string, CaseEvent> = {
  listHearing: {
    listItem: 'List Hearing',
    ccdCallback: 'addAmendHearing'
  },
  uploadDocumentsForHearing: {
    listItem: 'Upload documents for hearing',
    ccdCallback: 'bundlesRespondentPrepareDoc'
  },
  refreshSharedUsers: {
    listItem: 'Refresh Shared Users',
    ccdCallback: 'refreshSharedUsers'
  }
}
