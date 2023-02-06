import { IoNotifications } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

const NavBarlogged = () => {
    return(
        <main>
            <div className="fixed top-0 h-16 w-screen pl-48
                            flex justify-center items-center grid grid-cols-3
                            bg-zinc-50 text-zinc-50">
                <button class="text-gray-800 justify-self-start pl-16
                                font-semibold text-s tracking-[.20em] col-start-1">
                    CREATE
                </button>
                {/* <div className="relative flex items-center justify-center xl:visible lg:visible md:invisible min-[0px]:invisible max-sm:invisible">
                    <SearchBar icon={<IoIosSearch size="20"/> } text={<p className='pl-2 items-center text-zinc-500'> Search users or projects</p>}/>
                </div> */}
                <div className="flex relative mx-auto text-zinc-500 xl:visible lg:visible md:invisible min-[0px]:invisible max-sm:invisible">
                    <input className="bg-zinc-50 h-10 w-64 pl-10 text-sm focus:outline-none tracking-[.07em]" type="search" name="search" placeholder="Search users or projects"/>
                    <button type="submit" className="absolute inset-y-0 left-0 mx-auto items-center">
                        <SearchBar icon={<IoIosSearch size="20"/> } />
                    </button>
                </div>
                <div class="flex -space-x-2 col-start-3 justify-self-end pr-16 items-center">
                    <NavBarIcon icon={<IoNotifications size="18"/> } text={<p className='pr-8'></p>}/>
                    <p class="flex pr-8 text-secondary justify-center xl:visible lg:visible md:visible md:w-36 min-[0px]:invisible max-sm:invisible">John Doe</p>
                    <img class="inline-block h-11 w-11 rounded-full" 
                        src="https://cdn140.picsart.com/364832977021201.png" alt=""/>
                </div>
            </div>
        </main>
    );
};

const NavBarIcon = ({ icon, text }) => (
    <div className='navbar-icon'>
        {icon}
        {text}
    </div>
);

const SearchBar = ({icon, text}) =>(
    <div className='searchbar'>
        {icon}
        {text}
    </div>
)

export default NavBarlogged;