import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa6';
import { IoMdClose } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
import { addFolder } from '../../../api/folderService';
import { setFoldersData } from '../../../redux/folderSlice';
import { useDispatch } from 'react-redux';



function AddFolder({ showModal, setShowModal }) {

    const [loading, setLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [folderName, setFolderName] = useState("");

    const dispatch = useDispatch();

    //------------------------- Adding Folder Func --------------------
    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (!folderName) {
                toast.error("Please write a folder name.");
                setLoading(false);
                return;
            }

            const response = await addFolder(folderName);

            if (response?.error) {
                return;
            }

            dispatch(setFoldersData(response.folders));
            toast.success("New transaction added successfully.");
            setIsAdded(true);

            setTimeout(() => {
                setShowModal(false);
            }, 2000);

        } catch (error) {
            console.log(error);
            toast.error("Error in adding transaction. Try again later.");
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
                    Add Folder Name
                </h2>

                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Folder Name"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex justify-center mt-4">
                    {isAdded ?
                        <div className="bg-green-600 px-4 py-2 rounded-md text-white flex justify-center items-center gap-2">
                            <FaCheck />
                            <span>Done</span>
                        </div>
                        :
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            {loading ?
                                <div className="flex justify-center items-center gap-2">
                                    <ClipLoader
                                        color="#ffffff"
                                        size={18}
                                        speedMultiplier={1}
                                    />
                                    <span>Adding...</span>
                                </div>
                                : 'Add'}
                        </button>}
                </div>
            </div>
        </div>
    )
}

export default AddFolder