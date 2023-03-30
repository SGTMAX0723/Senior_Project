'use client'

import { BsThreeDots } from "react-icons/bs";
import { useState, useEffect, useRef } from 'react';
import ProjectDropdown from './ProjectDropdown';

const ImageContainerDashboard = (props) => {
    const [isIconClicked, setIsIconClicked] = useState(false);
    const projDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isIconClicked && !projDropdownRef.current.contains(event.target)) {
                setIsIconClicked(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isIconClicked]);

    const handleIconClick = () => {
        setIsIconClicked(!isIconClicked);
    };

    const lastUpdatedDate = new Date(props.updated);
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - lastUpdatedDate.getTime(); // get the difference in milliseconds

    const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds
    const oneMonth = 30 * oneDay; // one month in milliseconds
    const oneYear = 12 * oneMonth; // one year in milliseconds

    let diffText;
    if (timeDiff < oneDay) {
        diffText = "Today";
    } else if (timeDiff < 2 * oneDay) {
        diffText = "Yesterday";
    } else if (timeDiff < oneMonth) {
        diffText = `${Math.floor(timeDiff / oneDay)} days ago`;
    } else if (timeDiff < 2 * oneMonth) {
        diffText = "1 month ago";
    } else if (timeDiff < oneYear) {
        diffText = `${Math.floor(timeDiff / oneMonth)} months ago`;
    } else {
        diffText = `${Math.floor(timeDiff / oneYear)} years ago`;
    }

    const [showButton, setShowButton] = useState(false);

    return (
        <main className="max-w-7xl rounded-md">
            <div className="flex w-full h-40 max-w-7xl rounded-md bg-zinc-50 drop-shadow-md">
                <div className="h-5/6 w-1/5 self-center ml-4 overflow-hidden overflow-y-auto rounded-md">
                    {/* <img src={`https://folio-database.fly.dev/api/files/zncdy0gkg9xd30m/${props.id}/${props.project_img}`}/> */}
                    <div className="flex w-full h-full bg-gradient-to-r from-[#A3A0FB] to-[#E53F71] justify-center items-center"
                        onMouseEnter={() => setShowButton(true)}
                        onMouseLeave={() => setShowButton(false)}>
                        {showButton && (
                            <button onClick={props.load_project} className="bg-secondary hover:brightness-150 text-white py-2 px-4 rounded-md">
                                Load Project
                            </button>
                        )}
                    </div>
                </div>
                <div className="flex flex-col justify-center items-start mx-16 flex-grow">
                    <button onClick={props.load_project}>
                        <h2 className="text-xl font-medium"><span className="hover:text-[#A3A0FB]">{props.project_name}</span></h2>
                    </button>
                    <div className="flex justify-between items-center w-full">
                        <p className="text-sm text-gray-600 mt-2">Template - Blank Template</p>
                    </div>
                </div>
                <div className="h-full">
                    <button onClick={handleIconClick} className="place-self-start pt-4 pr-6" ref={projDropdownRef}>
                        <BsThreeDots className="text-lg" />
                        {isIconClicked && (
                            <div className="z-10">
                                <ProjectDropdown id={props.id} />
                            </div>
                        )}
                    </button>
                    <p className="text-sm text-gray-600 absolute bottom-0 right-0 pb-8 pr-12 z-0">{diffText}</p>
                </div>
            </div>
        </main>
    );
};

export default ImageContainerDashboard;