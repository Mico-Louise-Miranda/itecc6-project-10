import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'

function AddPlants () {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [sunreq, setSunReq] = useState('')
    const [waterneeds, setWaterNeeds] = useState('')
    const [soiltype, setSoilType] = useState('')
    const navigate = useNavigate()

    const Submit = (e) => { 
        e.preventDefault();
    
        const plantData = {
            name,
            desc,
            sunreq,
            waterneeds,
            soiltype
        };
    
        axios.post("http://localhost:3001/addPlant", plantData)
            .then(result => {
                console.log("Response from server:", result);
                navigate('/');
            })
            .catch(err => {
                console.log("Error:", err); 
            });
    };
    
    return (
        <div className='flex min-h-screen bg-green-500 justify-center items-center p-4'>
           <div className='w-full max-w-lg bg-white rounded-lg shadow-lg p-6'>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-green-800">Add Plant</h2>
                <Link to="/" className="text-green-600 hover:text-green-800 font-medium">
                    Back to Plants
                </Link>
            </div>
            
            <form onSubmit={Submit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Plant Name</label>
                    <input 
                        type='text' 
                        placeholder='Enter Plant Name' 
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Description</label>
                    <textarea 
                        placeholder='Enter Plant Description' 
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                        rows="3"
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Sunlight Requirements</label>
                    <input 
                        type='text' 
                        placeholder='e.g. Full Sun, Partial Shade' 
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                        onChange={(e) => setSunReq(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Watering Needs</label>
                    <input 
                        type='text' 
                        placeholder='e.g. Every 3 days' 
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                        onChange={(e) => setWaterNeeds(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Soil Type</label>
                    <input 
                        type='text' 
                        placeholder='e.g. Loamy, Sandy, Clay' 
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                        onChange={(e) => setSoilType(e.target.value)}
                    />
                </div>

                <button 
                    type="submit"
                    className='w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition duration-200 mt-4'
                >
                    Add Plant
                </button>
            </form>
           </div>
        </div>
    )
}

export default AddPlants;