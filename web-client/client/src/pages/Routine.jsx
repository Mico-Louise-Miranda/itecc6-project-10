import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Loader from '../components/Loader';

const Routine = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAllRemindersEnabled, setIsAllRemindersEnabled] = useState(false);
  const [wateringPlant, setWateringPlant] = useState(null);

  useEffect(() => {
    fetchWateringSchedule();
  }, []);

  const fetchWateringSchedule = async () => {
    try {
      const response = await axios.get('http://localhost:3001/wateringSchedule');
      setPlants(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching watering schedule:', error);
      setLoading(false);
    }
  };

  const markAsWatered = async (plantId) => {
    setWateringPlant(plantId);
    try {
      const response = await axios.post(`http://localhost:3001/waterPlant/${plantId}`);
      // Update the plant in the local state
      setPlants(plants.map(plant => 
        plant._id === plantId ? response.data : plant
      ));
      setWateringPlant(null);
    } catch (error) {
      console.error('Error marking plant as watered:', error);
      setWateringPlant(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    
    const date = new Date(dateString);
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[date.getMonth()].slice(0, 3)} ${date.getDate()}`;
  };

  const getDaysUntilWatering = (nextWatering) => {
    if (!nextWatering) return '';
    
    const today = new Date();
    const wateringDate = new Date(nextWatering);
    
    // Reset time part to compare just dates
    today.setHours(0, 0, 0, 0);
    wateringDate.setHours(0, 0, 0, 0);
    
    const diffTime = wateringDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `In ${diffDays} days`;
  };

  const getWateringFrequencyText = (days) => {
    if (!days) return 'Not set';
    
    switch(days) {
      case 3: return 'Every 3 days';
      case 4: return 'Twice weekly';
      case 7: return 'Weekly';
      case 17: return 'Every 2-3 weeks';
      case 5: return 'When soil is dry';
      default: return `Every ${days} days`;
    }
  };

  if (loading) return <Loader />;

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#2E2E2E] mb-1">Care Routine</h1>
        <p className="text-gray-600">Set your plant care schedule and get timely reminders</p>
      </div>

      <div className="flex justify-between items-center mb-4 p-3 bg-white rounded-lg shadow-sm">
        <div className="flex items-center">
          <span className="text-gray-800 mr-2">Enable All Reminders</span>
          <div 
            className={`w-12 h-6 rounded-full cursor-pointer ${isAllRemindersEnabled ? 'bg-[#A8BCA1]' : 'bg-gray-300'}`}
            onClick={() => setIsAllRemindersEnabled(!isAllRemindersEnabled)}
          >
            <div 
              className={`w-5 h-5 bg-white rounded-full transform transition-transform duration-300 ${isAllRemindersEnabled ? 'translate-x-6' : 'translate-x-1'}`} 
              style={{marginTop: '2px'}}
            ></div>
          </div>
        </div>
        <div className="flex items-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-gray-800 ml-2">Reminder Time: [ 6:00 AM ]</span>
        </div>
      </div>

      <div className="bg-[#D9E7CB] p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plants.map((plant) => (
            <div key={plant._id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-start">
                <div className="w-16 h-16 bg-[#C8DBC4] flex items-center justify-center rounded-md mr-3 overflow-hidden">
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
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#2E2E2E] mb-1">{plant.name}</h3>
                  <div className="text-sm text-gray-700">
                    <p className="mb-1">Watering Frequency:</p>
                    <p className="font-medium mb-1">[ {getWateringFrequencyText(plant.wateringFrequency)} ]</p>
                    <p className="mb-1">Last Watered: {formatDate(plant.lastWatered)}</p>
                    <div className="flex justify-between items-center">
                      <p className={`${getDaysUntilWatering(plant.nextWatering) === 'Today' ? 'text-green-600 font-medium' : getDaysUntilWatering(plant.nextWatering) === 'Overdue' ? 'text-red-600 font-medium' : ''}`}>
                        Next: {formatDate(plant.nextWatering)} ({getDaysUntilWatering(plant.nextWatering)})
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <button 
                  onClick={() => markAsWatered(plant._id)}
                  disabled={wateringPlant === plant._id}
                  className={`w-full py-2 rounded-md ${wateringPlant === plant._id ? 'bg-gray-200 text-gray-500' : 'bg-[#A8BCA1] text-white hover:bg-[#97ab90] transition-colors'}`}
                >
                  {wateringPlant === plant._id ? 'Updating...' : 'Mark as Watered Today'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Routine; 