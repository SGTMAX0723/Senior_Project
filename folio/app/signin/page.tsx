import SigninButton from '../../components/SigninButton'
import NavBar from '../../components/NavBar';

export default function page() {
    return (
      <div className='h-100 grid grid-cols-1 gap-4 content-around '>
        
        <h1 className='flex items-center justify-center mt-5 font-bold text-3xl ' >FOLIO</h1>
        
        <p className=' flex items-center justify-center' >Welcome back! Please login to your account</p>

        <label className="sr-only">Email address</label>
        <input name="email" type="email" className=" flex items-center justify-center appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address"></input>

        <label className="sr-only">Password</label>
        <input name="password" type="password" className=" appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password"></input>
       


        <div className='flex items-center justify-center' >
        <SigninButton />
        </div>

        <div className='flex items-center justify-center'>
          <button> Create an account </button>
        </div>

        <div className='flex items-center justify-center'>
          <button> Forgot Password? </button>
        </div>

        <div className='flex items-center justify-center'>
           <button>Terms of Private Policy</button>
        </div>
      </div>
    )
  }