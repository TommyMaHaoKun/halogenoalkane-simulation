// Quadratic Bézier arc between two points, bowed perpendicular to the chord.
// `bend` > 0 bows one way, < 0 the other. Used to draw curly / fishhook arrows.
export function arc(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  bend: number
): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  // perpendicular unit vector
  const px = -dy / len;
  const py = dx / len;
  const cx = mx + px * bend;
  const cy = my + py * bend;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

// Approximate path length of the quadratic arc (for stroke-dash draw-on animation).
export function arcLength(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  bend: number
): number {
  const chord = Math.hypot(x2 - x1, y2 - y1);
  return chord + Math.abs(bend) * 1.6;
}
