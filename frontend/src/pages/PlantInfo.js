import React, { useState } from 'react';

const PlantInfo = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [plantInfo, setPlantInfo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [myCrops, setMyCrops] = useState([
    {
      id: 1,
      name: 'Tomato',
      imageUrl: 'https://images.unsplash.com/photo-1558351033-045e5c6bacd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      watering: 'Every 2-3 days',
      light: 'Full sun (6-8 hours)',
      soil: 'Well-draining, pH 6.0-6.8',
      fertilizer: 'Balanced fertilizer every 2 weeks',
      timeline: '70-80 days to harvest'
    },
    {
      id: 2,
      name: 'Corn',
      imageUrl: 'https://images.unsplash.com/photo-1558351033-045e5c6bacd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
      watering: 'Once a week, deep watering',
      light: 'Full sun (6+ hours)',
      soil: 'Nitrogen-rich, pH 5.8-7.0',
      fertilizer: 'High-nitrogen fertilizer at planting',
      timeline: '60-100 days to harvest'
    }
  ]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setPlantInfo(null);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    // Mock plant info
    const mockPlantInfo = {
      name: searchTerm,
      scientificName: searchTerm === 'Tomato' ? 'Solanum lycopersicum' : 'Zea mays',
      description: searchTerm === 'Tomato' 
        ? 'The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as a tomato plant. The species originated in western South America and Central America.'
        : 'Maize, also known as corn, is a large grain plant first domesticated by indigenous peoples in southern Mexico about 10,000 years ago.',
      watering: searchTerm === 'Tomato' ? 'Every 2-3 days' : 'Once a week, deep watering',
      light: searchTerm === 'Tomato' ? 'Full sun (6-8 hours)' : 'Full sun (6+ hours)',
      soil: searchTerm === 'Tomato' ? 'Well-draining, pH 6.0-6.8' : 'Nitrogen-rich, pH 5.8-7.0',
      fertilizer: searchTerm === 'Tomato' ? 'Balanced fertilizer every 2 weeks' : 'High-nitrogen fertilizer at planting',
      timeline: searchTerm === 'Tomato' ? '70-80 days to harvest' : '60-100 days to harvest',
      imageUrl: 'https://images.unsplash.com/photo-1558351033-045e5c6bacd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
    };
    
    setPlantInfo(mockPlantInfo);
  };

  const handleIdentify = () => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      // Mock plant info
      const mockPlantInfo = {
        name: 'Tomato',
        scientificName: 'Solanum lycopersicum',
        description: 'The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as a tomato plant. The species originated in western South America and Central America.',
        watering: 'Every 2-3 days',
        light: 'Full sun (6-8 hours)',
        soil: 'Well-draining, pH 6.0-6.8',
        fertilizer: 'Balanced fertilizer every 2 weeks',
        timeline: '70-80 days to harvest',
        imageUrl: previewUrl
      };
      
      setPlantInfo(mockPlantInfo);
      setIsProcessing(false);
    }, 2000);
  };

  const addToMyCrops = () => {
    if (!plantInfo) return;
    
    const newCrop = {
      id: myCrops.length + 1,
      name: plantInfo.name,
      imageUrl: plantInfo.imageUrl,
      watering: plantInfo.watering,
      light: plantInfo.light,
      soil: plantInfo.soil,
      fertilizer: plantInfo.fertilizer,
      timeline: plantInfo.timeline
    };
    
    setMyCrops([...myCrops, newCrop]);
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Plant ID & Crop Information</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Identify Plant</h2>
          <p className="mb-4 text-gray-600">Upload an image or search by name to get detailed plant information</p>
          
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Search by Name</label>
            <div className="flex">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter plant name..."
                className="flex-grow border border-gray-300 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleSearch}
                className="bg-green-600 text-white px-6 rounded-r-lg hover:bg-green-700 transition duration-300"
              >
                Search
              </button>
            </div>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
            <h3 className="text-lg font-bold mb-2">Or Upload Image</h3>
            {previewUrl ? (
              <div className="relative">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="max-h-64 mx-auto rounded-lg"
                />
                <button 
                  onClick={() => {
                    setPreviewUrl(null);
                    setSelectedImage(null);
                    setPlantInfo(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ) : (
              <div>
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            )}
            
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          
          <button
            onClick={handleIdentify}
            disabled={!selectedImage || isProcessing}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white ${
              !selectedImage || isProcessing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            } transition duration-300`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Identifying Plant...
              </div>
            ) : (
              'Identify Plant'
            )}
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Plant Information</h2>
          
          {plantInfo ? (
            <div>
              <div className="flex flex-col md:flex-row mb-6">
                <img 
                  src={plantInfo.imageUrl} 
                  alt={plantInfo.name} 
                  className="w-full md:w-1/3 h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
                />
                <div>
                  <h3 className="text-2xl font-bold">{plantInfo.name}</h3>
                  <p className="text-gray-600 italic mb-2">{plantInfo.scientificName}</p>
                  <p className="text-gray-700">{plantInfo.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">Watering Schedule</h4>
                  <p>{plantInfo.watering}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-800 mb-2">Light Requirements</h4>
                  <p>{plantInfo.light}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2">Soil Requirements</h4>
                  <p>{plantInfo.soil}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-bold text-purple-800 mb-2">Fertilizer Needs</h4>
                  <p>{plantInfo.fertilizer}</p>
                </div>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg mb-6">
                <h4 className="font-bold text-indigo-800 mb-2">Cultivation Timeline</h4>
                <p>{plantInfo.timeline}</p>
              </div>
              
              <button
                onClick={addToMyCrops}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
              >
                Add to My Crops
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No plant information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload an image or search for a plant to see information here
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">My Crops</h2>
          <span className="bg-green-100 text-green-800 text-sm font-semibold px-2.5 py-0.5 rounded">
            {myCrops.length} crops
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCrops.map((crop) => (
            <div key={crop.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
              <img src={crop.imageUrl} alt={crop.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{crop.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Watering:</span>
                    <span className="font-medium">{crop.watering}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Light:</span>
                    <span className="font-medium">{crop.light}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Harvest:</span>
                    <span className="font-medium">{crop.timeline}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlantInfo;