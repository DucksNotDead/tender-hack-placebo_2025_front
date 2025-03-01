export function generateColor(index: number, totalItems: number) {
  const hue = (index / totalItems) * 360; // Распределяем оттенки равномерно по кругу
  return `hsla(${hue}, 70%, 50%, 0.7)`; // HSLA с 50% прозрачностью
}
