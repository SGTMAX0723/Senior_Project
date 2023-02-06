import Link from 'next/link';

const NavBar = () => {
    return(
        <main>
            <div className="fixed top-0 h-16 w-screen 
                            flex justify-center items-center grid grid-cols-3
                            bg-zinc-50 text-zinc-50">

                <Link href="/signin" class="text-gray-800 justify-self-center mr-42 px-4 py-2
                            font-semibold text-xs tracking-[.20em]">
                    CREATE
                </Link>
                <div className='relative flex items-center justify-center
                                h-16
                                text-l font-semibold tracking-[.20em] text-black'>
                    <h1>FOLIO</h1>
                </div>
            </div>
        </main>
    );
};

export default NavBar;