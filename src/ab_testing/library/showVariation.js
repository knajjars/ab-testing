import { storageClient } from '../api/storage';

export function showVariation(variationNodes) {
  const tests = Object.keys(variationNodes);

  tests.forEach((test) => {
    const variationForNode = storageClient.getVariation(test);

    variationNodes[test][variationForNode].forEach((node) => {
      node.style.display = null;
    });
  });
}
