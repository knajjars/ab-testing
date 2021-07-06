class Analytics {
  constructor() {
    // Singleton
    if (Analytics.instance instanceof Analytics) {
      return Analytics.instance;
    }
    Object.freeze(this);
    Analytics.instance = this;
  }

  trackEvent(node) {
    const { variation, track, metric, test } = node.dataset;
    console.log(
      `--> DEBUG: TrackEvent Variation: ${variation}, Track: ${track}, Metric: ${metric}, Test: ${test}`
    );
  }

  trackPageview(pathname) {
    console.log(`--> DEBUG: Pageview URL: ${pathname}`);
  }
}

const analyticsClient = new Analytics();

export { analyticsClient };
