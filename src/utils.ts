/**
 * Utility function to validate type
 */
export function checkType(source: Object): void {
  if (!source) {
    throw new TypeError('Invalid type requested to IoC ' +
      'container. Type is not defined.');
  }
}
