import { CaseDataBuilder } from '../CaseDataBuilder.ts';
import { CaseTypeLocation, Events, PayloadPath } from '../../../config/case-data.ts';
import { CaseEventApi } from '../../api/CaseEventApi.ts';
import { ReplacementAction } from '../../../types/replacement-action.ts';

export class CaseworkerCaseFactory {

  private static replacements: ReplacementAction[] = [
    { action: 'delete', key: 'claimantIndType.claimant_first_names' },
    { action: 'insert', key: 'claimantIndType.claimant_first_names', value: 'Grayson' },
    { action: 'delete', key: 'claimantIndType.claimant_last_name' },
    { action: 'insert', key: 'claimantIndType.claimant_last_name', value: 'Becker' },
    { action: 'delete', key: 'respondentCollection[0].value.respondent_name' },
    { action: 'insert', key: 'respondentCollection[0].value.respondent_name', value: 'Mrs Test Auto' },
  ];

  static async createEnglandWalesCase() {
    return await new CaseDataBuilder(CaseTypeLocation.EnglandAndWales, Events.createCase.ccdCallback)
      .withCaseWorkerUser()
      .withPayload(PayloadPath.CaseWorker.england)
      .addReplacements(...this.replacements)
      .create();
  }

  static async createScotlandCase() {
    return await new CaseDataBuilder(CaseTypeLocation.Scotland, Events.createCase.ccdCallback)
      .withCaseWorkerUser()
      .withPayload(PayloadPath.CaseWorker.scotland)
      .addReplacements(...this.replacements)
      .create();
  }

  static async createEnglandAndAcceptCase() {
    const { caseId, caseNumber } = await this.createEnglandWalesCase();
    await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId);
    return { caseId, caseNumber };
  }

  static async createScotlandAndAcceptCase() {
    const { caseId, caseNumber } = await this.createScotlandCase();
    await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseScotland(caseId);
    return { caseId, caseNumber };
  }
}
