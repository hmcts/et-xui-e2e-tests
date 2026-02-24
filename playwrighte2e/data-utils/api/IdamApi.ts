import { getUserAuthToken } from './TokenHelperApi.ts';
import config from '../../config/config.ts';
import axios from 'axios';
import { axiosRequest } from './ApiHelper.ts';

const env = config.env;
const idamTestingSupportUrl = `https://idam-testing-support-api.${env}.platform.hmcts.net`;
export class IdamApi {

  private async createCitizenPostRequest(
    authToken: string,
    userEmail: string,
    userPassword: string,
    forename: string = 'ET',
    surname: string = 'Respodent',
  ) {

    let idamUserCreationUrl = idamTestingSupportUrl + '/test/idam/users';

    let data = {
      password: `${userPassword}`,
      user: {
        email: `${userEmail}`,
        forename: `${forename}`,
        surname: `${surname}`,
        displayName: `${forename} ${surname}`,
        roleNames: ['citizen'],
        accountStatus: 'ACTIVE',
        recordType: 'LIVE',
      },
    };

    let apiConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: idamUserCreationUrl,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    return await axiosRequest(apiConfig);
  }

  async createDynamicRespondentUser() {
    const userEmail = `ettestresp${Date.now()}@gmail.com`;
    const userPassword = 'Nagoya0102';
    const authToken = await getUserAuthToken(config.etApiUser.email, config.etApiUser.password);
    await this.createCitizenPostRequest(authToken, userEmail, userPassword);
    return { userEmail, userPassword };
  }

  async createDynamicClaimantUser() {
    const userEmail = `ettestclaimant${Date.now()}@gmail.com`;
    const userPassword = 'Nagoya0102';
    const authToken = await getUserAuthToken(config.etApiUser.email, config.etApiUser.password);
    await this.createCitizenPostRequest(authToken, userEmail, userPassword);
    return { userEmail, userPassword };
  }
}
