import { analyticsClient } from '../api/analytics';
import { storageClient } from '../api/storage';
import { CONSTANTS } from '../constants';

export function mapVariations(variationNodes) {
  document.querySelectorAll('[data-test]').forEach((node) => {
    node.style.display = 'none';

    const { variation, track, metric, test } = node.dataset;

    if (typeof track !== 'undefined') {
      node.addEventListener(track, (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (storageClient.getMetricPerformed(metric) === CONSTANTS.Performed) {
          console.log(
            `--> DEBUG: TRACK:Metric "${metric}" already performed by user during this session.`
          );
          return;
        }
        storageClient.setMetricPerformed(metric);
        analyticsClient.trackEvent(node);
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
