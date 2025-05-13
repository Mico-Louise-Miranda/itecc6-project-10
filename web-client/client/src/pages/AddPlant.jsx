import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';

const AddPlant = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    sunreq: '',
    waterneeds: '',
    soiltype: '',
    image: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setUploadError('');
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size exceeds 5MB limit');
      return;
    }
    
    // Check file type
    if (!file.type.match('image.*')) {
      setUploadError('Only image files are allowed');
      return;
    }
    
    setSelectedFile(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async () => {
    if (!selectedFile) return null;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);
    
    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setIsUploading(false);
      return `http://localhost:3001${response.data.imagePath}`;
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError('Failed to upload image');
      setIsUploading(false);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // If file selected, upload it first
      let imageUrl = formData.image;
      
      if (selectedFile) {
        imageUrl = await uploadImage();
        if (!imageUrl) {
          setLoading(false);
          return; // Stop if image upload failed
        }
      }
      
      // Submit form with image URL
      await axios.post('http://localhost:3001/addPlant', {
        ...formData,
        image: imageUrl
      });
      
      navigate('/garden');
    } catch (error) {
      console.error('Error adding plant:', error);
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      name: '',
      desc: '',
      sunreq: '',
      waterneeds: '',
      soiltype: '',
      image: ''
    });
    setSelectedFile(null);
    setPreviewUrl('');
  };

  return (
    <Layout>
      <div className="relative bg-[#D9E7CB] rounded-lg p-8">
        <h1 className="text-3xl font-bold text-[#2E2E2E] mb-6">Add New Plant</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Plant Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8BCA1]"
                />
              </div>

              <div>
                <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="desc"
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8BCA1]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="sunreq" className="block text-sm font-medium text-gray-700 mb-1">
                  Sunlight Requirement
                </label>
                <select
                  id="sunreq"
                  name="sunreq"
                  value={formData.sunreq}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8BCA1] appearance-none bg-white"
                >
                  <option value="">Select an option</option>
                  <option value="Full Sun">Full Sun</option>
                  <option value="Partial Sun">Partial Sun</option>
                  <option value="Shade">Shade</option>
                  <option value="Medium to Low Light">Medium to Low Light</option>
                  <option value="Bright, indirect light">Bright, indirect light</option>
                </select>
              </div>

              <div>
                <label htmlFor="waterneeds" className="block text-sm font-medium text-gray-700 mb-1">
                  Watering Needs
                </label>
                <select
                  id="waterneeds"
                  name="waterneeds"
                  value={formData.waterneeds}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8BCA1] appearance-none bg-white"
                >
                  <option value="">Select an option</option>
                  <option value="Every 3 days">Every 3 days</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Twice weekly">Twice weekly</option>
                  <option value="Every 2-3 weeks">Every 2-3 weeks</option>
                  <option value="When top soil is dry">When top soil is dry</option>
                  <option value="Keep soil moist">Keep soil moist</option>
                </select>
              </div>

              <div>
                <label htmlFor="soiltype" className="block text-sm font-medium text-gray-700 mb-1">
                  Soil Type
                </label>
                <select
                  id="soiltype"
                  name="soiltype"
                  value={formData.soiltype}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8BCA1] appearance-none bg-white"
                >
                  <option value="">Select an option</option>
                  <option value="Loamy">Loamy</option>
                  <option value="Sandy">Sandy</option>
                  <option value="Clay">Clay</option>
                  <option value="Well-draining potting mix">Well-draining potting mix</option>
                  <option value="Peat-based potting mix">Peat-based potting mix</option>
                  <option value="Rich, well-draining mix">Rich, well-draining mix</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plant Image
                </label>
                <div className="space-y-2">
                  {/* File Upload */}
                  <div className="border border-gray-300 rounded-md p-4 bg-white">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="plant-image"
                    />
                    <label 
                      htmlFor="plant-image"
                      className="flex items-center justify-center w-full p-2 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                    >
                      <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="mt-1 text-sm text-gray-600">
                          {selectedFile ? selectedFile.name : 'Click to upload a plant image'}
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Preview Image */}
                  {previewUrl && (
                    <div className="mt-2">
                      <div className="relative aspect-square w-full bg-gray-100 rounded-md overflow-hidden">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFile(null);
                            setPreviewUrl('');
                          }}
                          className="absolute top-2 right-2 p-1 bg-white rounded-full text-gray-600 hover:text-gray-900"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {uploadError && (
                    <p className="text-red-500 text-sm mt-1">{uploadError}</p>
                  )}

                  {/* URL Alternative */}
                  <div className="mt-2">
                    <div className="flex items-center">
                      <div className="flex-grow border-t border-gray-300"></div>
                      <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
                      <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mt-3 mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="Enter image URL"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8BCA1]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/garden')}
              className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            
            <div className="space-x-4">
              <button
                type="button"
                onClick={handleClear}
                className="px-6 py-2 bg-gray-200 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-300 transition-colors"
              >
                Clear
              </button>
              
              <button
                type="submit"
                disabled={loading || isUploading}
                className={`px-6 py-2 bg-[#2E2E2E] text-white rounded-full hover:bg-gray-800 transition-colors ${(loading || isUploading) ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading || isUploading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddPlant; 