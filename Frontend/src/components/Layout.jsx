import React, { useEffect, useLayoutEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom';

const Layout = () => {
    useLayoutEffect(() => {
        var role = localStorage.getItem("Role");
        if (role !== "Admin") {
            window.location.href = "/";
        }
    }, [])
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <div className="flex h-screen">
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                <div className="flex-1 overflow-auto">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden fixed top-4 left-4 z-20 bg-gray-800 text-white p-2 rounded-md"
                    >
                        {isSidebarOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                    <div className="p-4 lg:p-8">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout