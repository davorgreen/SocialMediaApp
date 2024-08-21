import { useState } from "react";
//components
import Sidebar from '../components/Sidebar';
import ProfileImage from '../components/ProfileImage';
import Post from '../components/Post';
import Photos from './Photos';
import Friends from './Friends';
import About from './About';
// Icons
import { MdPostAdd } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { TbPhotoSquareRounded } from "react-icons/tb";
// Image
import img from '../images/6e0vct73g0n91.jpg';

function ProfilePage() {
    const [activeComponent, setActiveComponent] = useState('posts');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'photos':
                return <Photos />;
            case 'friends':
                return <Friends />;
            case 'about':
                return <About />;
            default:
                return <Post />;
        }
    };

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
                    <button
                        onClick={() => setActiveComponent('posts')}
                        className="flex items-center gap-3 text-xl font-semibold text-blue-500 pb-1 border-b-4 border-transparent hover:border-blue-600 transition-all duration-300"
                    >
                        <MdPostAdd size={30} />Posts
                    </button>
                    <button
                        onClick={() => setActiveComponent('about')}
                        className="flex items-center gap-3 text-xl font-semibold text-blue-500 pb-1 border-b-4 border-transparent hover:border-blue-600 transition-all duration-300"
                    >
                        <IoIosInformationCircleOutline size={30} />About
                    </button>
                    <button
                        onClick={() => setActiveComponent('friends')}
                        className="flex items-center gap-3 text-xl font-semibold text-blue-500 pb-1 border-b-4 border-transparent hover:border-blue-600 transition-all duration-300"
                    >
                        <FaUserFriends size={30} />Friends
                    </button>
                    <button
                        onClick={() => setActiveComponent('photos')}
                        className="flex items-center gap-3 text-xl font-semibold text-blue-500 pb-1 border-b-4 border-transparent hover:border-blue-600 transition-all duration-300"
                    >
                        <TbPhotoSquareRounded size={30} />Photos
                    </button>
                </div>
                {renderComponent()}
            </div>
        </div>
    );
}

export default ProfilePage;
