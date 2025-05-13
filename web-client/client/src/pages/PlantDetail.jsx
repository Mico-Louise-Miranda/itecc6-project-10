import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import Loader from '../components/Loader';

const PlantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPlant();
  }, [id]);

  const fetchPlant = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/getPlant/${id}`);
      setPlant(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching plant:', error);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/deletePlant/${id}`);
      navigate('/garden');
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  const confirmDelete = () => {
    setShowModal(true);
  };

  if (loading) return <Loader />;

  if (!plant) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-xl text-gray-800 mb-4">Plant not found</h2>
          <button 
            onClick={() => navigate('/garden')}
            className="px-6 py-2 bg-[#A8BCA1] text-white rounded-full"
          >
            Back to Garden
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative bg-[#D9E7CB] rounded-lg p-8">
        <button 
          onClick={() => navigate('/garden')}
          className="absolute top-4 right-4 text-gray-800 hover:text-black focus:outline-none"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square bg-white overflow-hidden rounded-sm">
            {plant.image ? (
              <img 
                src={plant.image} 
                alt={plant.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22V18" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6V2" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 12H18" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 12H2" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-4xl font-bold text-[#2E2E2E]">{plant.name}</h1>
              <button 
                onClick={() => navigate(`/update/${plant._id}`)}
                className="text-gray-800 hover:text-black focus:outline-none"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <p className="text-gray-700 mb-8">{plant.desc}</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 mb-2 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="5" stroke="#2E2E2E" strokeWidth="2"/>
                    <path d="M12 2V4" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 20V22" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M4 12L2 12" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M22 12L20 12" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M19.7782 4.22183L18.364 5.63604" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M5.63608 18.364L4.22187 19.7782" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M19.7782 19.7782L18.364 18.364" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M5.63608 5.63603L4.22187 4.22182" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-sm font-medium text-center">{plant.sunreq || 'Unknown'}</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 mb-2 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.6 12H20L13 22L10 13L4 15L12 2Z" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-sm font-medium text-center">{plant.waterneeds || 'Unknown'}</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 mb-2 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 11H5C5.53043 11 6.03914 10.7893 6.41421 10.4142C6.78929 10.0391 7 9.53043 7 9V3H9C9.53043 3 10.0391 3.21071 10.4142 3.58579C10.7893 3.96086 11 4.46957 11 5V17C11 17.5304 11.2107 18.0391 11.5858 18.4142C11.9609 18.7893 12.4696 19 13 19V21C11.9391 21 10.9217 20.5786 10.1716 19.8284C9.42143 19.0783 9 18.0609 9 17V11H3V9C3 7.93913 3.42143 6.92172 4.17157 6.17157C4.92172 5.42143 5.93913 5 7 5V11ZM15 3C15.5304 3 16.0391 3.21071 16.4142 3.58579C16.7893 3.96086 17 4.46957 17 5V11H21V17C21 18.0609 20.5786 19.0783 19.8284 19.8284C19.0783 20.5786 18.0609 21 17 21V19C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V13H15C14.4696 13 13.9609 12.7893 13.5858 12.4142C13.2107 12.0391 13 11.5304 13 11V5C13 4.46957 13.2107 3.96086 13.5858 3.58579C13.9609 3.21071 14.4696 3 15 3Z" fill="#2E2E2E"/>
                  </svg>
                </div>
                <p className="text-sm font-medium text-center">{plant.soiltype || 'Unknown'}</p>
              </div>
            </div>

            <button 
              onClick={confirmDelete}
              className="px-6 py-2 bg-white text-red-600 border border-red-600 rounded-full hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete {plant.name}? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PlantDetail; 