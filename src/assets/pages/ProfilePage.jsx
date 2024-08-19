import { Link } from "react-router-dom"
import ProfileImage from "../components/ProfileImage"
import Sidebar from "../components/Sidebar"
import Post from '../components/Post'
//image
import img from '../images/6e0vct73g0n91.jpg'
//icons
import { MdPostAdd } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { TbPhotoSquareRounded } from "react-icons/tb";


function ProfilePage() {
    return (
        <div className="flex max-w-7xl mx-auto mt-5 gap-8">
            <div className="w-1/4">
                <Sidebar />
            </div>
            <div className="w-3/4 h-32 pb-10 mt-5 relative">
                <div className="h-48 shadow-xl shadow-gray-400 rounded-md overflow-hidden flex justify-center items-center">
                    <img src={img} alt="dogsfamily" />
                </div>
                <div className="absolute top-11 left-1">
                    <ProfileImage size={'big'} />
                </div>
                <div className="p-4 absolute top-0 left-0">
                    <h1 className="text-xl font-bold text-white text-shadow">Bob Smith</h1>
                </div>
                <div className="absolute top-0 right-2">
                    <p className="text-xl font-bold text-white text-shadow">London, UK</p>
                </div>
                <div className="flex m-5 gap-10">
                    <Link to={'/posts'} className="flex items-center gap-3 text-xl font-semibold text-blue-500 pb-1 border-b-4 border-transparent hover:border-blue-600 hover:translate transition-all duration-300 "><MdPostAdd size={30} />Posts</Link>
                    <Link to={'/about'} className="flex items-center gap-3 text-xl font-semibold text-blue-500 pb-1 border-b-4 border-transparent hover:border-blue-600 hover:translate transition-all duration-300 "><IoIosInformationCircleOutline size={30} />About</Link>
                    <Link to={'/friends'} className="flex items-center gap-3 text-xl font-semibold text-blue-500 pb-1 border-b-4 border-transparent hover:border-blue-600 hover:translate transition-all duration-300 "><FaUserFriends size={30} />Friends</Link>
                    <Link to={'/photos'} className="flex items-center gap-3 text-xl font-semibold text-blue-500 pb-1 border-b-4 border-transparent hover:border-blue-600 hover:translate transition-all duration-300 "><TbPhotoSquareRounded size={30} />Photos</Link>
                </div>
                <Post />
            </div>
        </div>
    )
}

export default ProfilePage