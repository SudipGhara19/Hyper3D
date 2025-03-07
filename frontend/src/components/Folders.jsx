import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddFolder from './modals/folderModals/AddFolder';

function Folders() {

  const { folders } = useSelector((state) => state.folders);

  const [showCreateFolder, setShowCreateFolder] = useState(false);

  return (
    <>
      <div className='w-full h-auto'>
        <div className='w-full h-auto flex flex-col items-center'>

          <div className='w-full mt-32 md:mt-16 flex items-center justify-center gap-3'>
            {/* Create Folder */}
            <div className='flex gap-4 items-center justify-start py-3 md:py-5 px-4 md:px-10 bg-violet-100 rounded-lg'>
              <p className='text-base md:text-xl text-zinc-700 font-bold'>Create Folder: </p>
              <img
                onClick={() => setShowCreateFolder(true)}
                className='w-12 md:w-16 cursor-pointer transform transition-transform ease-in-out duration-300 hover:scale-110'
                src="/create-folder.webp"
                alt="create-f" />
            </div>
            {/* Add 3D Model */}
            <div className='flex gap-4 items-center justify-start py-3 md:py-5 px-4 md:px-10 bg-blue-200 rounded-lg'>
              <p className='text-base md:text-xl text-zinc-700 font-bold'>Add Model: </p>
              <img
                className='w-12 md:w-16 cursor-pointer transform transition-transform ease-in-out duration-300 hover:scale-110'
                src="/3d-icon.webp"
                alt="add-f" />
            </div>
          </div>


          {folders.length < 1 ?
            <h1 className='text-xl font-semibold text-zinc-600'>
              You have no folders yet, make one.
            </h1>
            :
            <div className='w-full p-4 h-auto flex justify-around items-center flex-wrap'>
              {folders.map((f, i) =>
                <div
                  key={i}
                  className="w-1/2 md:w-1/4 py-6 h-auto flex flex-col items-center gap-2 relative">
                  <div className="relative w-[70%]">
                    <p className="absolute w-8 h-8 top-0 right-0 transform translate-x-1  translate-y-1 rounded-full bg-gray-400 text-white  text-sm flex justify-center items-center">
                      {f.models.length}
                    </p>
                    <img
                      className="w-full cursor-pointer transform transition-transform ease-in-out duration-300 hover:scale-110"
                      src="/folder.webp"
                      alt={f.name}
                    />
                  </div>
                  <p className="text-base font-semibold text-zinc-700">{f.name}</p>
                </div>
              )}
            </div>}
        </div>
      </div>

      {showCreateFolder && <AddFolder showModal={showCreateFolder} setShowModal={setShowCreateFolder} />}
    </>
  )
}

export default Folders