import React from "react";
import { seededRandom } from "~/helpers/pizza/utils";

interface PizzaToppingsProps {
  visibleSlices: number;
}

const PizzaToppings: React.FC<PizzaToppingsProps> = ({ visibleSlices }) => {
  const getRandomPizzaPoint = (
    seed: number,
    minRadius: number,
    maxRadius: number,
    sectorIndex: number
  ): [number, number] => {
    const random1 = seededRandom(seed);
    const random2 = seededRandom(seed + 1);
    const sectorStartAngle = sectorIndex * (Math.PI / 4);
    const angle = sectorStartAngle + (random1 * Math.PI) / 4;
    const radius = minRadius + Math.sqrt(random2) * (maxRadius - minRadius);
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    return [Number(x.toFixed(4)), Number(y.toFixed(4))];
  };

  const generatePositionsPerSector = (
    baseCount: number,
    minRadius: number,
    maxRadius: number,
    seedOffset: number
  ) => {
    const positions: [number, number][] = [];
    const itemsPerSector = baseCount;

    for (let sector = 0; sector < 8; sector++) {
      for (let i = 0; i < itemsPerSector; i++) {
        const seed = seedOffset + sector * 100 + i;
        positions.push(getRandomPizzaPoint(seed, minRadius, maxRadius, sector));
      }
    }
    return positions;
  };

  // Sauce splotches (underneath everything)
  const saucePositions = generatePositionsPerSector(4, 10, 45, 3000);

  // More cheese bits with varying sizes
  const cheesePositions = generatePositionsPerSector(4, 15, 45, 2000);
  const smallCheesePositions = generatePositionsPerSector(6, 10, 45, 2500);

  // Pepperoni with varying sizes
  const pepperoniPositions = generatePositionsPerSector(2, 25, 45, 0);
  const smallPepperoniPositions = generatePositionsPerSector(1, 20, 40, 500);

  // Mushrooms
  const mushroomPositions = generatePositionsPerSector(2, 20, 40, 1000);

  // Basil leaves
  const basilPositions = generatePositionsPerSector(1, 15, 42, 4000);

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
        {/* Sauce layer */}
        {saucePositions.map(([x, y], i) => (
          <circle
            key={`sauce-${i}`}
            cx={x}
            cy={y}
            r={4}
            fill="#DC2626"
            opacity="0.3"
          />
        ))}

        {/* Large cheese spots */}
        {cheesePositions.map(([x, y], i) => (
          <circle
            key={`cheese-${i}`}
            cx={x}
            cy={y}
            r={2.5}
            fill="#FCD34D"
            opacity="0.85"
          />
        ))}

        {/* Small cheese spots */}
        {smallCheesePositions.map(([x, y], i) => (
          <circle
            key={`small-cheese-${i}`}
            cx={x}
            cy={y}
            r={1.5}
            fill="#FCD34D"
            opacity="0.75"
          />
        ))}

        {/* Large pepperoni */}
        {pepperoniPositions.map(([x, y], i) => (
          <circle
            key={`pepperoni-${i}`}
            cx={x}
            cy={y}
            r={4}
            fill="#DC2626"
            opacity="0.9"
            className="drop-shadow-sm"
          />
        ))}

        {/* Small pepperoni */}
        {smallPepperoniPositions.map(([x, y], i) => (
          <circle
            key={`small-pepperoni-${i}`}
            cx={x}
            cy={y}
            r={3}
            fill="#DC2626"
            opacity="0.85"
          />
        ))}

        {/* Mushrooms */}
        {mushroomPositions.map(([x, y], i) => (
          <g key={`mushroom-${i}`}>
            <circle cx={x} cy={y} r={2.5} fill="#92400E" opacity="0.8" />
            <circle cx={x} cy={y - 1} r={1.5} fill="#78350F" opacity="0.7" />
          </g>
        ))}

        {/* Basil leaves */}
        {basilPositions.map(([x, y], i) => (
          <path
            key={`basil-${i}`}
            d={`M ${x},${y} c -2,-1 -4,0 -4,2 s 2,3 4,2 s 4,0 4,-2 s -2,-3 -4,-2`}
            fill="#166534"
            opacity="0.8"
            transform={`rotate(${seededRandom(i) * 360}, ${x}, ${y})`}
          />
        ))}
      </g>
    </>
  );
};

export default PizzaToppings;
