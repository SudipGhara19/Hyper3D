import React from 'react'
import { useSelector } from 'react-redux'

function Folders() {

  const { folders } = useSelector((state) => state.folders);

  return (
    <div className='w-full h-auto'>
      <div className='w-full h-auto flex flex-col items-center'>
        {/* Create Folder */}
        <div className='flex gap-4 items-center justify-start py-10'>
          <p className='text-xl text-zinc-700 font-bold'>Create Folder: </p>
          <img
            className='w-16 cursor-pointer transform transition-transform ease-in-out duration-300 hover:scale-110'
            src="/create-folder.webp"
            alt="create-f" />
        </div>

        {folders.length < 1 ?
          <h1 className='text-xl font-semibold text-zinc-600'>
            You have no folders yet, make one.
          </h1>
          :
          <div>

          </div>}
      </div>
    </div>
  )
}

export default Folders