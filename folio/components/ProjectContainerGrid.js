'use client'

import { BsThreeDots } from "react-icons/bs";
import { useState, useEffect, useRef } from 'react';
import ProjectDropdown from './ProjectDropdown';

const ProjectContainerGrid = (props) => {
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
            <div className="flex flex-col h-60 rounded-md bg-zinc-50 drop-shadow-md">
                <div className="h-3/5 w-full overflow-hidden overflow-y-auto rounded-t-md">
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
                <div className="grid grid-col-2 h-2/5">
                    <div>
                        <div className="grid grid-cols-2 w-full h-full">
                            <button className="w-full items-center justify-start pl-4" onClick={props.load_project}>
                                <div className="flex w-full text-xl hover:text-[#A3A0FB] font-medium">
                                    <p className="truncate">{props.project_name}</p>
                                </div>
                            </button>
                            <p className="flex w-full items-center justify-end pr-6 text-sm text-gray-600">Blank Template</p>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleIconClick} className="absolute bottom-0 right-0 pb-4 pr-6" ref={projDropdownRef}>
                            <BsThreeDots className="text-lg" />
                            {isIconClicked && (
                                <div className="dropdown-menu">
                                    <ProjectDropdown id={props.id} />
                                </div>
                            )}
                        </button>
                        <p className="text-sm text-gray-600 absolute bottom-0 left-0 pb-4 pl-4">{diffText}</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProjectContainerGrid;