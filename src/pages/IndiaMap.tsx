
import React from 'react';
import Navbar from '../components/Navbar';
import Map from '../components/Map';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const IndiaMap = () => {
  const indiaFacts = [
    {
      title: "Geography",
      facts: [
        "India is the seventh-largest country in the world",
        "Total area: 3.287 million km²",
        "Bordered by the Indian Ocean, Arabian Sea, and Bay of Bengal",
        "Shares land borders with Pakistan, China, Nepal, Bhutan, Bangladesh and Myanmar"
      ]
    },
    {
      title: "Demographics",
      facts: [
        "Population: Over 1.4 billion people",
        "Second most populous country in the world",
        "22 official languages recognized by the Constitution",
        "Hindi and English are the most widely used for official purposes"
      ]
    },
    {
      title: "Culture",
      facts: [
        "One of the world's oldest civilizations",
        "Birthplace of four major religions: Hinduism, Buddhism, Jainism, and Sikhism",
        "Rich diversity in arts, architecture, music, and cuisine",
        "Famous for its colorful festivals celebrated throughout the year"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="fixit-container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">India Map & Information</h1>
          <p className="text-gray-600">
            Explore the geographical and cultural diversity of India through our interactive map
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <Map height="h-[600px]" showControls={true} />
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button className="bg-fixit-primary hover:bg-fixit-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                View Community Issues
              </Button>
              <Button variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Report Issue in This Area
              </Button>
            </div>
          </div>
          
          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">India Facts</h2>
              
              {indiaFacts.map((section, index) => (
                <div key={index} className={index > 0 ? 'mt-6' : ''}>
                  <h3 className="text-lg font-medium text-fixit-primary mb-2">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.facts.map((fact, i) => (
                      <li key={i} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-fixit-primary mr-2 mt-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                        </svg>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                  {index < indiaFacts.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
              <h2 className="text-2xl font-semibold mb-4">States & Union Territories</h2>
              <p className="text-gray-600 mb-4">
                India comprises 28 states and 8 union territories, each with its own unique culture and governance.
              </p>
              <Button className="w-full">
                View Detailed State Information
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiaMap;
