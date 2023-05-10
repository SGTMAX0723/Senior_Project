'use client'

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { pb } from '../../../components/UserAuthentication';
import Link from 'next/link';
import NavBarLogged from '../../../components/NavBarLogged';
import SideBar from '../../../components/SideBar';
import { useForm } from 'react-hook-form';


export default function Settings() {
    const router = useRouter();
    const isLoggedIn = pb.authStore.isValid;
    const user: any = pb.authStore.model;

    type MyRecord = Record<string, number>;
    const [users, setUsers] = useState([] as MyRecord[]);

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.+[a-zA-Z]{3}$/i;

    // Get everyone's usernames and emails
    const [usernames, setUsernames] = useState<string[]>([]);
    const [emails, setEmails] = useState<string[]>([]);
    async function fetchUsers() {
        try {
          const users = await pb.collection('users').getList(1, 100000, {
            filter: 'created >= "2022-01-01 00:00:00"',
          });
          setUsernames(users.items.map((item) => item.username));
          setEmails(users.items.map((item) => item.email));
        } catch (error) {
          console.log(error);
        }
    };
   
    useEffect(() => {
        fetchUsers();
    },  [usernames, emails]);
    // end of fetching emails and usernames



    // Add the useForm hook with defaultValues
    const { register, handleSubmit, formState: {errors}} = useForm();

    const [firstname, Setfirstname] = useState("");
    const [lastname, Setlastname] = useState("");

    const parseName = () => {
        const nameParts = user.name.trim().split(' ');
    
        if (nameParts.length > 0) {
          Setfirstname(nameParts[0]);
        }
    
        if (nameParts.length > 1) {
          Setlastname(nameParts.slice(1).join(' '));
        }
      };
    
      useEffect(() => {
        parseName();
      }, []);

    const userValidation = (value: string) => {
        if(value === ''){
            return true;
        }
        if (usernames.includes(value)) {
          return "Username already exists";
        }
        return true;
    };
    
    const bioValidation = (value: string) => {

        if (value.length > 300) {
          return "Bio must not exceed 300 characters";
        }
        return true;
    };

    const [bioCharCount, setBioCharCount] = useState(0);

    

    const updateBioCharCount = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBioCharCount(event.target.value.length);
      };
    
    
      const updateName = (newFirstName: string, newLastName: string) => {
        const currentNameParts = user.name.trim().split(' ');
        const currentFirstName = currentNameParts[0] || '';
        const currentLastName = currentNameParts.slice(1).join(' ') || '';
      
        if (newFirstName === '') {
          newFirstName = currentFirstName;
        }
      
        if (newLastName === '') {
          newLastName = currentLastName;
        }
      
        return newFirstName + ' ' + newLastName;
    };

    

    const onSubmit = async (data: any) => {
        try {
          // Handle form submission logic here
          const userInfo: any = {};
      
          if (data.username) {
            userInfo.username = data.username;
          }
          if (data.bio){
            userInfo.bio = data.bio;
          }
      
          userInfo.name = updateName(data.firstName, data.lastName);
      
          const record = await pb.collection('users').update(user.id, userInfo);
      
          console.log(data);
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
    };
      
    const [githubLink, setGithubLink] = useState('');
    const [githubLinkError, setGithubLinkError] = useState(false);

    const [formSubmitted, setFormSubmitted] = useState(false);


    const handleGithubLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const githubPattern = /^https:\/\/github\.com\//;
      
        if (githubPattern.test(inputValue)) {
          setGithubLink(inputValue);
          setGithubLinkError(false);
        } else {
          setGithubLinkError(true);
        }
    };

    const onSubmitGithubLink = async (event: any) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!githubLinkError) {
            try {
                const userInfo = {
                    githubLink,
                };
    
                const record = await pb.collection('users').update(user.id, userInfo);
                console.log('GitHub link updated:', githubLink);
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
        } else {
            return;
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
        if (!isLoggedIn) {
            router.push('/login');
        } else {
            if (usernameInput === user.username && confirmationInput === "I confirm the deletion of my account") {
                setDisabled(false);
            } else {
                setDisabled(true);
            }
        }
    }, [usernameInput, confirmationInput, user && user.username]);

    if (!isLoggedIn) {
        return null;
    }

    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }
    
    return (
        <main className="min-h-screen text-center sm:text-left">
            <div className='h-screen ml-48 pt-32 pb-16
                            flex justify-center items-start
                            bg-primary'>
                <div className='w-2/3 max-w-7xl h-full rounded-lg bg-zinc-50 drop-shadow-lg'>
                    <div className='flex flex-col sm:cols justify-start px-3 pt-3'>
                        <p className='text-md font-bold tracking-wider text-secondary'>SETTINGS</p>
                        <p className='text-sm tracking-wide text-zinc-400'>Update your personal details here</p>
                        <div className='h-0.5 w-full mt-4 bg-zinc-300' />
                    </div>
                    <div className='grid grid-cols-2 w-fill h-5/6 gap-2 mt-2 mx-3'>
                        <div className='flex flex-col w-fill h-full'>
                            {/* update user avatar */}
                            {/* <div className='grid grid-cols-2 w-full'>
                                <img 
                                    src={user.avatar ? `https://folio-database.fly.dev/api/files/_pb_users_auth_/${user.id}/${user.avatar}` 
                                    : '../../../public/Default_PFP.jpg'} 
                                    className='m-2 w-36 h-36 rounded-sm' 
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

                            <div className='h-0.5 w-full mt-2 bg-zinc-300' /> */}
                            <div className='flex flex-col pt-2 h-max'>
                                <p className='text-sm font-bold tracking-wider text-secondary'>Your Details</p>
                                <p className='text-xs tracking-wide text-zinc-400'>Update your details here</p>
                                <form  onSubmit={handleSubmit(onSubmit)}>
                                    <div className='grid grid-cols-2 grid-rows-2 mt-2'> 
                                        <p className='w-40 h-3 text-sm font-regular tracking-wider text-secondary'>First Name:</p>
                                        <p className='w-40 h-3 text-sm font-regular tracking-wider text-secondary'>Last Name:</p>    
                                    </div>
                                
                                    <div className='grid grid-cols-2'>   
                                        <input {...register('firstName')}  type='text' className='w-full h-8  rounded-md bg-zinc-100 pl-2 text-sm border-2 border-zinc-200 focus:border-indigo-300 outline-none' placeholder={firstname} />
                                        <input {...register('lastName')}  type='text' className='w-full h-8 rounded-md bg-zinc-100 pl-2 text-sm border-2 border-zinc-200 focus:border-indigo-300 outline-none' placeholder={lastname} />
                                    </div>
                                    
                                    <p className='mt-3 mb-1 text-sm font-regular tracking-wider text-secondary'>Username:</p>   
                                    <input {...register('username', {validate: userValidation})} type='text' className='w-full h-8 rounded-md bg-zinc-100 pl-2 text-sm border-2 border-zinc-200 focus:border-indigo-300 outline-none' placeholder={user.username} />
                                    {typeof errors.username?.message === 'string' && (<span className='text-red-500 text-sm'>{errors.username.message}</span>)}
                                    
                                    <p className='mt-3 mb-1 text-sm font-regular tracking-wider text-secondary'>Bio:</p> 
                                    <textarea {...register('bio', {validate: bioValidation} )} onChange={updateBioCharCount} className='w-full h-28 max-h-64 rounded-md bg-zinc-100 pl-2 text-sm border-2 border-zinc-200 focus:border-indigo-300 outline-none' placeholder={user.bio} />
                                    <p className='mt-2 text-sm font-regular tracking-wider text-secondary'>Bio character count: {bioCharCount}/300</p>
                                    {typeof errors.bio?.message === 'string' && ( <span className='text-red-500 text-sm'>{errors.bio.message}</span> )}

                                    <button type='submit' className='w-32 self-center h-8 mt-4 rounded-md bg-[#A3A0FB] text-zinc-50'>Save</button>

                                </form>
                            </div>




                        </div>
                        <div className='flex flex-col w-fill h-full'>
                            <div className='flex flex-col justify-start px-3 pt-3'>
                            <p className='text-sm font-bold tracking-wider text-secondary'>Your Email</p>
                            <p className='text-xs tracking-wide text-zinc-400'>update your Email here</p>
                                <div>
                                    <Link href='/accounts/email-reset'>
                                        <a className='w-full h-8 mt-1 rounded-md bg-zinc-100 text-zinc-400 pl-2 text-sm border-2 border-zinc-200 hover:border-indigo-300 outline-none hover:bg-gray-100 flex items-center justify-center'>
                                            Click here to update your Email
                                        </a>
                                    </Link>
                                </div>


                                <p className='mt-3 text-sm font-bold tracking-wider text-secondary '>Your Github Link</p>
                                <p className='text-xs tracking-wide text-zinc-400'>Update your Github link here</p>
                                
                                <form onSubmit={(e) => onSubmitGithubLink(e)}>
                                    <div className='flex flex-row gap-2'>
                                        <input 
                                            type='text' 
                                            className='w-full h-8 mt-1 rounded-md bg-zinc-100 pl-2 text-sm border-2 border-zinc-200 focus:border-indigo-300 outline-none' 
                                            placeholder={user.githubLink} 
                                            onChange={handleGithubLinkChange}
                                        />
                                        <button type="submit" className='w-16 h-8 mt-1 rounded-md bg-[#A3A0FB] text-zinc-50'>Save</button>
                                    </div>
                                </form>

                                
                                {githubLinkError && formSubmitted && <span className='text-red-500 text-sm mt-2'>Link must start with https://github.com/</span>}


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