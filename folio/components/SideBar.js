// Imports for icons using React Icons
import { AiFillHome } from 'react-icons/ai';
import { RiDashboard2Fill } from 'react-icons/ri';
import { HiTemplate, HiUsers } from 'react-icons/hi';
import { IoSettingsSharp } from 'react-icons/io5';
import { CgDarkMode } from "react-icons/cg";

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

                <SideBarIconTop icon={<AiFillHome size="20" /> } text={<p className='pl-2'>Home</p>} />
                <SideBarIconTop icon={<RiDashboard2Fill size="20" />} text={<p className='pl-2'>Dashboard</p>} />
                <SideBarIconTop icon={<HiTemplate size="20" />} text={<p className='pl-2'>Templates</p>} />
                <SideBarIconTop icon={<HiUsers size="20" />} text={<p className='pl-2'>Following</p>} />
                <div className='fixed bottom-2 w-48'>
                    <SideBarIconBottom icon={<IoSettingsSharp size="20" />} text={<p className='pl-2'>Settings</p>} />
                    <SideBarIconBottom icon={<CgDarkMode size="20" />} text={<p className='pl-2'>Appearance</p>} />
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