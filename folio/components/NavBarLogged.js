'use client'

import { IoNotifications } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { pb } from "./UserAuthentication";


const NavBarlogged = () => {
    // Re-renders the component after the first render
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        // This forces a rerender, so the page is rendered
        // the second time but not the first
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    let user = pb.authStore.model;

    return(
        <main>
            <div className="fixed top-0 h-16 w-screen pl-48
                            justify-center items-center grid grid-cols-3
                            bg-zinc-50 text-zinc-50">
                <Link href='/templates'>
                    <button class="text-gray-800 justify-self-start pl-16
                                    font-semibold text-s tracking-[.20em] col-start-1">
                        CREATE
                    </button>
                </Link>
                
                <div className="flex relative mx-auto text-zinc-500 xl:visible lg:visible md:invisible min-[0px]:invisible max-sm:invisible">
                    <input className="bg-zinc-50 h-10 w-64 pl-10 text-sm focus:outline-none tracking-[.07em]" type="search" name="search" placeholder="Search users or projects"/>
                    <button type="submit" className="absolute inset-y-0 left-0 mx-auto items-center">
                        <SearchBar icon={<IoIosSearch size="20"/> } />
                    </button>
                </div>
                <div class="flex -space-x-2 col-start-3 justify-self-end pr-16 items-center">
                    <NavBarIcon icon={<IoNotifications size="18"/> } text={<p className='pr-8'></p>}/>
                    <p class="flex pr-8 text-secondary justify-center xl:visible lg:visible md:visible md:w-36 min-[0px]:invisible max-sm:invisible">{user.name}</p>
                    
                    <img class="inline-block h-11 w-11 rounded-full" src={`https://folio-database.fly.dev/api/files/_pb_users_auth_/${user.id}/${user.avatar}`} />

                </div>
            </div>
        </main>
    );
};

//for NavBar icons notification button
const NavBarIcon = ({ icon, text }) => (
    <div className='navbar-icon'>
        {icon}
        {text}
    </div>
);
//for creating the search bar
const SearchBar = ({icon, text}) =>(
    <div className='searchbar'>
        {icon}
        {text}
    </div>
)

export default NavBarlogged;
