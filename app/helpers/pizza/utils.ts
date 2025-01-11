export const getSlicePath = (index: number): string => {
  const radius = 50;
  const startAngle = index * 45;
  const endAngle = startAngle + 45;

  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;

  const x1 = radius + radius * Math.cos(startRad);
  const y1 = radius + radius * Math.sin(startRad);
  const x2 = radius + radius * Math.cos(endRad);
  const y2 = radius + radius * Math.sin(endRad);

  return `M ${radius} ${radius} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
};

// Helper function to get a random number within a range
export const getRandomInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

// Helper function to get a point within a slice sector
export const getPointInSliceSector = (
  sliceIndex: number,
  minRadius: number,
  maxRadius: number,
  randomValue: number
): [number, number] => {
  const startAngle = (sliceIndex * 45 * Math.PI) / 180;
  const randomAngle = startAngle + (randomValue * 45 * Math.PI) / 180;
  const randomRadius = minRadius + randomValue * (maxRadius - minRadius);

  // Round to 4 decimal places to ensure consistency
  const x = Number((50 + randomRadius * Math.cos(randomAngle)).toFixed(4));
  const y = Number((50 + randomRadius * Math.sin(randomAngle)).toFixed(4));

  return [x, y];
};

// Update seededRandom to also return fixed precision
export const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return Number((x - Math.floor(x)).toFixed(4));
};
