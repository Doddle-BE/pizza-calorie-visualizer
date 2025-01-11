import React from "react";
import PizzaSlice from "./pizza-slice";
import PizzaToppings from "./pizza-toppings";

interface PizzaVisualizationProps {
  slices: number;
  maxSlices: number;
}

const PizzaVisualization: React.FC<PizzaVisualizationProps> = ({
  slices,
  maxSlices,
}) => {
  return (
    <div className="relative aspect-square w-full max-w-[500px] mx-auto">
      <div className="absolute inset-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="#FDE68A" stroke="#F59E0B" />
          {Array.from({ length: maxSlices }).map((_, index) => (
            <PizzaSlice key={index} index={index} isFilled={index < slices} />
          ))}
          <PizzaToppings visibleSlices={slices} />
        </svg>
      </div>
    </div>
  );
};

export default PizzaVisualization;
