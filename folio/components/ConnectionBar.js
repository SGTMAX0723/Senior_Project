import Link from 'next/link'

const ConnectionButton = (props) => {
    return (
        <div className="w-full h-14 mt-16 flex self-start items-center justify-center border-b-2">
            <div className='grid grid-cols-2 w-full h-full items-center justify-center'>
                <Link className={`w-full h-full grid justify-self-center items-center justify-center ${props.following ? 'text-[#A3A0FB]' : 'text-secondary'} font-bold hover:bg-zinc-100`} href="/accounts/following">
                    Following
                </Link>
                <Link className={`w-full h-full grid justify-self-center items-center justify-center ${props.followers ? 'text-[#A3A0FB]' : 'text-secondary'} font-bold hover:bg-zinc-100`} href="/accounts/followers">
                    Followers
                </Link>
            </div>
        </div>
    )
}

export default ConnectionButton