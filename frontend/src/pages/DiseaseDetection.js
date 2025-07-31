import React, { useState } from 'react';

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState([
    {
      id: 1,
      date: '2023-06-15',
      disease: 'Tomato Blight',
      confidence: 92,
      treatment: 'Apply copper-based fungicide and remove affected leaves immediately.',
      imageUrl: 'https://images.unsplash.com/photo-1558351033-045e5c6bacd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 2,
      date: '2023-06-10',
      disease: 'Corn Rust',
      confidence: 87,
      treatment: 'Use resistant varieties and apply appropriate fungicides as recommended.',
      imageUrl: 'https://images.unsplash.com/photo-1558351033-045e5c6bacd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
    }
  ]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setDetectionResult(null);
    }
  };

  const handleDetect = () => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      // Mock detection result
      const mockResult = {
        disease: 'Tomato Early Blight',
        confidence: 95,
        treatment: 'Apply copper-based fungicide and remove affected leaves immediately. Ensure proper spacing between plants for air circulation.',
        severity: 'Moderate',
        recommendations: [
          'Water at the base of plants, not on leaves',
          'Remove and destroy infected plant material',
          'Apply mulch to prevent soil splash',
          'Consider crop rotation next season'
        ]
      };
      
      setDetectionResult(mockResult);
      setIsProcessing(false);
      
      // Add to history
      const newEntry = {
        id: history.length + 1,
        date: new Date().toISOString().split('T')[0],
        disease: mockResult.disease,
        confidence: mockResult.confidence,
        treatment: mockResult.treatment,
        imageUrl: previewUrl
      };
      
      setHistory([newEntry, ...history]);
    }, 3000);
  };

  const confidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">AI Disease Detection</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Upload Plant Image</h2>
          <p className="mb-4 text-gray-600">Upload a clear image of the affected plant leaf for AI analysis</p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
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
                    setDetectionResult(null);
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
            onClick={handleDetect}
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
                Analyzing with AI...
              </div>
            ) : (
              'Detect Disease'
            )}
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Detection Result</h2>
          
          {detectionResult ? (
            <div>
              <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-green-800">{detectionResult.disease}</h3>
                    <p className={`text-lg font-semibold ${confidenceColor(detectionResult.confidence)}`}>
                      Confidence: {detectionResult.confidence}%
                    </p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                    {detectionResult.severity}
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-bold mb-2">Recommended Treatment</h4>
                <p className="text-gray-700 mb-4">{detectionResult.treatment}</p>
                
                <h4 className="text-lg font-bold mb-2">Action Recommendations</h4>
                <ul className="list-disc pl-5 space-y-2">
                  {detectionResult.recommendations.map((rec, index) => (
                    <li key={index} className="text-gray-700">{rec}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2">Prevention Tips</h4>
                <ul className="list-disc pl-5 text-blue-700">
                  <li>Maintain proper plant spacing for air circulation</li>
                  <li>Water at the base of plants, not on leaves</li>
                  <li>Remove and destroy infected plant material</li>
                  <li>Apply preventive fungicides as recommended</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.758-.988-2.399l-.548-.547z"></path>
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No detection result</h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload an image and run detection to see results here
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Detection History</h2>
          <button className="text-green-600 hover:text-green-800 font-medium">
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disease</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treatment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {history.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{entry.disease}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-semibold ${confidenceColor(entry.confidence)}`}>
                      {entry.confidence}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">{entry.treatment}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={entry.imageUrl} alt="Plant" className="h-10 w-10 rounded" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;