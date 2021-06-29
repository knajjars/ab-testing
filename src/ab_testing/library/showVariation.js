import { sessionClient } from '../api/session';

export function showVariation(variationNodes) {
  variationNodes[sessionClient.getVariation()].forEach((node) => {
    node.style.display = null;
  });
}
