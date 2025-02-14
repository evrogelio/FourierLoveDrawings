import { svgPathProperties } from "svg-path-properties";
import type { Point } from "svg-path-properties/dist/types/types";

export function convertPathToComplexCoordinates(path: string, resolution: number, size: number = 500) {
  const points: { x: number, y: number }[] = [];
  const properties = new svgPathProperties(path);
  const totalLength = properties.getTotalLength();
  const scale = totalLength / (resolution - 1)
  for (let i = 0; i < resolution; i++) {
    const distance = i * scale;
    points.push(properties.getPointAtLength(distance))
  }
  return normalizePoints(points, size);
}

function getBoundingBox(points: Point[]) {
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  for (const { x, y } of points) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return { minX, maxX, minY, maxY };
}

export function normalizePoints(points: Point[], targetSize = 500, center = true) {
  const { minX, maxX, minY, maxY } = getBoundingBox(points);
  const width = maxX - minX;
  const height = maxY - minY;

  if (width === 0 || height === 0) return points;

  const scale = targetSize / Math.max(width, height);
  const offsetX = center ? (minX + width / 2) : minX;
  const offsetY = center ? (minY + height / 2) : minY;

  // transform
  const newPoints = points.map(({ x, y }) => {
    const shiftedX = x - offsetX;
    const shiftedY = y - offsetY;
    return {
      x: shiftedX * scale,
      y: shiftedY * scale
    };
  });

  return newPoints;
}
