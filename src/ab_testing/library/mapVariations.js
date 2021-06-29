import { analyticsClient } from '../api/analytics';
import { sessionClient } from '../api/session';
import { CONSTANTS } from '../constants';

export function mapVariations(variationNodes) {
  document.querySelectorAll('[data-variation]').forEach((node) => {
    node.style.display = 'none';

    const { variation, track, metric } = node.dataset;

    if (typeof track !== 'undefined') {
      node.addEventListener(track, (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (sessionClient.getMetricPerformed(metric) === CONSTANTS.Performed) {
          console.log(
            `TRACK:Metric "${metric}" already performed by user during this session.`
          );
          return;
        }
        sessionClient.setMetricPerformed(metric);
        analyticsClient.trackEvent(variation, track, metric);
      });
    }

    if (variation === CONSTANTS.Control) {
      variationNodes.control.push(node);
    } else if (variation === CONSTANTS.Test) {
      variationNodes.test.push(node);
    } else {
      console.warn(
        `Unsupported variation type, only "${CONSTANTS.Control}" and "${CONSTANTS.Test}" types are allowed but found "${variation}"`
      );
    }
  });
}
