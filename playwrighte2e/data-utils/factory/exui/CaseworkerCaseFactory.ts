import { CaseDataBuilder } from '../CaseDataBuilder.ts';
import { CaseTypeLocation, Events, PayloadPath } from '../../../config/case-data.ts';
import { CaseEventApi } from '../../api/CaseEventApi.ts';

export class CaseworkerCaseFactory {
  static async createEnglandWalesCase() {
    return await new CaseDataBuilder(CaseTypeLocation.EnglandAndWales, Events.createCase.ccdCallback)
      .withCaseWorkerUser()
      .withPayload(PayloadPath.CaseWorker.england)
      .create();
  }

  static async createScotlandCase() {
    return await new CaseDataBuilder(CaseTypeLocation.Scotland, Events.createCase.ccdCallback)
      .withCaseWorkerUser()
      .withPayload(PayloadPath.CaseWorker.scotland)
      .create();
  }

  static async createEnglandCaseAndAcceptCase() {
    const {caseId, caseNumber} = await this.createEnglandWalesCase();
    await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId);
    return { caseId, caseNumber };
  }
}
