import { BaseApi, FetchRequestInit } from './base-api';

export class ActuatorApi extends BaseApi {
  constructor() {
    super({ apiPrefix: '/actuator', prependSlashApi: false });
  }

  health({ fetchInit }: { fetchInit?: FetchRequestInit } = {}) {
    return super.get({
      fetchInput: '/health',
      fetchInit,
    });
  }
}
