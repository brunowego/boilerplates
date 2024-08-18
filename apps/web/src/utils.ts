export function convertToSubcurrency(amount: number, factor = 100): number {
  return Math.round(amount * factor)
}
