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
      `--> DEBUG: TrackEvent Variation: ${variation}, Track: ${track}, Metric: ${metric}`
    );
  }

  trackPageview(pathname) {
    console.log(`--> DEBUG: Pageview URL: ${pathname}`);
  }
}

const analyticsClient = new Analytics();

export { analyticsClient };
