import { analyticsClient } from './api/analytics';
import { sessionClient } from './api/session';
import { CONSTANTS } from './constants';
import { mapVariations } from './library/mapVariations';
import { setRandomVariation } from './library/setRandomVariation';
import { showVariation } from './library/showVariation';

export function mountAbTesting() {
  if (sessionClient.getPageView() !== CONSTANTS.Performed) {
    sessionClient.setPageView();
    analyticsClient.trackPageview({ url: window.location.href });
  } else {
    console.log(
      `TRACK:PageView already performed by user during this session.`
    );
  }

  const variationNodes = {
    control: [],
    test: [],
  };

  mapVariations(variationNodes);

  if (sessionClient.getVariation() === null) {
    setRandomVariation(variationNodes);
  }

  showVariation(variationNodes);

  console.log(`Variation selected: ${sessionClient.getVariation()}`);
}
