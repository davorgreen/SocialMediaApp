//icons
import { FaHome, FaUserFriends } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";
import SponsorshipsMember from "./SponsorshipsMember";
//hooks
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/UserSlice";

function Sidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const currentPath = location.pathname;
    const nonActive = "flex items-center gap-3 text-xl font-semibold text-blue-500 hover:text-blue-600 focus:text-blue-600 transition-all transform hover:scale-110 hover:scale-105 cursor-pointer"
    const active = " flex text-xl gap-3 font-semibold w-64 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md ring-2 ring-blue-500 ring-offset-2 transform scale-105 transition-transform duration-300";

    return (

        <div className="flex flex-col items-star text-center ml-20 gap-4 shadow-lg bg-white rounded-md shadow-gray-300 p-6 mb-6 w-96  md:ml-0 ">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Navigation</h2>
            <Link to={'/'}>  <p className={`${currentPath === '/' ? active : nonActive}`}>
                <FaHome size={30} />
                Home
            </p>
            </Link>
            <Link to="/profile/friends"> <p className={`${currentPath === '/profile/friends' ? active : nonActive}`}>
                <FaUserFriends size={30} />
                Friends
            </p></Link>
            <Link to={'/savedposts'}><p className={`${currentPath === '/savedposts' ? active : nonActive}`}>
                <FaSave size={30} />
                Saved Posts
            </p></Link>
            {/* <Link to={'/notifications'}><p className={`${currentPath === '/notifications' ? active : nonActive}`}>
                <IoIosNotifications size={30} />
                Notifications
            </p></Link>*/}
            <Link onClick={() => dispatch(logout())}><p className={`${nonActive} hover:flex hover:text-xl hover:gap-3 hover:font-semibold hover:cursor-pointer hover:bg-blue-500 hover:text-white hover:px-4 hover:py-2 hover:rounded-lg hover:shadow-md hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 hover:transform hover:scale-105 hover:transition-transform hover:duration-300`}>
                <IoLogOutSharp size={30} />
                Logout
            </p> </Link>
            <SponsorshipsMember />
        </div >
    )
}

export default Sidebar