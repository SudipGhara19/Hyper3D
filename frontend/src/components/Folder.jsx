import React, { act, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import DeleteFolderModal from './modals/folderModals/DeleteFolderModal';
import AddModelModal from './modals/folderModals/AddModelModal';
import ModelCards from './ModelCards';

function Folder() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get("tab");

  const { folders } = useSelector((state) => state.folders);
  const folderData = folders.filter((f) => f.name === activeTab)[0];

  const [showDelete, setShowDelete] = useState(false);
  const [showAddModel, setShowAddModel] = useState(false);

  return (
    <>
      <div className='w-full h-auto'>
        <div className='w-full h-auto flex flex-col items-center'>

          {/* Top section */}
          <div className='w-full mt-32 md:mt-16 flex items-center justify-center gap-3'>
            {/* Create Folder */}
            <div className='flex gap-4 items-center justify-start py-3 md:py-5 px-4 md:px-10 bg-red-300 rounded-lg'>
              <p className='text-base md:text-xl text-zinc-700 font-bold'>Delete Folder: </p>
              <img
                onClick={() => setShowDelete(true)}
                className='w-12 md:w-14 cursor-pointer transform transition-transform ease-in-out duration-300 hover:scale-110'
                src="/delete-folder.webp"
                alt="create-f" />
            </div>
            {/* Add 3D Model */}
            <div className='flex gap-4 items-center justify-start py-3 md:py-5 px-4 md:px-10 bg-blue-200 rounded-lg'>
              <p className='text-base md:text-xl text-zinc-700 font-bold'>Add Model: </p>
              <img
                onClick={() => setShowAddModel(true)}
                className='w-16 md:w-20 cursor-pointer transform transition-transform ease-in-out duration-300 hover:scale-110'
                src="/3d-icon.webp"
                alt="add-f" />
            </div>
          </div>

          <ModelCards models={folderData.models} fName={folderData.name} />
        </div>
      </div>

      {showDelete && <DeleteFolderModal showModal={showDelete} setShowModal={setShowDelete} fName={folderData?.name} />}
      {showAddModel && <AddModelModal showModal={showAddModel} setShowModal={setShowAddModel} fName={folderData?.name} />}
    </>
  )
}

export default Folder