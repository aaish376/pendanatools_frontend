import React, { useState } from 'react';


function BMICalculator() {
  const [age, setAge] = useState('');

  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [bmi, setBmi] = useState(null);
  const [angle, setAngle] = useState(0);
  const [message, setMessage] = useState('');
  const [weightSuggestion, setWeightSuggestion] = useState('');

  const calculateBMI = () => {
    const heightInMeters = ((+feet * 12 + +inches) * 0.0254).toFixed(2);
    const bmiVal = (weightKg / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiVal);
    setGaugeAngle(bmiVal);
    handleMessage(bmiVal);
    suggestWeight(bmiVal, heightInMeters);
  };

  const setGaugeAngle = (bmi) => {
    const minBMI = 10;
    const maxBMI = 45;
    const minAngle = -90;
    const maxAngle = 90;
    const limitedBMI = Math.min(Math.max(bmi, minBMI), maxBMI);
    const angle = ((limitedBMI - minBMI) / (maxBMI - minBMI)) * (maxAngle - minAngle) + minAngle;
    setAngle(angle);
  };

  const handleMessage = (bmi) => {
    if (age < 18) {
      setMessage('For age below 18, consult CDC/WHO growth charts.');
    } else if (bmi < 18.5) {
      setMessage('⚠️ Underweight. Time to power up! 🏋️‍♂️');
    } else if (bmi < 25) {
      setMessage('🎉 You are in great shape! Keep it up! 💪');
    } else if (bmi < 30) {
      setMessage('😅 Overweight. A little balance can go a long way!');
    } else {
      setMessage('🚨 Obese. Let’s aim for progress, not perfection!');
    }
  };

  const suggestWeight = (bmi, heightM) => {
    const normalMin = 18.5 * heightM * heightM;
    const normalMax = 24.9 * heightM * heightM;
    if (bmi < 18.5) {
      setWeightSuggestion(`Gain at least ${(normalMin - weightKg).toFixed(1)} kg to reach normal weight.`);
    } else if (bmi > 24.9) {
      setWeightSuggestion(`Lose at least ${(weightKg - normalMax).toFixed(1)} kg to reach normal weight.`);
    } else {
      setWeightSuggestion('You are at a healthy weight! 🎯');
    }
  };

  return (
    <>
     
      <div className="flex flex-col lg:flex-row justify-center items-center p-6 gap-10">
        {/* Input Form */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">BMI Calculator</h2>
          <input type="number" placeholder="Age" className="input" onChange={(e) => setAge(e.target.value)} />
          
          <div className="flex gap-2">
            <input type="number" placeholder="Feet" className="input" onChange={(e) => setFeet(e.target.value)} />
            <input type="number" placeholder="Inches" className="input" onChange={(e) => setInches(e.target.value)} />
          </div>
          <input type="number" placeholder="Weight (kg)" className="input" onChange={(e) => setWeightKg(e.target.value)} />
          <button className="bg-blue-500 text-white w-full py-2 mt-4 rounded hover:bg-blue-600 transition" onClick={calculateBMI}>
            Calculate
          </button>
        </div>

        {/* Gauge */}
        <div className="relative w-full max-w-lg">
          <svg viewBox="0 0 200 100" className="w-full">
            <defs>
              <linearGradient id="bmiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="10%" stopColor="#d32f2f" />
                <stop offset="30%" stopColor="#fbc02d" />
                <stop offset="60%" stopColor="#388e3c" />
                <stop offset="80%" stopColor="#fbc02d" />
                <stop offset="100%" stopColor="#d32f2f" />
              </linearGradient>
            </defs>
            <path d="M10,90 A90,90 0 0,1 190,90" stroke="url(#bmiGradient)" strokeWidth="20" fill="none" />
            <line
              x1="100"
              y1="90"
              x2={100 + 70 * Math.cos((angle - 90) * (Math.PI / 180))}
              y2={90 + 70 * Math.sin((angle - 90) * (Math.PI / 180))}
              stroke="black"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <text x="100" y="60" textAnchor="middle" fontSize="16" fill="#333">BMI = {bmi || 0}</text>
          </svg>
          {bmi && (
            <div className="text-center mt-4">
              <p className="text-lg font-semibold">{message}</p>
              <p className="text-sm text-gray-700">{weightSuggestion}</p>
            </div>
          )}
        </div>
      </div>
     
    </>
  );
}

export default BMICalculator;
