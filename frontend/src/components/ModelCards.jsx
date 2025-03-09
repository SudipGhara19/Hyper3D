import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { format } from 'date-fns';
import { FaTrash } from 'react-icons/fa';
import DeleteModel from './modals/DeleteModel.jsx';

function AnimatedModel({ modelUrl }) {
    const { scene } = useGLTF(modelUrl);
    const modelRef = useRef();

    // Rotation and Floating Animation
    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.01; // Slow rotation
            modelRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.2; // Floating effect
        }
    });

    return <primitive ref={modelRef} object={scene} scale={1.5} position={[0, -0.5, 0]} />;
}

function ModelCards({ models }) {

    if (!models || models.length === 0) {
        return <p className="text-center text-gray-500 py-4">No models found.</p>;
    }

    const [isDeleting, setIsDeleting] = useState(false);
    const [modelToDelete, setModelToDelete] = useState(null);

    const handleDeleteFunc = (data) => {
        setModelToDelete(data);
        setIsDeleting(true);
    }

    return (
        <>
            <div className="w-full h-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {models.map((model) => (
                    <div
                        key={model._id}
                        className="bg-white border border-gray-300 rounded-2xl shadow-md overflow-hidden 
                    relative group transition-transform duration-300 transform hover:scale-105 
                    hover:shadow-2xl hover:shadow-violet-400/50"
                    >
                        {/* 3D Model Preview */}
                        <div className="w-full h-48 bg-gray-200">
                            <Canvas camera={{ position: [0, 2, 5] }}>
                                <ambientLight intensity={0.6} />
                                <directionalLight position={[2, 2, 2]} intensity={1} />
                                <AnimatedModel modelUrl={model.modelUrl} />
                                <OrbitControls enableZoom={true} />
                            </Canvas>
                        </div>

                        {/* Model Details */}
                        <div className="p-4 relative">
                            <h3 className="text-lg font-bold text-gray-800">{model.name}</h3>
                            <p className="text-sm text-gray-600 mt-2 truncate">
                                {model.description || 'No description available.'}
                            </p>
                            <p className="text-xs text-gray-400 mt-3">
                                Created on: {format(new Date(model.uploadedAt), 'dd MMM yyyy')}
                            </p>

                            {/* Delete Button (Hidden by Default) */}
                            <button
                                onClick={() => handleDeleteFunc(model)}
                                className="absolute top-4 right-4 text-red-500 opacity-0 translate-y-2
                            group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                            >
                                <FaTrash size={18} />
                            </button>

                            {/* View Button */}
                            <div className="mt-4">
                                <button
                                    className="w-full py-2 px-4 text-white bg-violet-600 rounded-lg transition-all 
                                duration-300 hover:bg-violet-800 hover:scale-105"
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isDeleting && <DeleteModel showModal={isDeleting} setShowModal={setIsDeleting} model={modelToDelete} />}
        </>
    );
}

export default ModelCards;
