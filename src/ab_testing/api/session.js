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
  setPageView(page) {
    sessionStorage.setItem(this._getPathKey(page), CONSTANTS.Performed);
  }

  getPageView(page) {
    return sessionStorage.getItem(this._getPathKey(page));
  }

  setVariation(test, variation) {
    sessionStorage.setItem(test, variation);
  }
  getVariation(test) {
    return sessionStorage.getItem(test);
  }

  setMetricPerformed(metric) {
    sessionStorage.setItem(metric, CONSTANTS.Performed);
  }

  getMetricPerformed(metric) {
    return sessionStorage.getItem(metric);
  }

  _getPathKey(path) {
    return `visited-path-${path}`;
  }
}
const sessionClient = new Session();

export { sessionClient };
