import React from 'react'
import Link from 'next/link';


function ConnectionsButton() {
  return (
    <div className='min-h-screen ml-48 pt-36 pb-16
                                flex justify-center items-center
                                bg-primary'>
      <div className="fixed top-20 h-14 w-2/6 pl-46 justify-center items-center grid grid-cols-2 bg-primary space-x-2">
          <Link className=' w-32 grid justify-self-end justify-center border rounded bg-white ' href="/accounts/connections">
              <button className='text-black flex'>Following</button>
          </Link>
          <Link className=' w-32 grid justify-center rounded bg-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border border-black' href="/accounts/followers ">
              <button className='text-white flex'>Followers</button>
          </Link>
      </div>
    </div>
  )
}

export default ConnectionsButton
