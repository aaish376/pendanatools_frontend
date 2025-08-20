import React, { useState } from "react";
// import { X } from "lucide-react"; // lightweight icon

const ElectricUnitCalculator = () => {
  const [appliances, setAppliances] = useState([
    { name: "", watts: "", hours: "", units: 0 },
  ]);

  const handleChange = (index, field, value) => {
    const newAppliances = [...appliances];
    newAppliances[index][field] = value;

    // calculate units (Watts × Hours / 1000)
    const watts = parseFloat(newAppliances[index].watts) || 0;
    const hours = parseFloat(newAppliances[index].hours) || 0;
    newAppliances[index].units = (watts * hours) / 1000;

    setAppliances(newAppliances);
  };

  const addAppliance = () => {
    setAppliances([
      ...appliances,
      { name: "", watts: "", hours: "", units: 0 },
    ]);
  };

  const totalUnits = appliances.reduce((sum, item) => sum + item.units, 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl transition-all duration-500">
        {/* Title & Add Button in same line */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600">
            ⚡ Electric Unit Calculator
          </h1>
          <button
            onClick={addAppliance}
            className="mt-3 sm:mt-0 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
          >
            ➕ Add Appliance
          </button>
        </div>

        {/* Column Names */}
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 w-full font-semibold text-black text-center mb-4 px-2">
          <span>Appliance</span>
          <span>Watts</span>
          <span>Hours</span>
          <span>Units (kWh)</span>
          <span className="hidden sm:block">Action</span>
        </div>

        {/* Appliance Rows */}
        {appliances.map((appliance, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center bg-white border rounded-xl p-4 mb-3 shadow hover:shadow-lg transition duration-300"
          >
            <input
              type="text"
              placeholder="Name"
              value={appliance.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              placeholder="Watts"
              value={appliance.watts}
              onChange={(e) => handleChange(index, "watts", e.target.value)}
              className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              placeholder="Hours"
              value={appliance.hours}
              onChange={(e) => handleChange(index, "hours", e.target.value)}
              className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400"
            />
            <div className="text-center font-semibold text-black">
              {appliance.units.toFixed(2)}
            </div>
            <button
              onClick={() =>
                setAppliances(appliances.filter((_, i) => i !== index))
              }
              className="flex items-center justify-center bg-red-500 text-white p-2 rounded-full shadow hover:bg-red-600 hover:scale-110 transition duration-300 w-8 h-8 mx-auto"
            >
              {/* <X size={16} /> */}x
            </button>
          </div>
        ))}

        {/* Total Units */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600">
            Total Units Consumed:{" "}
            <span className="text-black">{totalUnits.toFixed(2)} kWh</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ElectricUnitCalculator;
