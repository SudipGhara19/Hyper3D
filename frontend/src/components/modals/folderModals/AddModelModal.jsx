import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import { upload3dFile } from '../../../api/fileService.js';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import ErrorBoundary from '../../../utils/ErrorBoundary.jsx';


function ModelViewer({ fileUrl }) {
  const fileExtension = fileUrl.split('.').pop().toLowerCase();

  const gltf = useLoader(GLTFLoader, fileUrl, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');  // Ensure DRACO files are in `/public/draco`
    loader.setDRACOLoader(dracoLoader);

    // Only apply `.setPath()` logic for `.gltf` models (not `.glb`)
    if (fileExtension === 'gltf') {
      loader.setPath(fileUrl.substring(0, fileUrl.lastIndexOf('/') + 1));
    }
  });

  return <primitive object={gltf.scene} scale={2} />;
}

function AddModelModal({ showModal, setShowModal, fName }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [modelUrl, setModelUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

      if (['glb', 'gltf'].includes(fileExtension)) {
        setFile(selectedFile);

        try {
          const response = await upload3dFile(selectedFile, setProgress);
          if (response?.error) return;

          // Ensure Cloudinary URL formatting
          const formattedUrl = response.url.replace(/^https:\/\//, '');
          setModelUrl(`https://${formattedUrl}`);

          toast.success("File uploaded successfully!");
        } catch (error) {
          console.error(error);
          toast.error("Error in uploading. Try again later.");
        }
      } else {
        toast.error("Only .glb or .gltf files are allowed!");
        setFile(null);
      }
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !file) {
      toast.error("Please provide a valid name and upload a model file.");
      return;
    }

    setLoading(true);

    try {


      ;
    } catch (error) {
      console.error("Error adding model:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
        >
          <IoMdClose />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Add New Model
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Model Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter model name"
              required
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter description (optional)"
            />
          </div>

          {/* Model Preview */}
          {modelUrl && (
            <div className="w-full h-64 border rounded-lg overflow-hidden">
              <ErrorBoundary>
                <Canvas camera={{ position: [0, 0, 3] }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[1, 1, 1]} intensity={1} />
                  <ModelViewer fileUrl={modelUrl} />
                  <OrbitControls />
                </Canvas>
              </ErrorBoundary>
            </div>
          )}

          {/* Progress Bar */}
          {progress > 0 && (
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center text-gray-700 mt-2">{progress}%</p>
            </div>
          )}

          {/* Model File Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Upload Model (.glb or .gltf)</label>
            <input
              type="file"
              accept=".glb,.gltf"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            {isAdded ? (
              <div className="bg-green-600 px-4 py-2 rounded-md text-white flex items-center gap-2">
                <FaCheck />
                <span>Done</span>
              </div>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-800 transition"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <ClipLoader color="#ffffff" size={18} speedMultiplier={1} />
                    <span>Adding...</span>
                  </div>
                ) : 'Add Model'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddModelModal;
