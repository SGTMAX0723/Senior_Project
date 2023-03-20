'use client'

import { useRouter } from 'next/navigation';
import SideBar from '../../../components/SideBar'
import NavBarLogged from '../../../components/NavBarLogged'
import { useEffect, useState } from 'react';
import  { pb } from 'components/UserAuthentication';
import Link from 'next/link';
import UploadPhoto from 'components/UploadPhoto'

export default function Settings() {

    const isLoggedIn = pb.authStore.isValid;
    const router = useRouter();

    const user: any = pb.authStore.model

    //Place Profile picture in a useState 
    const [profilePicture, setProfilePicture] = useState(`https://folio-database.fly.dev/api/files/_pb_users_auth_/${user.id}/${user.avatar}`)

    //Create a popup window this popup window ill take a file input of an image that will let you change your photo
    const [buttonPopup, setbuttonPopup] = useState(false);

    
    const handleUpdatePicture = async (selectedFile: any) => {
        try {
            console.log('handleUpdatePicture called'); 
            const record = await pb.collection('users').update('avatar', selectedFile);
            console.log('record', record); 
            return console.log(record);
        } catch (error){
            console.error(error);
            console.log();
        }
    }

    if (isLoggedIn) {
        return (
            <div>
                <div className='xl:h-screen lg:h-screen md:h-screen sm:h-max pt-16 ml-48
                                    flex
                                    bg-primary'>
        
                        <div className='container mx-auto my-auto'>
                            <div className='grid grid-cols-1 gap-2 space-y-4 justify-items-center '>
                                
                                <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-3 mt-4'>
                                    <div>
                                        <img className="inline-block h-36 w-36 rounded-full" 
                                        src={profilePicture} />
                                    </div>
                                    <button onClick={() => setbuttonPopup(true)} className='bg-indigo-900 w-40 h-9 self-center justify-self-center rounded text-white bold'> Upload new photo </button>

                                </div>

                                <UploadPhoto 
                                    trigger={buttonPopup} 
                                    setTrigger={setbuttonPopup} 
                                    profilePicture={profilePicture} 
                                    setProfilePicture={setProfilePicture} 
                                    handleUpdatePicture={handleUpdatePicture} 
                                />
                                
                                <div>
                                    <p>Name</p>
                                    <input name="name" type="name" className=" md:w-96 sm:w-80 grid justify-items-stretch justify-self-center appearance-none rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder={user.name}></input>
                                </div>
                                        
                                <div>
                                    <p>Email</p>
                                    <p className=" md:w-96 sm:w-80 grid justify-items-stretch justify-self-center appearance-none bg-white rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">{user.email}</p>
                                </div>

                                <div>
                                    <p>Github</p>
                                    <input name="github" type="github" className=" md:w-96 sm:w-80 grid justify-items-stretch justify-self-center appearance-none rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder={user.githubLink}></input>

                                </div>
        
                                
                                <div className='grid md:grid-cols-2 sm:grid-cols-1 sm:gap-4 md:space-x-6'>

                                    <Link href='/accounts/password-reset'>
                                    <button className='bg-orange-400 w-40 h-9 self-center rounded  text-black bold'> Reset password </button>
                                    </Link>
                                    <button className='bg-indigo-900 w-40 h-9 self-center justify-self-center rounded text-white bold'> Delete account </button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
        
            <NavBarLogged />
            <SideBar />
            </div>
        )
    } else {
        router.push('/login')
    }
}