'use client'

import { useState, useEffect } from 'react';
import { pb } from '../../../components/UserAuthentication';

import NavBarLogged from '../../../components/NavBarLogged';
import SideBar from '../../../components/SideBar';

export default function Settings() {
    const user: any = pb.authStore.model;

    type MyRecord = Record<string, number>;
    const [users, setUsers] = useState([] as MyRecord[]);
    const fetchUsers = async () => {
        let filters = 'created >= "2022-01-01 00:00:00" && id = "' + user.id + '"';
        try {
            const userList = await pb.collection('users').getList(1, 100, {
            filter: filters
            });
            setUsers(userList.items);
        } catch (error) {
            console.error(error);
        }
    };

    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const deleteAccount = () => {
        setShowDeleteForm(true);
    }
    const cancelDelete = () => {
        setShowDeleteForm(false);
    }

    const [usernameInput, setUsernameInput] = useState("");
    const [confirmationInput, setConfirmationInput] = useState("");

    const [disabled, setDisabled] = useState(true);
    useEffect(() => {
        if (usernameInput === user.username && confirmationInput === "I confirm the deletion of my account") {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [usernameInput, confirmationInput, user.username]);
    
    return (
        <main className="min-h-screen text-center sm:text-left">
            <div className='h-screen ml-48 pt-32 pb-16
                            flex justify-center items-start
                            bg-primary'>
                <div className='w-2/3 max-w-7xl h-full rounded-lg bg-zinc-50 drop-shadow-lg'>
                    <div className='flex flex-col justify-start px-3 pt-3'>
                        <p className='text-md font-bold tracking-wider text-secondary'>SETTINGS</p>
                        <p className='text-sm tracking-wide text-zinc-400'>Update your personal details here</p>
                        <div className='h-0.5 w-full mt-4 bg-zinc-300' />
                    </div>
                    <div className='grid grid-cols-2 w-fill h-5/6 gap-2 mt-2 mx-3'>
                        <div className='flex flex-col w-fill h-full'>
                            <div className='grid grid-cols-2 w-full'>
                                <img 
                                    src={user.avatar ? `https://folio-database.fly.dev/api/files/_pb_users_auth_/${user.id}/${user.avatar}` 
                                    : '../../../public/Default_PFP.jpg'} 
                                    className='m-2 w-36 h-36' 
                                    alt='pfp'
                                />
                                <div className='flex flex-col w-full h-full pt-2'>
                                    <p className='text-sm font-bold tracking-wider text-secondary'>Your Photo</p>
                                    <p className='text-xs tracking-wide text-zinc-400'>Update your photo here</p>
                                    <div className='flex flex-row self-start w-full h-full mt-10 text-sm gap-4'>
                                        <button className='h-5 rounded-lg text-zinc-400'>Upload</button>
                                        <button className='h-5 rounded-lg text-red-500'>Remove</button>
                                    </div>
                                </div>
                            </div>
                            <div className='h-0.5 w-full mt-2 bg-zinc-300' />
                            <div className='flex flex-col pt-2 h-max'>
                                <p className='text-sm font-bold tracking-wider text-secondary'>Your Details</p>
                                <p className='text-xs tracking-wide text-zinc-400'>Update your details here</p>
                                <div className='flex flex-row gap-2'>
                                    <input type='text' className='w-full h-8 mt-4 rounded-md bg-zinc-100 pl-2 text-sm border-2 border-zinc-200 focus:border-indigo-300 outline-none' placeholder='First Name' />
                                    <input type='text' className='w-full h-8 mt-4 rounded-md bg-zinc-100 pl-2 text-sm border-2 border-zinc-200 focus:border-indigo-300 outline-none' placeholder='Last Name' />
                                </div>
                                <input type='text' className='w-full h-8 mt-4 rounded-md bg-zinc-100 pl-2 text-sm border-2 border-zinc-200 focus:border-indigo-300 outline-none' placeholder='Email' />
                                <input type='text' className='w-full h-8 mt-4 rounded-md bg-zinc-100 pl-2 text-sm border-2 border-zinc-200 focus:border-indigo-300 outline-none' placeholder='Username' />
                                <textarea className='w-full h-28 mt-4 rounded-md bg-zinc-100 pl-2 text-sm border-2 border-zinc-200 focus:border-indigo-300 outline-none' placeholder='Bio' />
                                <button className='w-32 self-center h-8 mt-4 rounded-md bg-[#A3A0FB] text-zinc-50'>Save</button>
                            </div>
                        </div>
                        <div className='flex flex-col w-fill h-full'>
                            <div className='flex flex-col justify-start px-3 pt-3'>
                                <p className='text-sm font-bold tracking-wider text-secondary'>Your Github Link</p>
                                <p className='text-xs tracking-wide text-zinc-400'>Update your Github link here</p>
                                <div className='flex flex-row gap-2'>
                                    <input 
                                        type='text' 
                                        className='w-full h-8 mt-4 rounded-md bg-zinc-100 pl-2 text-sm border-2 border-zinc-200 focus:border-indigo-300 outline-none' 
                                        placeholder='Github Link' 
                                        pattern='^https://github.com/.*' 
                                        required
                                    />
                                    <button className='w-16 h-8 mt-4 rounded-md bg-[#A3A0FB] text-zinc-50'>Save</button>
                                </div>
                            </div>
                            <div className='h-0.5 w-full mt-4 bg-zinc-300' />
                            <div className='flex flex-col w-fill h-full'>
                                {showDeleteForm ? (
                                    <div className='flex flex-col justify-start px-3 pt-3'>
                                        <p className='text-sm font-bold tracking-wider text-secondary'>Delete Your Account</p>
                                        <p className='text-xs tracking-wide text-zinc-400'>Permanently delete your account here</p>
                                        <p className='text-xs tracking-wide text-justify text-amber-600 mt-2'>
                                            *If you wish to delete your account, please fill out the form below. This will permanently delete your account and all of your data.
                                            <span className='font-bold'> This action cannot be undone</span>.
                                        </p>
                                        <p className='text-xs tracking-wide mt-4 text-zinc-400'>Please type in <span className='font-bold'>{user.username}</span></p>
                                        <input
                                            type="text"
                                            className="w-full h-8 py-1 mt-2 rounded-md bg-zinc-100 pl-2 text-sm border-2 border-zinc-200 focus:border-indigo-300 outline-none"
                                            placeholder=""
                                            value={usernameInput}
                                            onChange={(event) => setUsernameInput(event.target.value)}
                                        />
                                        <p className='text-xs tracking-wide mt-3 text-zinc-400'>Please type in <span className='font-bold'>I confirm the deletion of my account</span></p>
                                        <input
                                            type="text"
                                            className="w-full h-8 py-1 mt-2 rounded-md bg-zinc-100 pl-2 text-sm border-2 border-zinc-200 focus:border-indigo-300 outline-none"
                                            placeholder=""
                                            value={confirmationInput}
                                            onChange={(event) => setConfirmationInput(event.target.value)}
                                        />
                                        <div className='flex flex-row self-center justify-center w-full h-full mt-6 text-sm gap-4'>
                                            <button onClick={cancelDelete} className='h-7 w-16 self-center rounded-md bg-zinc-500 text-zinc-50'>Cancel</button>
                                            <button className={`h-7 w-36 self-center rounded-md text-sm ${disabled ? 'bg-zinc-300' : 'bg-red-500'} text-zinc-50`} disabled={disabled}>Delete My Account</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex flex-col justify-start px-3 pt-3'>
                                        <p className='text-sm font-bold tracking-wider text-secondary'>Delete Your Account</p>
                                        <p className='text-xs tracking-wide text-zinc-400'>Permanently delete your account here</p>
                                        <button onClick={deleteAccount} className={`h-7 w-20 self-center rounded-md mt-6 text-sm bg-red-500 text-zinc-50`}>Delete</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NavBarLogged />
            <SideBar />
        </main>
    )
}