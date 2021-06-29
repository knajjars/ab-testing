import { sessionClient } from '../api/session';

export function setRandomVariation(variationNodes) {
  const keys = Object.keys(variationNodes);
  const variation = keys[Math.floor(Math.random() * keys.length)];

  sessionClient.setVariation(variation);
}
