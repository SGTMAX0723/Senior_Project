import SideBar from '../../components/SideBar';
import NavBarLogged from '../../components/NavBarLogged.js';

export default function Dashboard() {
    return (
        <main>
            <NavBarLogged />
            <SideBar />
            <div className='h-screen
                            flex
                            bg-primary'>
            </div>
        </main>
    )
}
