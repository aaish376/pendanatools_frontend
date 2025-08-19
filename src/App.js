import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RemoveBg from './pages/RemoveBg';
import CalorieCalculator from './pages/CalorieCalculator';
import BMICalculator from './pages/BMICalculator';
import TaxCalculator from './pages/TaxCalculator';
import WordCounter from './pages/WordCounter';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AgeCalculator from './pages/AgeCalculator';
import QRCodePage from './pages/QRCode';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/remove-bg" element={<RemoveBg />} />
        <Route path="/calorie-calculator" element={<CalorieCalculator />} />
        <Route path="/bmi-calculator" element={<BMICalculator />} />
        <Route path="/tax-calculator" element={<TaxCalculator />} />
        <Route path="/age-calculator" element={<AgeCalculator />} />
        <Route path="/word-counter" element={<WordCounter />} />
        <Route path="/qr-code" element={<QRCodePage />} />
      </Routes>
        <Footer />
    </Router>
  );
}

export default App;
