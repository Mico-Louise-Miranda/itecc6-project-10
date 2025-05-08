import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

function Plants () {
        const [plants, setPlants] = useState([
            {
                name: "Rose",
                desc: "Mula atuy",
                sunreq: "Full Sun",
                waterneeds: "Every 3 days",
                soiltype: "Loamy"
            }
        ])

        useEffect(() => {
            axios.get('http://localhost:3001')
            .then(result => setPlants(result.data))
            .catch(err => console.log(err))
        }, [])
    
    return (
        <div className="flex min-h-screen bg-green-500 justify-center items-center p-4">
           <div className='w-full max-w-4xl bg-white rounded-lg shadow-lg p-6'>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-green-800">Plant Care Tracker</h1>
                <Link to="/add" className='bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition duration-200'>
                    Add Plant
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className='min-w-full bg-white border border-gray-200'>
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Name</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Description</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Sunlight</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Watering</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Soil Type</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            plants.map((plant, index) => {
                                return (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm">{plant.name}</td>
                                        <td className="py-3 px-4 text-sm">{plant.desc}</td>
                                        <td className="py-3 px-4 text-sm">{plant.sunreq}</td>
                                        <td className="py-3 px-4 text-sm">{plant.waterneeds}</td>
                                        <td className="py-3 px-4 text-sm">{plant.soiltype}</td>
                                        <td className="py-3 px-4 text-sm space-x-2">
                                            <Link to={`/update/${plant._id}`} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-xs">
                                                Update
                                            </Link>
                                            <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-xs">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
            </div> 
        </div>
    )
}

export default Plants;