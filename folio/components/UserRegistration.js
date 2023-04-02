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
    const { register, handleSubmit, formState, watch, reset } = useForm();
    const [DoesExist, setDoesExist] = useState(true);

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

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

    const emailValidation = (value) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailPattern.test(value)) {
          return "Invalid email address";
        }
        return true;
      };
    
    const passwordValidation = (value) => {
        if (value !== watch('password')) {
          return 'Passwords do not match';
        }
        return true;
      };
    
    
    
    return (
        <div className='h-100 grid grid-cols-1 gap-4 content-around '>
          <form onSubmit={handleSubmit(checkIfExists)} className=" w-96 grid justify-items-stretch justify-self-center space-y-2">
            <h1 className='flex items-center justify-center mt-20 font-bold text-3xl ' >FOLIO</h1>
            
            <p className=' flex items-center justify-center' > Please complete to create your account.</p>

            {formState.errors.username && <p className="text-red-500">Username is required.</p>}
            <input name="username" type="text" {...register('username', {required: true}, )} className=" w-96 grid justify-items-stretch 
            justify-self-center appearance-none rounded-none rounded-t-md rounded-b-md 
            border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 
            focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Username"></input>

            <div className='h-100 grid grid-cols-2 gap-1 content-around '>
                {formState.errors.firstname && <p className="text-red-500">firstname is required.</p>} 
                {formState.errors.lastname && <p className="text-red-500">lastname is required.</p>} 
            </div>
            <div className='h-100 grid grid-cols-2 gap-1 content-around '>
                   
                <input name="firstname" type="text" {...register('firstname', {required: true})}className=" place-self-end  w-48 appearance-none 
            rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 
            focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="First name"></input>
                <input name="lastname" type="text" {...register('lastname', {required: true})}className=" w-48 flex justify-items-end appearance-none 
            rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 
            focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Last name"></input>
            </div>
    
            
            <label className="sr-only">Email address</label>
                {formState.errors.email && <p className='text-red-500'>
                {formState.errors.email.type === "required" ? "Email is required": formState.errors.email.message} </p>}
            <input name="email" type="text" {...register('email', {required: true,  validate: emailValidation})} className=" w-96 grid justify-items-stretch 
            justify-self-center appearance-none rounded-none rounded-t-md rounded-b-md 
            border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 
            focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address"></input>
    


            <label className="sr-only">Password</label>
            {formState.errors.password && <span className='text-red-500'> {formState.errors.password.type === 'minLength'
            ? formState.errors.password.message
            : 'Password is required'}</span>}
            <input name="password" type="password" {...register('password' , { required: true, minLength: { value: 8, message: 'Password must be at least 8 characters'} })}className="w-96  grid justify-items-stretch 
            justify-self-center appearance-none rounded-none rounded-t-md rounded-b-md 
            border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500
            focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password"></input>

            {formState.errors.confirm_pass && <span className='text-red-500'>{formState.errors.confirm_pass.message}</span>}
            <label className="sr-only">ConfirmPassword</label>
            <input name="confirmpassword" type="password" {...register('confirm_pass', { required: true, validate: passwordValidation })}className="w-96  grid justify-items-stretch 
            justify-self-center appearance-none rounded-none rounded-t-md rounded-b-md 
            border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 
            focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Confirm Password"></input>
             
    
    
            <div className='flex items-center justify-center' >
            
                <button  className="bg-indigo-900 py-2 px-16 rounded text-white bold "> Sign up </button>
    
            </div>
          </form>
    
          <Link href='/login' className='flex items-center justify-center underline'>
            Already have an account?
          </Link>
    
          
    
          {/*<div className='flex items-center justify-center'>
              <button>Terms of Private Policy</button>
            </div>    */}
        </div>
      )
    }

export default UserRegistration;
// (optional) send an email verification request
//await pb.collection('users').requestVerification('test@example.com');