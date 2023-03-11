'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PocketBase from 'pocketbase';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const pb = new PocketBase('https://folio-database.fly.dev');
pb.autoCancellation(false);


const UserRegistration =()=>{
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [DoesExist, setDoesExist] = useState(true);

    async function registerUser(data){
        const userInfo = {
            "username": data.username,
            "email": data.email,
            "emailVisibility": true,
            "password": data.password,
            "passwordConfirm": data.confirm_pass,
            "name": data.fname + ' '+ data.lname,
        };
        console.log(userInfo);
        const record = await pb.collection('users').create(userInfo);
        console.log(record);
        setTimeout(() => {login(userInfo)});
    }

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

    async function checkIfExists(data) {
        setIsLoading(true);
        try {
            const authData = await pb.collection('users').authWithPassword(
                data.email,
            );
            alert(error);
            
        } catch (error) {
            setDoesExist(false);
            registerUser(data);
        }
        setIsLoading(false);
    }
    
    
    
    
    return (
        <div className='h-100 grid grid-cols-1 gap-4 content-around '>
          <form onSubmit={handleSubmit(checkIfExists)} className=" w-96 grid justify-items-stretch justify-self-center space-y-2">
            <h1 className='flex items-center justify-center mt-20 font-bold text-3xl ' >FOLIO</h1>
            
            <p className=' flex items-center justify-center' > Please complete to create your account.</p>

            <input name="username" type="text" {...register('username')} className=" w-96 grid justify-items-stretch 
            justify-self-center appearance-none rounded-none rounded-t-md rounded-b-md 
            border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 
            focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Username"></input>

            <div className='h-100 grid grid-cols-2 gap-1 content-around '>
            
            <input name="firstname" type="text" {...register('fname')}className=" place-self-end  w-48 appearance-none 
            rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 
            focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="First name"></input>
            <input name="lastname" type="text" {...register('lname')}className=" w-48 flex justify-items-end appearance-none 
            rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 
            focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Last name"></input>
            </div>
    
            
            <label className="sr-only">Email address</label>
            <input name="email" type="text" {...register('email')} className=" w-96 grid justify-items-stretch 
            justify-self-center appearance-none rounded-none rounded-t-md rounded-b-md 
            border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 
            focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address"></input>
    
            <label className="sr-only">Password</label>
            <input name="password" type="password" {...register('password')}className="w-96  grid justify-items-stretch 
            justify-self-center appearance-none rounded-none rounded-t-md rounded-b-md 
            border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500
            focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password"></input>
    
            <label className="sr-only">ConfirmPassword</label>
            <input name="confirmpassword" type="password" {...register('confirm_pass')}className="w-96  grid justify-items-stretch 
            justify-self-center appearance-none rounded-none rounded-t-md rounded-b-md 
            border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 
            focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Confirm Password"></input>
    
            <div className='flex items-center justify-center'>
                <input type='checkbox'></input>
                <p> I agree with terms and conditions </p>
            </div>
    
            <div className='flex items-center justify-center' >
            
                <button  className="bg-indigo-900 py-2 px-16 rounded text-white bold "> Sign up </button>
    
            </div>
          </form>
    
          <Link href='/login' className='flex items-center justify-center underline'>
            Already have an account?
          </Link>
    
          
    
          <div className='flex items-center justify-center'>
              <button>Terms of Private Policy</button>
          </div>
        </div>
      )
    }

export default UserRegistration;
// (optional) send an email verification request
//await pb.collection('users').requestVerification('test@example.com');