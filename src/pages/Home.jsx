import React from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
import ToolCard from '../components/ToolCard';
import WhyUs from '../components/WhyUs';
import ClientReviews from '../components/ClientReviews';
import { tools } from '../data';

function Home() {
  return (
    <div>
  
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">Select Any Tool to Get Started Instantly</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <ToolCard key={i} {...tool} />
          ))}
        </div>
      </div>
      <WhyUs />
      <ClientReviews />
     
    </div>
  );
}

export default Home;
