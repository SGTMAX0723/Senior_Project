// Imports for icons using React Icons
import { AiFillHome } from 'react-icons/ai';
import { RiDashboard2Fill } from 'react-icons/ri';
import { HiTemplate, HiUsers, HiUser } from 'react-icons/hi';
import { IoSettingsSharp } from 'react-icons/io5';
import { IoIosLogOut } from "react-icons/io";
import Link from 'next/link';
import { LogoutWhileLoggedIn } from "./UserAuthentication";

const SideBar = () => {
    return(
        <main>
            <div className="fixed top-0 left-0 h-screen w-48
                            flex flex-col
                            bg-secondary text-zinc-50">

                <div className='relative flex items-center 
                                h-16 pl-[26px]
                                text-xl font-semibold tracking-[.20em]'>
                    <h1>FOLIO</h1>
                </div>

                <Link href="/home">
                    <SideBarIconTop icon={<AiFillHome size="20" /> } text={<p className='pl-2'>Home</p>} />
                </Link>
                <Link href="/accounts/dashboard">
                    <SideBarIconTop icon={<RiDashboard2Fill size="20" />} text={<p className='pl-2'>Dashboard</p>} />
                </Link>
                <Link href="/templates">
                    <SideBarIconTop icon={<HiTemplate size="20" />} text={<p  className='pl-2'>Templates</p>} />
                </Link>
                <Link href="/accounts/following">
                    <SideBarIconTop icon={<HiUsers size="20" />} text={<p  className='pl-2'>Connections</p>} />
                </Link>
                
                <div className='fixed bottom-2 w-48'>
                    <Link href='/' onClick={LogoutWhileLoggedIn} >
                        <SideBarIconBottom icon={<IoIosLogOut size="20" />} text={<p className='pl-2'>Logout</p>} /> 
                    </Link>
                </div>
            </div>
        </main>
    );
};

// React components that take an icon and text component as input props and renders
// out a div class of sidebar-icon-top and bottom with the icon and text inside it.
const SideBarIconTop = ({ icon, text }) => (
    <div className='sidebar-icon-top'>
        {icon}
        {text}
    </div>
);

const SideBarIconBottom = ({ icon, text }) => (
    <div className='sidebar-icon-bottom'>
        {icon}
        {text}
    </div>
);

export default SideBar;