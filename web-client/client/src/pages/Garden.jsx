import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import Loader from '../components/Loader';

const Garden = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await axios.get('http://localhost:3001/');
      // Initialize favorite status for each plant
      const plantsWithFavorites = response.data.map(plant => ({
        ...plant,
        favorite: false
      }));
      setPlants(plantsWithFavorites);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching plants:', error);
      setLoading(false);
    }
  };

  // Toggle favorite status
  const toggleFavorite = (e, plantId) => {
    e.preventDefault(); // Prevent navigation when clicking the star
    e.stopPropagation(); // Prevent event bubbling
    setPlants(plants.map(plant => 
      plant._id === plantId 
        ? { ...plant, favorite: !plant.favorite } 
        : plant
    ));
  };

  if (loading) return <Loader />;

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2E2E2E]">Garden</h1>
          <p className="text-gray-600">Your collection of thriving greens</p>
        </div>
        <Link
          to="/add"
          className="px-5 py-2 bg-transparent text-[#2E2E2E] border border-[#2E2E2E] rounded-full hover:bg-gray-50 transition-colors"
        >
          Add new plant
        </Link>
      </div>

      {plants.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl text-gray-800 mb-4">Your garden is empty</h2>
          <p className="text-gray-600 mb-6">Start adding some plants to your collection!</p>
          <Link
            to="/add"
            className="inline-block px-6 py-2 bg-[#A8BCA1] text-white rounded-full"
          >
            Add Your First Plant
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {plants.map((plant) => (
            <div key={plant._id} className="flex flex-col">
              <Link to={`/plant/${plant._id}`} className="block relative group">
                <div className="aspect-square relative">
                  {/* Green X Pattern Background */}
                  <div className="absolute inset-0 bg-[#C8DBC4] z-0">
                    <div className="w-full h-full relative">
                      <div className="absolute inset-0 border border-[#A8BCA1]"></div>
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="w-full h-px bg-[#A8BCA1] opacity-30 transform rotate-45"></div>
                      </div>
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="w-full h-px bg-[#A8BCA1] opacity-30 transform -rotate-45"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Plant Image */}
                  {plant.image ? (
                    <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
                      <img 
                        src={plant.image} 
                        alt={plant.name} 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="#A8BCA1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 22V18" stroke="#A8BCA1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 6V2" stroke="#A8BCA1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 12H18" stroke="#A8BCA1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 12H2" stroke="#A8BCA1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center z-20">
                    <span className="opacity-0 group-hover:opacity-100 text-white font-medium transition-opacity duration-200">
                      View
                    </span>
                  </div>
                </div>
              </Link>
              
              <div className="mt-2 flex justify-between items-center">
                <span className="text-[#2E2E2E] font-medium text-sm">{plant.name}</span>
                <button 
                  onClick={(e) => toggleFavorite(e, plant._id)}
                  className="text-gray-600 focus:outline-none w-5 h-5 flex items-center justify-center"
                  aria-label={plant.favorite ? "Remove from favorites" : "Add to favorites"}
                >
                  {plant.favorite ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Garden; 