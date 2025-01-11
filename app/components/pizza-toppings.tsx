import React from "react";
import { seededRandom } from "~/helpers/pizza/utils";

interface PizzaToppingsProps {
  visibleSlices: number;
}

const PizzaToppings: React.FC<PizzaToppingsProps> = ({ visibleSlices }) => {
  // Generate a random point within a specific sector and ring of the pizza
  const getRandomPizzaPoint = (
    seed: number,
    minRadius: number,
    maxRadius: number,
    sectorIndex: number
  ): [number, number] => {
    const random1 = seededRandom(seed);
    const random2 = seededRandom(seed + 1);

    // Calculate angle within the specific sector (45 degrees = π/4 radians per sector)
    const sectorStartAngle = sectorIndex * (Math.PI / 4);
    const angle = sectorStartAngle + (random1 * Math.PI) / 4;

    // Square root for uniform distribution, then scale to our desired range
    const radius = minRadius + Math.sqrt(random2) * (maxRadius - minRadius);

    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);

    return [Number(x.toFixed(4)), Number(y.toFixed(4))];
  };

  // Generate positions for each topping type, ensuring equal distribution per sector
  const generatePositionsPerSector = (
    baseCount: number,
    minRadius: number,
    maxRadius: number,
    seedOffset: number
  ) => {
    const positions: [number, number][] = [];
    // 2 toppings per sector = 16 total, 3 = 24 total
    const itemsPerSector = baseCount;

    for (let sector = 0; sector < 8; sector++) {
      for (let i = 0; i < itemsPerSector; i++) {
        const seed = seedOffset + sector * 100 + i;
        positions.push(getRandomPizzaPoint(seed, minRadius, maxRadius, sector));
      }
    }
    return positions;
  };

  // 2 pepperoni per sector (16 total)
  const pepperoniPositions = generatePositionsPerSector(2, 30, 45, 0);

  // 2 mushrooms per sector (16 total)
  const mushroomPositions = generatePositionsPerSector(2, 20, 35, 1000);

  // 2 cheese bits per sector (16 total)
  const cheesePositions = generatePositionsPerSector(2, 15, 40, 2000);

  // Create clip paths for visible slices
  const visibleSlicesPath = Array.from({ length: visibleSlices })
    .map((_, i) => {
      const startAngle = i * 45;
      const endAngle = startAngle + 45;
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const x1 = 50 + 50 * Math.cos(startRad);
      const y1 = 50 + 50 * Math.sin(startRad);
      const x2 = 50 + 50 * Math.cos(endRad);
      const y2 = 50 + 50 * Math.sin(endRad);

      return `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;
    })
    .join(" ");

  return (
    <>
      <defs>
        <clipPath id="visibleSlices">
          <path d={visibleSlicesPath} />
        </clipPath>
      </defs>

      <g clipPath="url(#visibleSlices)">
        {pepperoniPositions.map(([x, y], i) => (
          <circle
            key={`pepperoni-${i}`}
            cx={x}
            cy={y}
            r={3.5}
            fill="#EF4444"
            opacity="0.85"
          />
        ))}
        {mushroomPositions.map(([x, y], i) => (
          <circle
            key={`mushroom-${i}`}
            cx={x}
            cy={y}
            r={2.5}
            fill="#92400E"
            opacity="0.7"
          />
        ))}
        {cheesePositions.map(([x, y], i) => (
          <circle
            key={`cheese-${i}`}
            cx={x}
            cy={y}
            r={2}
            fill="#FCD34D"
            opacity="0.75"
          />
        ))}
      </g>
    </>
  );
};

export default PizzaToppings;
