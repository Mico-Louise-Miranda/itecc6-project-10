import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Plant data from garden.jsx in the mobile app
const mobilePlants = [
    { 
        name: "Peace Lily", 
        desc: "The Peace Lily is an elegant indoor plant with glossy, dark green leaves and beautiful white flowers.",
        sunreq: "Medium to Low Light",
        waterneeds: "Weekly, when soil is dry",
        soiltype: "Well-draining potting mix",
        image: "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    { 
        name: "Fiddle Leaf Fig", 
        desc: "The Fiddle Leaf Fig is famous for its large, violin-shaped leaves and makes a dramatic statement in any space.",
        sunreq: "Bright, indirect light",
        waterneeds: "Every 7-10 days",
        soiltype: "Well-draining potting soil",
        image: "https://images.pexels.com/photos/6913140/pexels-photo-6913140.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    { 
        name: "Watermelon Peperomia", 
        desc: "The Watermelon Peperomia has striking watermelon-patterned leaves that add a unique touch to your plant collection.",
        sunreq: "Medium, indirect light",
        waterneeds: "When top soil is dry",
        soiltype: "Peat-based potting mix",
        image: "https://images.pexels.com/photos/4751975/pexels-photo-4751975.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    { 
        name: "African Mask", 
        desc: "The African Mask plant (Alocasia) features dramatic arrow-shaped leaves with prominent white veins.",
        sunreq: "Bright, indirect light",
        waterneeds: "Keep soil moist",
        soiltype: "Rich, well-draining mix",
        image: "https://images.pexels.com/photos/6044365/pexels-photo-6044365.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    { 
        name: "Alocasia", 
        desc: "Alocasia plants have large, exotic foliage with distinctive veining and unique leaf shapes.",
        sunreq: "Bright, indirect light",
        waterneeds: "Regular watering",
        soiltype: "Rich, moist soil",
        image: "https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    { 
        name: "ZZ Plant", 
        desc: "The ZZ Plant is virtually indestructible with its glossy, dark green leaves and ability to thrive on neglect.",
        sunreq: "Low to bright indirect",
        waterneeds: "Every 2-3 weeks",
        soiltype: "Standard potting mix",
        image: "https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    { 
        name: "Alocasia Polly", 
        desc: "Alocasia Polly is a compact variety with striking arrow-shaped, dark green leaves with white veining.",
        sunreq: "Bright, indirect light",
        waterneeds: "Keep soil moist",
        soiltype: "Well-draining mix",
        image: "https://images.pexels.com/photos/7040536/pexels-photo-7040536.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    { 
        name: "Palm Tree", 
        desc: "Palm Trees bring a tropical feel to any space with their elegant fronds and structural presence.",
        sunreq: "Bright, indirect light",
        waterneeds: "Once a week",
        soiltype: "Sandy, well-draining",
        image: "https://images.pexels.com/photos/4751957/pexels-photo-4751957.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    { 
        name: "Snake Plant", 
        desc: "Also known as Sansevieria, Snake Plant is known for its upright, sword-like leaves and air-purifying qualities.",
        sunreq: "Low to bright light",
        waterneeds: "Every 2-4 weeks",
        soiltype: "Well-draining, sandy mix",
        image: "https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
];

function SeedData() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    
    const handleSeed = async () => {
        if (!window.confirm('This will add sample plants to your database. Continue?')) {
            return;
        }
        
        setLoading(true);
        setMessage('');
        
        let successCount = 0;
        let errorCount = 0;
        
        for (const plant of mobilePlants) {
            try {
                await axios.post('http://localhost:3001/addPlant', plant);
                successCount++;
            } catch (error) {
                console.error('Error adding plant:', error);
                errorCount++;
            }
        }
        
        setLoading(false);
        setMessage(`Added ${successCount} plants successfully. ${errorCount} errors.`);
    };
    
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-green-700 text-white p-6">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Botaniq</h1>
                    <Link to="/" className="text-white hover:underline font-medium flex items-center">
                        <span className="mr-1">←</span> Back to Garden
                    </Link>
                </div>
            </div>
            
            {/* Main Content */}
            <div className="container mx-auto p-6">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Seed Database</h2>
                    <p className="text-gray-600">Add sample plants from the mobile app</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="mb-6">
                        <p className="text-gray-700 mb-4">
                            This will add {mobilePlants.length} sample plants to your database with data from the
                            mobile app. Use this to quickly populate your garden with beautiful plants.
                        </p>
                        
                        {message && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                                {message}
                            </div>
                        )}
                        
                        <button
                            onClick={handleSeed}
                            disabled={loading}
                            className={`w-full md:w-auto px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-200 flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Adding Plants...
                                </>
                            ) : (
                                'Add Sample Plants'
                            )}
                        </button>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4">
                        <h3 className="font-medium text-gray-700 mb-2">Sample Plants</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {mobilePlants.map((plant, index) => (
                                <div key={index} className="text-sm">
                                    <div className="font-medium">{plant.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SeedData; 