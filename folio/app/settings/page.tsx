import SideBar from '../../components/SideBar'
import NavBarLogged from '../../components/NavBarLogged'


function page() {
  return (
    <div>
        <div className='xl:h-screen lg:h-screen md:h-screen sm:h-max pt-16 ml-48
                            flex
                            bg-primary'>

                <div className='container mx-auto my-auto'>
                    <div className='grid grid-cols-1 gap-16 justify-items-center '>
                        
                        <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-3 mt-6'>
                            <div>
                                <img class="inline-block h-36 w-36 rounded-full" 
                                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="https://cdn140.picsart.com/364832977021201.png"/>
                            </div>
                            <button className='bg-indigo-900 w-40 h-9 self-center justify-self-center rounded text-white bold'> Upload new photo </button>

                        </div>

                        <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-3'>
                            <input name="firstname" type="firstname" className=" w-48 justify
                            appearance-none rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="First name"></input>

                            <input name="lastname" type="Lastname" className=" w-48 flex justify-items-end appearance-none rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Last name"></input>
                        </div>

                        <label className="sr-only">Email address</label>
                        <input name="email" type="email" className=" md:w-96 sm:w-80 grid justify-items-stretch justify-self-center appearance-none rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address"></input>

                        

                        <div className='grid md:grid-cols-2 sm:grid-cols-1 sm:gap-4 md:gap-3'>

                            <input name="Country" type="Country" className=" w-48 justify
                            appearance-none rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Country"></input>

                            <input name="Phonenumber" type="Phonenumber" className=" w-48 flex justify-items-end appearance-none rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Phone number"></input>

                            


                        </div>
                        
                        <div className='grid md:grid-cols-2 sm:grid-cols-1 sm:gap-4 md:gap-20'>

                            <button className='bg-orange-400 w-40 h-9 self-center rounded  text-black bold'> Reset password </button>

                            <button className='bg-indigo-900 w-40 h-9 self-center justify-self-center rounded text-white bold'> Delete account </button>
                        </div>
                        
                    </div>
                </div>
            </div>

    <NavBarLogged />
    <SideBar />
    </div>
  )
}

export default page