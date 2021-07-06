import { storageClient } from '../api/storage';
import { CONSTANTS } from '../constants';

export function setRandomVariation(variationNodes) {
  const tests = Object.keys(variationNodes);

  tests.forEach((test) => {
    variationNodes[test].control.forEach((node) => {
      const { weight, variation: nodeVariation, test } = node.dataset;

      if (storageClient.getVariation(test) !== null) {
        return;
      }

      let variation = nodeVariation;
      const rollResult = Math.random() * 100;

      if (rollResult > weight) {
        variation =
          nodeVariation === CONSTANTS.Test ? CONSTANTS.Control : CONSTANTS.Test;
      }
      storageClient.setVariation(test, variation);

      console.log(
        `--> DEBUG: Variation selected: Test: ${test}, Variation: ${variation}`
      );
    });
  });
}
