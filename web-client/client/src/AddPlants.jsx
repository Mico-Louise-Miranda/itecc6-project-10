import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function AddPlants() {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [sunreq, setSunReq] = useState('')
    const [waterneeds, setWaterNeeds] = useState('')
    const [soiltype, setSoilType] = useState('')
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const plantData = {
            name,
            desc,
            sunreq,
            waterneeds,
            soiltype,
            image
        };

        axios.post("http://localhost:3001/addPlant", plantData)
            .then(result => {
                console.log("Response from server:", result);
                setLoading(false);
                navigate('/');
            })
            .catch(err => {
                console.log("Error:", err);
                setLoading(false);
            });
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
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Add New Plant</h2>
                    <p className="text-gray-600">Enter the details of your new plant</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Plant Name</label>
                                    <input
                                        type='text'
                                        required
                                        placeholder='Enter Plant Name'
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Description</label>
                                    <textarea
                                        required
                                        placeholder='Enter Plant Description'
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                                        rows="4"
                                        onChange={(e) => setDesc(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Image URL</label>
                                    <input
                                        type='text'
                                        placeholder='Enter Image URL'
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                                        onChange={(e) => setImage(e.target.value)}
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        Enter a URL to an image of your plant. Leave empty for a default image.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Sunlight Requirements</label>
                                    <input
                                        type='text'
                                        required
                                        placeholder='e.g. Full Sun, Partial Shade'
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                                        onChange={(e) => setSunReq(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Watering Needs</label>
                                    <input
                                        type='text'
                                        required
                                        placeholder='e.g. Every 3 days'
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                                        onChange={(e) => setWaterNeeds(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Soil Type</label>
                                    <input
                                        type='text'
                                        required
                                        placeholder='e.g. Loamy, Sandy, Clay'
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                                        onChange={(e) => setSoilType(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
                            <Link
                                to="/"
                                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors duration-200"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-200 flex items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading && (
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                {loading ? 'Adding...' : 'Add Plant'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddPlants;