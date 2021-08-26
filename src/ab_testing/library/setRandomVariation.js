import { storageClient } from '../api/storage';
import { CONSTANTS } from '../constants';

export function setRandomVariation(variationNodes) {
  const tests = Object.keys(variationNodes);

  tests.forEach((test) => {
    variationNodes[test].control.forEach((node) => {
      const { weight, variation: nodeVariation, test } = node.dataset;

      let variation;
      const hasWeight = typeof weight !== 'undefined';

      if (storageClient.getVariation(test) !== null) {
        return;
      }

      const rollResult = Math.random() * 100;

      variation = hasWeight
        ? getWeightRoll(rollResult, weight, nodeVariation)
        : getDefaultRoll(rollResult);

      storageClient.setVariation(test, variation);
      console.log(
        `--> DEBUG: Variation selected: Test: ${test}, Variation: ${variation}`
      );
    });
  });
}

function getWeightRoll(rollResult, weight, nodeVariation) {
  let variation = nodeVariation;
  if (rollResult > weight) {
    variation =
      nodeVariation === CONSTANTS.Test ? CONSTANTS.Control : CONSTANTS.Test;
  }

  return variation;
}

function getDefaultRoll(rollResult) {
  return rollResult > 50 ? CONSTANTS.Control : CONSTANTS.Test;
}
