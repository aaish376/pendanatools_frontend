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
import ImageExtensionConverter from './pages/ImageExtensionConverter';
import ElectricUnitCalculator from './pages/ElectricUnitCalculator';
import InvoiceMaker from './pages/InvoiceMaker';

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
        <Route path="/image-extension-converter" element={<ImageExtensionConverter />} />
        <Route path="/electric-unit-calculator" element={<ElectricUnitCalculator />} />
        <Route path="/invoice-maker" element={<InvoiceMaker />} />
      </Routes>
        <Footer />
    </Router>
  );
}

export default App;
