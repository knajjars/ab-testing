import { analyticsClient } from '../api/analytics';
import { sessionClient } from '../api/session';
import { CONSTANTS } from '../constants';

export function mapVariations(variationNodes) {
  document.querySelectorAll('[data-test]').forEach((node) => {
    node.style.display = 'none';

    const { variation, track, metric, test } = node.dataset;

    if (typeof track !== 'undefined') {
      node.addEventListener(track, (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (sessionClient.getMetricPerformed(metric) === CONSTANTS.Performed) {
          console.log(
            `--> DEBUG: TRACK:Metric "${metric}" already performed by user during this session.`
          );
          return;
        }
        sessionClient.setMetricPerformed(metric);
        analyticsClient.trackEvent(variation, track, metric);
      });
    }

    if (typeof variationNodes[test] === 'undefined') {
      variationNodes[test] = {
        control: [],
        test: [],
      };
    }
    variationNodes[test][variation].push(node);
  });
}
