export function generateColor(index: number, totalItems: number) {
  const hue = (index / totalItems) * 360;
  return `hsla(${hue}, 70%, 50%, 0.7)`;
}
