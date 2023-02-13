import Link from 'next/link';

export default function Login() {
    return (
      <div className='h-100 grid grid-cols-1 gap-4 content-around '>
        
        <h1 className='flex items-center justify-center mt-20 font-bold text-3xl ' >FOLIO</h1>
        
        <p className=' flex items-center justify-center' >Welcome back! Please login to your account</p>

        <label className="sr-only">Email address</label>
        <input name="email" type="email" className=" w-96  grid justify-items-stretch justify-self-center appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address"></input>

        <label className="sr-only">Password</label>
        <input name="password" type="password" className=" w-96  grid justify-items-stretch justify-self-center appearance-none rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password"></input>



        <div className='flex items-center justify-center' >
        <Link href='/accounts/dashboard'>
          <button className="bg-indigo-900 py-2 px-16 rounded text-white bold "> Sign in </button>
        </Link>
        </div>

        <Link href='/accounts/email-signup' className='flex items-center justify-center'>
          Create an account 
        </Link>


          <Link href='/accounts/password-reset' className='flex items-center justify-center'> Forgot Password? </Link>


        <div className='flex items-center justify-center'>
            <button>Terms of Private Policy</button>
        </div>
      </div>
    )
  }