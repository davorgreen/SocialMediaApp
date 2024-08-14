//icons
import { FaHome, FaUserFriends } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";

function Sidebar() {
    return (
        <div className="flex flex-col items-start gap-4 bg-white shadow-lg rounded-md shadow-gray-300 p-6 mb-6">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Navigation</h2>
            <p className="flex items-center gap-3 text-xl font-semibold text-blue-500 hover:text-blue-600 focus:text-blue-600 transition-all transform hover:scale-110 focus:scale-105 cursor-pointer">
                <FaHome size={30} />
                Home
            </p>
            <p className="flex items-center gap-3 text-xl font-semibold text-blue-500 hover:text-blue-600 focus:text-blue-600 transition-all transform hover:scale-110 focus:scale-105 cursor-pointer">
                <FaUserFriends size={30} />
                Friends
            </p>
            <p className="flex items-center gap-3 text-xl font-semibold text-blue-500 hover:text-blue-600 focus:text-blue-600 transition-all transform hover:scale-110  focus:scale-105 cursor-pointer">
                <FaSave size={30} />
                Saved Posts
            </p>
            <p className="flex items-center gap-3 text-xl font-semibold text-blue-500 hover:text-blue-600 focus:text-blue-600 transition-all transform hover:scale-110 focus:scale-105 cursor-pointer">
                <IoIosNotifications size={30} />
                Notifications
            </p>
            <p className="flex items-center gap-3 text-xl font-semibold text-blue-500 hover:text-blue-600 focus:text-blue-600 transition-all transform hover:scale-110 focus:scale-105 cursor-pointer">
                <IoLogOutSharp size={30} />
                Logout
            </p>
        </div>
    )
}

export default Sidebar