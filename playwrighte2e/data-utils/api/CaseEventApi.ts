import { ReplacementAction } from '../../types/replacement-action.ts';
import { ccdApi } from '../../fixtures/common.fixture.ts';
import config from '../../config/config.ts';
import { CaseTypeLocation, Events, PayloadPath } from '../../config/case-data.ts';
import DateUtilComponent from '../DateUtilComponent.ts';

export class CaseEventApi {
  /**
   * Updates a case for a caseworker by performing a sequence of steps (events) on the case.
   * Each step can specify an event, an optional payload, and optional replacement actions.
   *
   * @param caseId - The ID of the case to update.
   * @param caseTypeLocation - The case type location (e.g., EnglandAndWales, Scotland).
   * @param steps - An array of steps, each containing an event, optional payload, and optional replacements.
   * @returns {Promise<any>} The response from the last update step.
   * @private
   */
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

  /**
   * Updates a case for a legal representative by performing a sequence of steps (events) on the case.
   * Each step can specify an event, an optional payload, and optional replacement actions.
   *
   * @param caseId - The ID of the case to update.
   * @param caseTypeLocation - The case type location (e.g., EnglandAndWales, Scotland).
   * @param steps - An array of steps, each containing an event, optional payload, and optional replacements.
   * @returns {Promise<any>} The response from the last update step.
   * @private
   */
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

  /**
   * Performs vetting and acceptance of an England and Wales case as a caseworker.
   * This includes running the ET1 vetting event and then accepting the case with the current date.
   *
   * @param caseId - The ID of the case to process.
   * @returns {Promise<any>} The response from the last update step.
   */
  static async caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId: string): Promise<any> {
    return await this.updateCaseWorkerSteps(caseId, CaseTypeLocation.EnglandAndWales, [
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

  /**
   * Performs vetting and acceptance of a Scotland case as a caseworker.
   * This includes running the ET1 vetting event and then accepting the case with the current date.
   *
   * @param caseId - The ID of the case to process.
   * @returns {Promise<any>} The response from the last update step.
   */
  static async caseWorkerDoesEt1VettingAndAcceptCaseScotland(caseId: string): Promise<any> {
    return await this.updateCaseWorkerSteps(caseId, CaseTypeLocation.Scotland, [
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
