import { analyticsClient } from './api/analytics';
import { sessionClient } from './api/session';
import { CONSTANTS } from './constants';
import { mapVariations } from './library/mapVariations';
import { setRandomVariation } from './library/setRandomVariation';
import { showVariation } from './library/showVariation';

export function mountAbTesting() {
  if (
    sessionClient.getPageView(window.location.pathname) !== CONSTANTS.Performed
  ) {
    sessionClient.setPageView(window.location.pathname);
    analyticsClient.trackPageview(window.location.pathname);
  } else {
    console.log(
      `--> DEBUG: TRACK:${window.location.pathname} already performed by user during this session.`
    );
  }

  const variationNodes = {};
  mapVariations(variationNodes);
  setRandomVariation(variationNodes);
  showVariation(variationNodes);

  console.log(`--> DEBUG: Variation selected: ${sessionClient.getVariation()}`);
}
