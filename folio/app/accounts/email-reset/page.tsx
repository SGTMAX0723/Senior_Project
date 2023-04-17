'use client'
import Link from 'next/link';
import { useForm } from 'react-hook-form'
import PocketBase from 'pocketbase';
import { useState, useEffect } from 'react';

export const pb = new PocketBase('https://folio-database.fly.dev');
pb.autoCancellation(false);

function page() {

  const { register, handleSubmit,  formState: {errors} } = useForm();



  // Get everyone's emails
  const [emails, setEmails] = useState<string[]>([]);
  async function fetchUsers() {
      try {
        const users = await pb.collection('users').getList(1, 100000, {
          filter: 'created >= "2022-01-01 00:00:00"',
        });
        setEmails(users.items.map((item) => item.email));
      } catch (error) {
        console.log(error);
      }
  };
 
  useEffect(() => {
      fetchUsers();
  },  []);
  // end of fetching emails and 



  function emailExists(value: string) {
    console.log(emails);
    if(emails.includes(value)){
      return 'emails already exists';
    }
    return true;
  }


  async function updateEmail(data: any) {
    const userEmail = data.email;
    const userPassword = data.password;
    const newEmail = data.newemail 
  
    try {
      // Authenticate with the email and password to get the token
      const response = await pb.collection('users').authWithPassword(userEmail, userPassword);
      const token = response.token; 
    
          // Request an email change
          await pb.collection('users').requestEmailChange(newEmail);
      
          //confirm email
          await pb.collection('users').confirmEmailChange(token, userPassword);
      
          console.log('Email change successful');

    } catch (error) {
      console.error('Error updating email:', error);
    }
  }

  return (
    <div className='grid grid-cols-1 gap-10 place-items-center min-h-screen'>
      <div className="flex flex-col items-center space-y-6">
        <h1 className=" text-3xl font-bold">FOLIO</h1>
        <p>Reset Email address </p>
        <form onSubmit={handleSubmit(updateEmail)} className="flex flex-col items-center space-y-4">
          <div>
            <label className="sr-only">Email address</label>
            <input {...register("email", {required: "Email is required"})} name="email" type="email" className="w-96 appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address"></input>
            {errors.email && <p className="text-red-500 text-sm">{(errors.email.message as string)}</p>}
          </div>
          <div>
            <label className="sr-only">Password</label>
            <input {...register("password", {required: "Password is required"})} name="password" type="password" className="w-96 appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password"></input>
            {errors.password && <p className="text-red-500 text-sm">{(errors.password.message as string)}</p>}

          </div>
          <div>
          <label className="sr-only">New Email address</label>
          <input
            {...register("newemail", {
                required: "Email is required",
                validate: {
                  emailExists: (value) => emailExists(value) || "Email already exists",
                },
              })}
              name="newemail"
              type="email"
              className="w-96 appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="New Email address"
            />

            {errors.newemail && ( <p className="text-red-500 text-sm">{(errors.newemail.message as string)}</p>)}
          </div>

          <button type='submit' className="bg-indigo-900 py-2 px-16 rounded text-white font-bold">Reset</button>
        </form>
        <Link href='/login'>
          <a className='underline'>Login</a>
        </Link>
      </div>
    </div>
  )
}

export default page
