import { sessionClient } from '../api/session';

export function showVariation(variationNodes) {
  const tests = Object.keys(variationNodes);

  tests.forEach((test) => {
    const variationForNode = sessionClient.getVariation(test);

    variationNodes[test][variationForNode].forEach((node) => {
      node.style.display = null;
    });
  });
}
