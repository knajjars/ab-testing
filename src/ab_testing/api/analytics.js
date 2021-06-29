class Analytics {
  constructor() {
    // Singleton
    if (Analytics.instance instanceof Analytics) {
      return Analytics.instance;
    }
    Object.freeze(this);
    Analytics.instance = this;
  }

  trackEvent(variation, track, metric) {
    console.log(
      `--> Variation: ${variation}, Track: ${track}, Metric: ${metric}`
    );
  }

  trackPageview(params) {
    console.log(`--> Pageview URL: ${params.url}`);
  }
}

const analyticsClient = new Analytics();

export { analyticsClient };
