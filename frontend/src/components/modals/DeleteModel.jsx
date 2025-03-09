import React, { useState } from 'react'
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { deleteModel } from '../../api/modelService';
import { setFoldersData } from '../../redux/folderSlice';
import { toast } from 'react-toastify';

function DeleteModel({showModal, setShowModal, model}) {
    const [loading, setLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            setLoading(true);

            const response = await deleteModel(model.slug);

            if (response?.error) {
                return;
            }

            dispatch(setFoldersData(response.folders));
            toast.success("Model deleted successfully.");
            setIsDeleted(true);

            setTimeout(() => {
                setShowModal(false);
            }, 1500);

        } catch (error) {
            console.log(error);
            toast.error("Error in deleting model. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white p-6 rounded-lg w-[90%] max-w-sm shadow-lg text-center">
                <AiOutlineExclamationCircle className="text-red-500 text-5xl mx-auto mb-3" />
                <h2 className="text-lg font-semibold text-gray-800">Are you sure?</h2>
                <p className="text-gray-600 text-sm mb-4">Do you really want to delete this model? This action cannot be undone.</p>

                {isDeleted ? <div className="bg-green-600 px-4 py-2 rounded-md text-white flex justify-center items-center gap-2">
                    <FaCheck />
                    <span>Done</span>
                </div>
                    :
                    <div className="flex justify-center gap-4">
                        <button
                            disabled={loading}
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                            {loading ?
                                <div className="flex justify-center items-center gap-2">
                                    <ClipLoader
                                        color="#ffffff"
                                        size={18}
                                        speedMultiplier={1}
                                    />
                                    <span>Deleting...</span>
                                </div>
                                : 'Delete'}
                        </button>
                        <button
                            disabled={loading}
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                        >
                            No, Cancel
                        </button>
                    </div>}
            </div>
        </div>
    );
}

export default DeleteModel