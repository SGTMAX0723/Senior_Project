
'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import PocketBase from 'pocketbase';
export const pb = new PocketBase('https://folio-database.fly.dev');

pb.autoCancellation(false);


import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export function logoutWhileLoggedIn() {
    pb.authStore.clear();
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
}

const UserAuthentication = () => {
    const router = useRouter();

    const { register, handleSubmit, reset } = useForm();
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [incorrectPassword, setIncorrectPassword] = useState(false);

    const isLoggedIn = pb.authStore.isValid;

    async function login(data) {
        setIsLoading(true);
        try {
            const authData = await pb.collection('users').authWithPassword(
                data.email,
                data.password,
            );
            router.push('/accounts/dashboard/');
        } catch (error) {
            setIncorrectPassword(true);
        }
        setIsLoading(false);
        reset();
    }

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

    function LoggedIn() {
        if (isLoggedIn) {
            return (
                <main>
                    <h1 onload={router.push('/accounts/dashboard')}>Logged In: {pb.authStore.model.email}</h1>
                </main>
            );
        }
    }
    
    return (
        <main>
            <div className='h-screen grid grid-cols-1 content-around place-content-center sm:text-sm'>
                <form onSubmit={handleSubmit(login)} className=" w-96 grid justify-items-stretch justify-self-center space-y-2">
                    <h1 className='flex items-center justify-center 
                                    font-bold text-3xl pb-16'>
                        FOLIO
                    </h1>
                    <p className=' flex items-center justify-center pb-8' >Welcome back! Please log in to your account</p>
                    <input type="text" placeholder="Email" {...register('email')} className="appearance-none rounded-none rounded-t-md rounded-b-md border
                                                                                            border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 
                                                                                            focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"></input>
                    <input type="password" placeholder="Password" {...register('password')} className=" appearance-none rounded-none rounded-t-md rounded-b-md border 
                                                                                                        border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 
                                                                                                        focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"></input>
                    {incorrectPassword && <p className='flex items-center justify-center text-red-500'>Invalid email or password.</p>}
                    <div className='flex items-center justify-center pt-4'>
                        <button onClick={LoggedIn} type="submit" disabled={isLoading} className="bg-indigo-900 py-2 px-16 rounded text-white bold ">{isLoading ? "Loading" : "Login"}</button>
                    </div>

                    <div className='space-y-2 pt-16'>
                        <Link href='/accounts/email-signup' className='flex items-center justify-center'>
                            Create an account 
                        </Link>
                        <Link href='/accounts/password-reset' className='flex items-center justify-center'> Forgot Password? </Link>
                    </div>
                </form>

                <div className='flex items-center justify-center'>
                    <button>Terms of Privacy Policy</button>
                </div>
            </div>
        </main>
    );
}

export default UserAuthentication;