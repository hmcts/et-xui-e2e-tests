// Interface for Case Events
export interface CaseEvent {
  listItem: string;
  ccdCallback: string;
}

export const Events: Record<string, CaseEvent> = {
  listHearing: {
    listItem: 'List hearing',
    ccdCallback: 'addAmendHearing'
  }
}
