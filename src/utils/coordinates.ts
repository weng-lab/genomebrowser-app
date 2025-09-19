import { Domain } from "@weng-lab/genomebrowser";

/**
 * Expand the coordinates by 25%
 * @param coordinates - The coordinates to expand
 * @returns The expanded coordinates
 */
export function expandCoordinates(coordinates: Domain) {
  let length = coordinates.end - coordinates.start;
  if (length <= 100) {
    length = 100;
  }
  const padding = Math.floor(length * 0.25);
  return {
    chromosome: coordinates.chromosome,
    start: coordinates.start - padding,
    end: coordinates.end + padding,
  } as Domain;
}
