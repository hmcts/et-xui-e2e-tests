import { ReplacementAction } from '../../types/replacement-action.ts';
import { ccdApi } from '../../fixtures/common.fixture.ts';
import config from '../../config/config.ts';
import { CaseTypeLocation, Events, PayloadPath } from '../../config/case-data.ts';
import DateUtilComponent from '../DateUtilComponent.ts';

export class CaseEventApi {
  private static async updateCaseWorkerSteps(
    caseId: string,
    caseTypeLocation: CaseTypeLocation,
    steps: { event: string; payload?: string; replacements?: ReplacementAction[] }[],
  ): Promise<any> {
    let response;
    for (const step of steps) {
      response = await ccdApi.updateCaseInCcd(
        config.etCaseWorker.email,
        config.etCaseWorker.password,
        caseId,
        caseTypeLocation,
        step.event,
        step.payload || '',
        step.replacements || [],
      );
    }
    return response;
  }

  private static async updateLegalRepSteps(
    caseId: string,
    caseTypeLocation: CaseTypeLocation,
    steps: { event: string; payload?: string; replacements?: ReplacementAction[] }[],
  ): Promise<any> {
    let response;
    for (const step of steps) {
      response = await ccdApi.updateCaseInCcd(
        config.etLegalRepresentative.email,
        config.etLegalRepresentative.password,
        caseId,
        caseTypeLocation,
        step.event,
        step.payload || '',
        step.replacements || [],
      );
    }
    return response;
  }

  static async caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId: string) {
    await this.updateCaseWorkerSteps(caseId, CaseTypeLocation.EnglandAndWales, [
      { event: Events.et1Vetting.ccdCallback, payload: PayloadPath.events.et1vetting },
      {
        event: Events.acceptRejectCase.ccdCallback,
        payload: PayloadPath.events.acceptCase,
        replacements: [
          { action: 'delete', key: 'preAcceptCase.dateAccepted' },
          { action: 'insert', key: 'preAcceptCase.dateAccepted', value: DateUtilComponent.getCurrentDate() },
        ],
      },
    ]);
  }
}
