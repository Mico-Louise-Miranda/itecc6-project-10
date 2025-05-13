import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function Plants() {
    const [plants, setPlants] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPlants();
    }, [])

    const fetchPlants = () => {
        setLoading(true);
        axios.get('http://localhost:3001')
            .then(result => {
                setPlants(result.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this plant?")) {
            axios.delete(`http://localhost:3001/deletePlant/${id}`)
                .then(res => {
                    console.log(res);
                    fetchPlants(); // Refresh plant list
                })
                .catch(err => console.log(err))
        }
    }

    // Default image if plant has no image
    const defaultImage = "https://via.placeholder.com/150x150?text=Plant";

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-green-700 text-white p-6">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Botaniq</h1>
                    <div className="flex items-center space-x-4">
                        <Link to="/seed" className="text-white hover:underline font-medium">
                            Sample Plants
                        </Link>
                        <Link to="/add" className="bg-white text-green-700 hover:bg-green-50 font-medium py-2 px-6 rounded-full transition duration-200 flex items-center">
                            <span className="mr-1">+</span> Add Plant
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto p-6">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Garden</h2>
                    <p className="text-gray-600">Manage your collection of thriving plants</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                ) : plants.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <h3 className="text-xl font-medium text-gray-800 mb-2">Your garden is empty</h3>
                        <p className="text-gray-600 mb-6">Start adding some plants to your collection!</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/add" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-200">
                                Add Your First Plant
                            </Link>
                            <Link to="/seed" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200">
                                Add Sample Plants
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {plants.map((plant) => (
                            <div key={plant._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="h-48 bg-gray-200 overflow-hidden">
                                    <img 
                                        src={plant.image || defaultImage} 
                                        alt={plant.name} 
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.src = defaultImage; }}
                                    />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{plant.name}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">{plant.desc}</p>
                                    
                                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                                        <div>
                                            <p className="text-gray-500 font-medium">Sunlight</p>
                                            <p>{plant.sunreq}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 font-medium">Water</p>
                                            <p>{plant.waterneeds}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-gray-500 font-medium">Soil</p>
                                            <p>{plant.soiltype}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-between pt-3 border-t border-gray-100">
                                        <Link to={`/update/${plant._id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                                            Edit
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(plant._id)} 
                                            className="text-red-600 hover:text-red-800 font-medium"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Plants;