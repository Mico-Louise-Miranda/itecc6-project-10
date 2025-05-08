import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'

function UpdatePlants() {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [sunreq, setSunReq] = useState('')
    const [waterneeds, setWaterNeeds] = useState('')
    const [soiltype, setSoilType] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3001/getPlant/${id}`)
            .then(result => {
                const plantData = result.data;
                setName(plantData.name);
                setDesc(plantData.desc);
                setSunReq(plantData.sunreq);
                setWaterNeeds(plantData.waterneeds);
                setSoilType(plantData.soiltype);
            })
            .catch(err => console.log(err))
    }, [id])

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/updatePlant/${id}`, {
            name, desc, sunreq, waterneeds, soiltype
        })
            .then(result => {
                console.log(result);
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='flex min-h-screen bg-green-500 justify-center items-center p-4'>
           <div className='w-full max-w-lg bg-white rounded-lg shadow-lg p-6'>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-green-800">Update Plant</h2>
                <Link to="/" className="text-green-600 hover:text-green-800 font-medium">
                    Back to Plants
                </Link>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Plant Name</label>
                    <input 
                        type='text' 
                        value={name}
                        placeholder='Enter Plant Name' 
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Description</label>
                    <textarea 
                        value={desc}
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
                        value={sunreq} 
                        placeholder='e.g. Full Sun, Partial Shade' 
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                        onChange={(e) => setSunReq(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Watering Needs</label>
                    <input 
                        type='text'
                        value={waterneeds} 
                        placeholder='e.g. Every 3 days' 
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                        onChange={(e) => setWaterNeeds(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Soil Type</label>
                    <input 
                        type='text'
                        value={soiltype} 
                        placeholder='e.g. Loamy, Sandy, Clay' 
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                        onChange={(e) => setSoilType(e.target.value)}
                    />
                </div>
                <div className="flex gap-3">
                    <button 
                        type="submit"
                        className='flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition duration-200'
                    >
                        Update Plant
                    </button>
                    <button 
                        type="button"
                        onClick={() => navigate('/')}
                        className='flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition duration-200'
                    >
                        Cancel
                    </button>
                </div>
            </form>
           </div>
        </div>
    )
}

export default UpdatePlants; 