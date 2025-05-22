/**
 * Clamp utility: returns `clamp(minPx, vw, maxPx)`
 * Example: `fontSize={clamp(16, 1.5, 20)}` returns responsive size
 */
export function clamp(minPx: number, vw: number, maxPx: number) {
  return `clamp(${minPx / 16}rem, ${vw}vw, ${maxPx / 16}rem)`;
}
