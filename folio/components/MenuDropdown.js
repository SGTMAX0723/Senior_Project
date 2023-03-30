import { pb } from "./UserAuthentication";
import { logoutWhileLoggedIn } from "./UserAuthentication";
import Link from "next/link";
 
 // for the dropdown menu
 const MenuDropdown = () => {
    const user = pb.authStore.model;
    const maxWidth = Math.max(
      user.name.length * 12, // adjust the factor as needed
      user.email.length * 10 // adjust the factor as needed
    );
    return (
        <div className={`absolute right-2 mt-2 max-w-${maxWidth} whitespace-nowrap w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
            <div>
                <div className="flex flex-col px-4 py-3">
                    <p className="text-lg text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                </div>
            </div>
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <Link href={`/accounts/${user.id}/profile`}>
                    <a className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Profile
                    </a>
                </Link>
                <Link href="accounts/settings">
                    <a className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Settings
                    </a>
                </Link>
                {/* <Link href="/" onClick={logoutWhileLoggedIn}>
                    <a className="block px-4 py-3 text-sm text-red-600 hover:bg-gray-100" role="menuitem">
                    Sign out
                    </a>
                </Link> */}
            </div>
        </div>
    );
};  

export default MenuDropdown;