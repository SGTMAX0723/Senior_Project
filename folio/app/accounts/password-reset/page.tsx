import Link from 'next/link';


function page() {
  return (
    <div className='grid grid-cols-1 gap-10 place-items-center '>
        
        <h1 className=" mt-20 text-3xl font-bold ">FOLIO</h1>

        <p>Enter your email and we'll send you a password reset link</p>

        <label className="sr-only">Email address</label>
        <input name="email" type="email" className=" w-96  grid justify-items-stretch justify-self-center appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address"></input>

        <button className="bg-indigo-900 py-2 px-16 rounded text-white bold "> Reset </button>

        <Link href='/login' className='underline'>Login</Link>

    </div>
  )
}

export default page