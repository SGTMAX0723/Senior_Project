// Imports for icons using React Icons
import { AiFillHome } from 'react-icons/ai';
import { RiDashboard2Fill } from 'react-icons/ri';
import { HiTemplate, HiUsers } from 'react-icons/hi';
import { IoSettingsSharp } from 'react-icons/io5';
import { CgDarkMode } from "react-icons/cg";
import Link from 'next/link';
import colors from "../tailwind.config.js";

const changeApperance = document.querySelector("#Apperance");

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

                <SideBarIconTop icon={<AiFillHome size="20" /> } text={<Link href="/home" className='pl-2'>Home</Link>} />
                <SideBarIconTop icon={<RiDashboard2Fill size="20" />} text={<Link href="/dashboard" className='pl-2'>Dashboard</Link>} />
                <SideBarIconTop icon={<HiTemplate size="20" />} text={<Link href="/templates" className='pl-2'>Templates</Link>} />
                <SideBarIconTop icon={<HiUsers size="20" />} text={<Link href="following" className='pl-2'>Following</Link>} />
                <div className='fixed bottom-2 w-48'>
                    <SideBarIconBottom icon={<IoSettingsSharp size="20" />} text={<Link href="settings" className='pl-2'>Settings</Link>} />
                    <SideBarIconBottom icon={<CgDarkMode size="20" />} text={<button id="Apperance" className='pl-2'>Appearance</button>} />
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