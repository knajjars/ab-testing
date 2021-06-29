import { CONSTANTS } from '../constants';

class Session {
  constructor() {
    // Singleton
    if (Session.instance instanceof Session) {
      return Session.instance;
    }
    Object.freeze(this);
    Session.instance = this;
  }
  setPageView() {
    sessionStorage.setItem(CONSTANTS.PageView, CONSTANTS.Performed);
  }

  getPageView() {
    return sessionStorage.getItem(CONSTANTS.PageView);
  }

  setVariation(value) {
    sessionStorage.setItem(CONSTANTS.Variation, value);
  }

  getVariation() {
    return sessionStorage.getItem(CONSTANTS.Variation);
  }

  setMetricPerformed(metric) {
    sessionStorage.setItem(metric, CONSTANTS.Performed);
  }

  getMetricPerformed(metric) {
    return sessionStorage.getItem(metric);
  }
}
const sessionClient = new Session();

export { sessionClient };
