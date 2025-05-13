import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import Loader from '../components/Loader';

const Home = () => {
  const [plants, setPlants] = useState([]);
  const [currentPlant, setCurrentPlant] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await axios.get('http://localhost:3001/');
      setPlants(response.data);
      if (response.data.length > 0) {
        setCurrentPlant(response.data[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching plants:', error);
      setLoading(false);
    }
  };

  const goToNextPlant = () => {
    if (plants.length <= 1) return;
    const newIndex = (currentIndex + 1) % plants.length;
    setCurrentIndex(newIndex);
    setCurrentPlant(plants[newIndex]);
  };

  const goToPrevPlant = () => {
    if (plants.length <= 1) return;
    const newIndex = (currentIndex - 1 + plants.length) % plants.length;
    setCurrentIndex(newIndex);
    setCurrentPlant(plants[newIndex]);
  };

  if (loading) return <Loader />;

  if (!currentPlant) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-xl text-gray-800 mb-4">No plants found</h2>
          <Link 
            to="/garden"
            className="inline-block px-6 py-2 bg-[#A8BCA1] text-white rounded-full"
          >
            Add Plants
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex items-center min-h-[calc(100vh-10rem)]">
        <button 
          onClick={goToPrevPlant}
          className="w-12 h-12 flex justify-center items-center text-gray-600 focus:outline-none"
          disabled={plants.length <= 1}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
          <div className="w-full aspect-square bg-white overflow-hidden">
            {currentPlant.image ? (
              <img 
                src={currentPlant.image} 
                alt={currentPlant.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center border border-gray-200">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22V18" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 22V18" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 22V18" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6V2" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 6V2" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6V2" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 12H18" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 12H2" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
          
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-[#2E2E2E] mb-4">{currentPlant.name}</h1>
            <p className="text-gray-700 mb-8">{currentPlant.desc}</p>
            
            <Link 
              to={`/plant/${currentPlant._id}`}
              className="inline-block w-max px-8 py-2 bg-[#D9E7CB] text-[#2E2E2E] rounded-full hover:bg-[#C8DDB9] transition-colors"
            >
              View Plant
            </Link>
          </div>
        </div>
        
        <button 
          onClick={goToNextPlant}
          className="w-12 h-12 flex justify-center items-center text-gray-600 focus:outline-none"
          disabled={plants.length <= 1}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </Layout>
  );
};

export default Home; 