'use client'

import React, { useState, useEffect, useRef } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import  { pb } from 'components/UserAuthentication';
import Link from "next/link";
const isLoggedIn = pb.authStore.isValid;

const ImageContainerHome = (props) => {
    const [favorite, setFavorite] = useState(
        localStorage.getItem(`${props.id}-favorite`) === "false"
    );
    const [favorites, setFavorites] = useState(props.favorites);

    useEffect(() => {
        localStorage.setItem(`${props.id}-favorite`, favorite);
    }, [favorite, props.id]);

    const updateFavorite = async () => {
        try {
            if (favorite) {
                setFavorites(favorites + 1);
                await pb.collection('projects').update(`${props.id}`, { 'favorites': props.favorites + 1 });
            } else {
                setFavorites(favorites - 1);
                await pb.collection('projects').update(`${props.id}`, { 'favorites': props.favorites });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="max-w-7xl rounded-md">
            <div className="flex w-full h-40 max-w-7xl rounded-md bg-zinc-50 drop-shadow-md">
                <div className="h-5/6 w-1/5 self-center ml-4 overflow-hidden overflow-y-auto rounded-md">
                    {/* <img src={`https://folio-database.fly.dev/api/files/zncdy0gkg9xd30m/${props.id}/${props.project_img}`}/> */}
                    <div className="flex w-full h-full bg-gradient-to-r from-[#A3A0FB] to-[#E53F71] justify-center items-center"/>
                </div>
                <div className="flex flex-col justify-center items-start mx-16 flex-grow">
                    <Link href={`projects/${props.user_projects}/${props.project_name}`}>
                        <h2 className="text-xl font-medium"><span className="hover:text-[#A3A0FB]">{props.project_name}</span></h2>
                    </Link>
                    <div className="flex justify-between items-center w-full">
                        <p className="text-sm text-gray-600 mt-2">Template - Blank Template</p>
                    </div>
                </div>
                <div className="h-full">
                    <button className="text-sm place-self-start pt-8 pr-12">
                        <p>{props.user_name}</p>
                    </button>
                    <div className="flex flex-row">
                        <p className="text-sm text-gray-600 absolute bottom-0 right-0 pb-8 pr-20 pt-3.5">{favorites}</p>
                        {isLoggedIn ? 
                            <button onClick={() => {setFavorite(!favorite); updateFavorite();}} className="text-xl text-gray-600 absolute bottom-0 right-0 pb-8 pr-12">{!favorite ? <AiFillStar className="text-[#E0115F]"/> : <AiOutlineStar className="hover:text-zinc-400"/>}</button>
                            :
                            <button onClick={() => {setFavorite(!favorite); updateFavorite();}} className="text-xl text-gray-600 absolute bottom-0 right-0 pb-8 pr-12 pointer-events-none">{<AiFillStar className="text-zinc-300"/>}</button>
                        }
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ImageContainerHome;