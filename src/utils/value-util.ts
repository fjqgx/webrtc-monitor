
function isNumber (value: any): boolean {
  return typeof value === 'number' && isFinite(value);
}


export function getNumberValue (value: any, defaultValue: number): number {
  if (isNumber(value)) {
    return value;
  }
  return defaultValue;
}