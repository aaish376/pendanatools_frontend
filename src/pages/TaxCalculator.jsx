import React, { useState } from "react";

export default function TaxCalculator() {
  const [salary, setSalary] = useState("");
  const [year, setYear] = useState("2025-2026");
  const [result, setResult] = useState(null);

  const calculateTax = () => {
    const monthly = parseFloat(salary);
    if (!monthly || monthly <= 0) return;

    const yearlyIncome = monthly * 12;
    let yearlyTax = 0;

    if (year === "2025-2026") {
      if (yearlyIncome <= 600000) {
        yearlyTax = 0;
      } else if (yearlyIncome <= 1200000) {
        yearlyTax = (yearlyIncome - 600000) * 0.01;
      } else if (yearlyIncome <= 2200000) {
        yearlyTax = 6000 + (yearlyIncome - 1200000) * 0.11;
      } else if (yearlyIncome <= 3200000) {
        yearlyTax = 116000 + (yearlyIncome - 2200000) * 0.23;
      } else if (yearlyIncome <= 4100000) {
        yearlyTax = 346000 + (yearlyIncome - 3200000) * 0.30;
      } else {
        yearlyTax = 616000 + (yearlyIncome - 4100000) * 0.35;
        if (yearlyIncome > 10000000) {
          yearlyTax += yearlyTax * 0.09; // 9% surcharge
        }
      }
    }

    const monthlyTax = yearlyTax / 12;
    const salaryAfterTax = monthly - monthlyTax;
    const yearlyAfterTax = yearlyIncome - yearlyTax;

    setResult({
      monthlyIncome: monthly,
      monthlyTax,
      salaryAfterTax,
      yearlyIncome,
      yearlyTax,
      yearlyAfterTax,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Pakistan Income Tax Calculator (2025-2026)
      </h1>

      {/* Input Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <input
          type="number"
          placeholder="Enter Monthly Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        >
          <option value="2025-2026">2025-2026</option>
          {/* <option value="2024-2025">2024-2025</option> */}
        </select>
        <button
          onClick={calculateTax}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Calculate Tax
        </button>
      </div>

      {/* Result Section */}
      {result && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-10">
          <h2 className="text-xl font-bold mb-4 text-blue-600">Results</h2>
          <p>Monthly Income: <b>{result.monthlyIncome.toFixed(0)}</b></p>
          <p>Monthly Tax: <b>{result.monthlyTax.toFixed(0)}</b></p>
          <p>Salary After Tax: <b>{result.salaryAfterTax.toFixed(0)}</b></p>
          <p>Yearly Income: <b>{result.yearlyIncome.toFixed(0)}</b></p>
          <p>Yearly Tax: <b>{result.yearlyTax.toFixed(0)}</b></p>
          <p>Yearly Income After Tax: <b>{result.yearlyAfterTax.toFixed(0)}</b></p>
        </div>
      )}

      {/* Tax Slabs Section */}
      <div className="bg-white shadow-md p-6 rounded-lg mb-10">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">
          Tax Slabs (2025-2026)
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Up to Rs. 600,000 → <b>0%</b></li>
          <li>600,001 – 1,200,000 → <b>1% of excess over 600,000</b></li>
          <li>1,200,001 – 2,200,000 → <b>Rs. 6,000 + 11% of excess</b></li>
          <li>2,200,001 – 3,200,000 → <b>Rs. 116,000 + 23% of excess</b></li>
          <li>3,200,001 – 4,100,000 → <b>Rs. 346,000 + 30% of excess</b></li>
          <li>Above 4,100,000 → <b>Rs. 616,000 + 35% of excess</b></li>
          <li>Above 10 million → <b>+ 9% surcharge</b></li>
        </ul>
      </div>

      {/* Blog Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">About Tax in Pakistan</h2>
        <p className="mb-3">
          <b>What is Tax?</b> Tax is a compulsory contribution by individuals and businesses to the government. It helps fund public services like education, healthcare, defense, and infrastructure.
        </p>
        <p className="mb-3">
          <b>Why is Tax Necessary?</b> Taxes are the backbone of Pakistan’s economy. They allow the government to pay salaries of teachers, doctors, soldiers, and to maintain law, order, and development projects.
        </p>
        <p className="mb-3">
          <b>Benefits of Paying Tax in Pakistan:</b>
          <ul className="list-disc pl-6">
            <li>Better roads, schools, and hospitals</li>
            <li>Funding for defense and security</li>
            <li>Social welfare programs like BISP</li>
            <li>Improved electricity, gas, and water supply</li>
          </ul>
        </p>
        <p className="mb-3">
          <b>Disadvantages & Challenges:</b>
          <ul className="list-disc pl-6">
            <li>Poor tax collection system</li>
            <li>Corruption and misuse of tax money</li>
            <li>Only a small percentage of people pay income tax</li>
            <li>Lack of trust in government spending</li>
          </ul>
        </p>
        <p>
          <b>Conclusion:</b> If more Pakistanis pay taxes honestly, the country can reduce foreign loans, improve public services, and strengthen the economy.
        </p>
      </div>
    </div>
  );
}
