//icons
import { FaHome, FaUserFriends } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";

function Sidebar() {
    return (
        <div className="flex flex-col  items-start gap-3 bg-white shadow-lg rounded-md shadow-gray-300 p-6 mb-6">
            <h2 className="text-3xl font-bold text-blue-500">Navigation</h2>
            <p className="flex gap-2 items-center text-xl font-semibold text-blue-500 focus: underline hover:cursor-pointer"><FaHome size={30} color="#6495ED" />Home</p>
            <p className="flex gap-2 items-center text-xl font-semibold text-blue-500 focus: underline hover:cursor-pointer"><FaUserFriends size={30} color="#6495ED" />Friends</p>
            <p className="flex gap-2 items-center text-xl font-semibold text-blue-500 focus: underline hover:cursor-pointer"><FaSave size={30} color="#6495ED" />Saved Posts</p>
            <p className="flex gap-2 items-center text-xl font-semibold text-blue-500 focus: underline hover:cursor-pointer"><IoIosNotifications size={30} color="#6495ED" /> Notifications</p>
            <p className="flex gap-2 items-center text-xl font-semibold text-blue-500 focus: underline hover:cursor-pointer"><IoLogOutSharp size={30} color="#6495ED" />Logout</p>
        </div>
    )
}

export default Sidebar