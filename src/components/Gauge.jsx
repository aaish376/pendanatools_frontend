import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

export const Gauge = ({ value, category, message, adjustment }) => {
  const stops = [0, 16, 18.5, 25, 30, 35, 50];

  return (
    <div className="w-full max-w-md relative flex flex-col items-center">
      <ReactSpeedometer
        maxValue={50}
        value={value || 0}
        segments={stops.length - 1}
        customSegmentStops={stops}
        segmentColors={[
          "#b30000", // 0-16 Severely Underweight
          "#fbdf0e", // 16-18.5 Underweight
          "#00b300", // 18.5-25 Normal
          "#fbdf0e", // 25-30 Overweight
          "#cc3300", // 30-35 Obese I
          "#800000", // 35-50 Obese II
        ]}
        needleColor="#000000"
        ringWidth={40}
        currentValueText={`BMI = ${value || 0}`}
        textColor="#000000"
        needleTransitionDuration={3000}
        needleTransition="easeElastic"
        width={400}
        height={250}
      />

      {/* 👇 Custom text below gauge */}
      {value && (
        <div className="text-center mt-2">
          <p className="text-lg font-bold text-blue-600">{category}</p>
          <p className="text-sm mt-1 text-gray-700 italic">{message}</p>
          {adjustment && (
            <p className="text-sm mt-1 text-red-600 font-medium">{adjustment}</p>
          )}
        </div>
      )}
    </div>
  );
};
