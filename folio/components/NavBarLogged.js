import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
const NavBarlogged = () => {
    return(
        <main>
            <div className="fixed top-0 h-16 w-screen
                            flex justify-center items-center grid grid-cols-3
                            bg-zinc-50 text-zinc-50 space-x-14">

                <button class="text-gray-800 w-24 justify-self-center mr-48 px-4 py-2
                            font-semibold text-s tracking-[.20em] ml-40 col-start-1">
                    CREATE
                </button>
                
                <div className='relative flex items-center justify-center'>
                    <SearchBar icon={<IoIosSearch size="20"/> } text={<p className='pl-2 items-center text-zinc-500'> Search users or projects</p>}/>
                </div>

                <div class="flex -space-x-2 overflow-hidden col-start-3 justify-self-end pr-8 items-center">
                    <NavBarIcon icon={<IoIosNotificationsOutline size="20"/> } text={<p className='pr-8'></p>}/>

                    <p class = "text-secondary pr-8">John Doe</p>

                    <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" 
                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
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