import { sessionClient } from '../api/session';

export function showVariation(variationNodes) {
  variationNodes[sessionClient.getVariation()].forEach((node) => {
    node.style.display = null;
  });

  const sheet = document.styleSheets[0];
  for (const i in sheet.cssRules) {
    if (sheet.cssRules[i].selectorText === '[data-variation]') {
      sheet.deleteRule(i);
    }
  }
}
