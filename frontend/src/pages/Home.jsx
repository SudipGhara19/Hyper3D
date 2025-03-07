import React from 'react';
import { useLocation } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { TbHexagon3D } from "react-icons/tb";
import { FaRegFolderOpen } from "react-icons/fa6";
import { PiFoldersFill } from "react-icons/pi";
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import Folders from '../components/Folders';
import AllModels from '../components/AllModels';
import Folder from '../components/Folder';

function Home() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const activeTab = queryParams.get("tab") || "dashboard";

    // Define a mapping of tabs to icons and titles
    const tabInfo = {
        dashboard: { title: "Dashboard", icon: <LuLayoutDashboard className="inline-block mr-2 text-violet-600" /> },
        folders: { title: "Folders", icon: <PiFoldersFill className="inline-block mr-2 text-violet-600" /> },
        allModels: { title: "All Models", icon: <TbHexagon3D className="inline-block mr-2 text-violet-600" /> },
    };

    return (
        <div className='w-screen h-screen flex'>
            {/* Sidebar - Fixed at 20% width on desktop, hidden on mobile */}
            <div className='w-[20%] h-screen bg-gray-800 md:block hidden fixed left-0 top-0'>
                <Sidebar />
            </div>

            {/* Main Content - Scrollable */}
            <div className='w-full md:w-[80%] ml-auto h-screen overflow-y-auto p-2 md:p-5'>
                <h1 className="fixed bg-white z-10 w-full md:w-[80%] text-center top-0 pt-20 md:pt-3 text-2xl font-bold flex items-center justify-center pb-3 border-b-[1px] border-gray-300 ">
                    {tabInfo[activeTab] ? tabInfo[activeTab]?.icon :
                        <FaRegFolderOpen className="inline-block mr-2 text-violet-600" />
                    }

                    {tabInfo[activeTab] ? tabInfo[activeTab]?.title : activeTab}
                </h1>

                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'folders' && <Folders />}
                {activeTab === 'allModels' && <AllModels />}
                {activeTab !== 'dashboard' && activeTab !== 'folders' && activeTab !== 'allModels' && <Folder />}
            </div>

            {/* Mobile Navbar - Only visible on small screens */}
            <div className='fixed top-0 w-full bg-gray-800 z-20 md:hidden'>
                <Sidebar />
            </div>
        </div>
    );
}

export default Home;
