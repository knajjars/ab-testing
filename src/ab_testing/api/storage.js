import { CONSTANTS } from '../constants';

class Storage {
  constructor() {
    // Singleton
    if (Storage.instance instanceof Storage) {
      return Storage.instance;
    }
    Object.freeze(this);
    Storage.instance = this;
  }
  setPageView(page) {
    localStorage.setItem(this._getPathKey(page), CONSTANTS.Performed);
  }

  getPageView(page) {
    return localStorage.getItem(this._getPathKey(page));
  }

  setVariation(test, variation) {
    localStorage.setItem(test, variation);
  }
  getVariation(test) {
    return localStorage.getItem(test);
  }

  setMetricPerformed(metric) {
    localStorage.setItem(metric, CONSTANTS.Performed);
  }

  getMetricPerformed(metric) {
    return localStorage.getItem(metric);
  }

  _getPathKey(path) {
    return `visited-path-${path}`;
  }
}
const storageClient = new Storage();

export { storageClient };
