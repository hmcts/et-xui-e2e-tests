import { ReplacementAction } from '../../types/replacement-action';
import config from '../../config/config';
import { ccdApi } from '../../fixtures/common.fixture.ts';
import { CaseTypeLocation } from '../../config/case-data.ts';

export class CaseDataBuilder {
  private email: string;
  private password: string;
  private payloadPath!: string;
  private caseType: CaseTypeLocation;
  private eventType: string;
  private replacements: ReplacementAction[] = [];

  constructor(caseType: CaseTypeLocation, eventType: string) {
    this.caseType = caseType;
    this.eventType = eventType;
    this.email = config.etCaseWorker.email;
    this.password = config.etCaseWorker.password;
  }

  withCaseWorkerUser(): CaseDataBuilder {
    this.email = config.etCaseWorker.email;
    this.password = config.etCaseWorker.password;
    return this;
  }

  withLegalRepUser(): CaseDataBuilder {
    this.email = config.etLegalRepresentative.email;
    this.password = config.etLegalRepresentative.password;
    return this;
  }

  withPayload(path: string): CaseDataBuilder {
    this.payloadPath = path;
    return this;
  }

  addReplacements(...replacements: ReplacementAction[]): CaseDataBuilder {
    this.replacements.push(...replacements);
    return this;
  }

  async create(): Promise<{ caseId: string; caseNumber: string }> {
    return await ccdApi.createCaseInCcd(
      this.email,
      this.password,
      this.payloadPath,
      this.caseType,
      this.eventType,
      this.replacements,
    );
  }
}
