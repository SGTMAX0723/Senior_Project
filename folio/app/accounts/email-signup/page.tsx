import Link from 'next/link';

export default function page() {
    return (
      <div className='h-100 grid grid-cols-1 gap-4 content-around '>
        
        <h1 className='flex items-center justify-center mt-20 font-bold text-3xl ' >FOLIO</h1>
        
        <p className=' flex items-center justify-center' > Please complete to create your account.</p>

        <div className='h-100 grid grid-cols-2 gap-1 content-around '>

        <input name="firstname" type="firstname" className=" place-self-end  w-48 appearance-none rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="First name"></input>
        <input name="lastname" type="Lastname" className=" w-48 flex justify-items-end appearance-none rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Last name"></input>
        </div>

        
        <label className="sr-only">Email address</label>
        <input name="email" type="email" className=" w-96 grid justify-items-stretch justify-self-center appearance-none rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address"></input>

        <label className="sr-only">Password</label>
        <input name="password" type="password" className="w-96  grid justify-items-stretch justify-self-center appearance-none rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password"></input>

        <label className="sr-only">ConfirmPassword</label>
        <input name="confirmpassword" type="password" className="w-96  grid justify-items-stretch justify-self-center appearance-none rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Confirm Password"></input>

        <div className='flex items-center justify-center'>
            <input type='checkbox'></input>
            <p> I agree with terms and conditions </p>
        </div>

        <div className='flex items-center justify-center' >
        
          <button className="bg-indigo-900 py-2 px-16 rounded text-white bold "> Sign up </button>

        </div>

        <Link href='/login' className='flex items-center justify-center underline'>
          Already have an account?
        </Link>

        

        <div className='flex items-center justify-center'>
            <button>Terms of Private Policy</button>
        </div>
      </div>
    )
  }