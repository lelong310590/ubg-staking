import Axios, { AxiosError } from 'axios';

import { getEnv } from '../../AppConfigs';
import { getLocaleKey, translate } from '../../AppLanguages';
import { ObjectUtils } from '../../modules/utils';

export class RequestError extends Error {
  status: number; message: string; errors: { [field: string]: string }; error: any;

  constructor(error: AxiosError) {
    super(error as any);
    this.message = ObjectUtils.getIn(error, 'response.data.message',
      translate('unknown-error-from-the-system'),
      (message: string) => translate(message)
    );
    this.errors = ObjectUtils.getIn(error, 'response.data.errors', {});
    this.status = ObjectUtils.getIn(error, 'response.status', 3001);

    // Handle axios error
    if (error.code === 'ECONNABORTED' || error.message === "Network Error") this.message = translate('network-error');
    else if (error.response && typeof error.response.data === 'string') this.message = error.response.data;

    this.error = {
      message: this.message,
      errors: this.errors,
      status: this.status
    }
  }
}

export class RequestMainService {
  static getURL(subURL: string) { return `${getEnv('API_URL_MAIN')}${subURL}` }

  static getConfigs(params = {}) {
    return {
      params: Object.assign(ObjectUtils.cleanObj(params), {}),
      timeout: 20000,
      headers: ObjectUtils.cleanObj({
        'Accept-Language': getLocaleKey(),
      })
    }
  }

  static async get(subURL: string, params = {}) {
    return Axios.get(this.getURL(subURL), this.getConfigs(params))
      .then(res => res.data)
      .catch(err => {
        throw new RequestError(err)
      });
  }

  static async post(subURL: string, payload = {}) {
    return Axios.post(this.getURL(subURL), payload, this.getConfigs())
      .then(res => res.data)
      .catch(err => {
        throw new RequestError(err)
      });
  }

  static async put(subURL: string, payload = {}) {
    return Axios.put(this.getURL(subURL), payload, this.getConfigs())
      .then(res => res.data)
      .catch(err => {
        throw new RequestError(err)
      });
  }

  static async delete(subURL: string) {
    return Axios.delete(this.getURL(subURL), this.getConfigs())
      .then(res => res.data)
      .catch(err => {
        throw new RequestError(err)
      });
  }
}