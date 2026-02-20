// @ts-ignore
// @ts-ignore
import querystring from 'querystring';
import config from '../config/config';
import engCase from '../resources/payload/citizen/et-england-case-data.json';
import scotCase from '../resources/payload/citizen/et-scotland-case-data.json';
import axios from 'axios';
import { BasePage } from './basePage';
import { cuiApi } from '../fixtures/common.fixture.ts';
import { CaseTypeLocation } from '../config/case-data.ts';


export default class CreateCaseThroughApi extends BasePage {

  async processCuiCaseToAcceptedState() {
    // Create a draft case
    const case_id = await cuiApi.initiateCuiCase(config.etClaimant.email, config.etClaimant.password, CaseTypeLocation.EnglandAndWales);
    console.log('case Id is:' + case_id);

    // Update and submit the draft case
    const updateResponse = await cuiApi.updateDraftCuiCase(
      config.etClaimant.email,
      config.etClaimant.password,
      case_id,
      CaseTypeLocation.EnglandAndWales
    );
    console.log('CUI case updated successfully:' + updateResponse.id);

    const submitResponse = await cuiApi.submitDraftCuiCase(
      config.etClaimant.email,
      config.etClaimant.password,
      case_id,
      CaseTypeLocation.EnglandAndWales,
    );
    console.log('CUI case submitted successfully:' + submitResponse.id);
    return case_id;
  }

}
