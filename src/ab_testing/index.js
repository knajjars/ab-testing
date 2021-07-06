import { analyticsClient } from './api/analytics';
import { storageClient } from './api/storage';
import { CONSTANTS } from './constants';
import { mapVariations } from './library/mapVariations';
import { setRandomVariation } from './library/setRandomVariation';
import { showVariation } from './library/showVariation';

export function mountAbTesting() {
  if (
    storageClient.getPageView(window.location.pathname) !== CONSTANTS.Performed
  ) {
    storageClient.setPageView(window.location.pathname);
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
}
