import React from "react";
import { getSlicePath } from "~/helpers/pizza/utils";

interface PizzaSliceProps {
  index: number;
  isFilled: boolean;
}

const PizzaSlice: React.FC<PizzaSliceProps> = ({ index, isFilled }) => {
  const slicePath = getSlicePath(index);
  const sliceNumber = index + 1;

  return (
    <g role="group" aria-label={`Slice ${sliceNumber}`}>
      <path
        d={slicePath}
        className={`transition-all duration-300 ${
          isFilled ? "hover:brightness-105" : ""
        }`}
        fill={isFilled ? "#FEF3C7" : "none"}
        stroke={isFilled ? "#FB923C" : "#FED7AA"}
        strokeWidth={isFilled ? "1.5" : "1"}
        strokeDasharray={isFilled ? "none" : "4 2"}
        aria-hidden={!isFilled}
      />
    </g>
  );
};

export default PizzaSlice;
