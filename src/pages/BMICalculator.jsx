import React, { useState } from 'react';
import { Gauge } from '../components/Gauge'; // gauge component (code provided below)


function BMICalculator() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [adjustment, setAdjustment] = useState('');

  const calculateBMI = () => {
    const heightMeters = ((parseInt(feet || 0) * 12) + parseInt(inches || 0)) * 0.0254;
    const w = parseFloat(weight);
    const bmiValue = w / (heightMeters * heightMeters);
    const rounded = +bmiValue.toFixed(1);
    setBmi(rounded);

    let cat = '';
    let msg = '';
    let adj = '';

    if (age < 18) {
      cat = 'Child BMI varies by age';
      msg = 'Consult pediatric growth charts for accuracy.';
    } else {
      if (rounded < 18.5) {
        cat = 'Underweight';
        msg = 'You need to gain some healthy weight! 💪';
        const minNormal = 18.5 * (heightMeters ** 2);
        adj = `Gain at least ${(minNormal - w).toFixed(1)} kg to reach normal BMI.`;
      } else if (rounded < 25) {
        cat = 'Normal';
        msg = 'Great job! Keep maintaining this healthy BMI! 🎉';
      } else if (rounded < 30) {
        cat = 'Overweight';
        msg = 'Consider adopting a more active and balanced lifestyle. 🏃‍♂️';
        const maxNormal = 24.9 * (heightMeters ** 2);
        adj = `Lose about ${(w - maxNormal).toFixed(1)} kg to reach normal BMI.`;
      } else {
        cat = 'Obese';
        msg = 'Take action toward better health—every step counts. ❤️';
        const maxNormal = 24.9 * (heightMeters ** 2);
        adj = `Lose about ${(w - maxNormal).toFixed(1)} kg to reach normal BMI.`;
      }
    }

    setCategory(cat);
    setMessage(msg);
    setAdjustment(adj);
  };

  return (
    <>
      
      <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-10 px-4 py-10 max-w-6xl my-20 mx-auto">
        {/* Left: Input form */}
        <div className="w-full md:w-1/2 bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">BMI Calculator</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Age" className="border p-2 rounded" onChange={(e) => setAge(e.target.value)} />
            <div className="flex items-center gap-4 col-span-2">
              <label><input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} /> Male</label>
              <label><input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} /> Female</label>
            </div>
            <input type="number" placeholder="Height (feet)" className="border p-2 rounded" onChange={(e) => setFeet(e.target.value)} />
            <input type="number" placeholder="Height (inches)" className="border p-2 rounded" onChange={(e) => setInches(e.target.value)} />
            <input type="number" placeholder="Weight (kg)" className="border p-2 rounded col-span-2" onChange={(e) => setWeight(e.target.value)} />
          </div>
          <button onClick={calculateBMI} className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Calculate BMI</button>
          
        </div>

        {/* Right: Gauge */}
        <div className="w-full md:w-1/2 flex justify-center">
         <Gauge value={bmi} category={category} message={message} adjustment={adjustment} />

        </div>
      </div>
    
    </>
  );
}

export default BMICalculator;
