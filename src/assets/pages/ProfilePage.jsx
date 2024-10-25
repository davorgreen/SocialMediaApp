import { useState } from "react";
//components
import Sidebar from '../components/Sidebar';
import ProfileImage from '../components/ProfileImage';
import Photos from '../components/Photos';
import About from '../components/About';
// icons
import { MdPostAdd } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { TbPhotoSquareRounded } from "react-icons/tb";
// image
import img from '../images/6e0vct73g0n91.jpg';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import FriendsPage from "./FriendsPage";
import MyPostPage from "./MyPostPage";
import axios from "axios";

function ProfilePage() {
    const { component } = useParams();
    const [image, setImage] = useState('');
    const [activeComponent, setActiveComponent] = useState(component || 'posts');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useSelector((state) => state.userStore);
    const { token } = useSelector((state) => state.userStore);


    const renderComponent = () => {
        switch (activeComponent) {
            case 'photos':
                return <Photos />;
            case 'friends':
                return <FriendsPage />;
            case 'about':
                return <About />;
            default:
                return <MyPostPage />;
        }
    };

    //store cover photo

    const handleImage = (e) => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    }

    // function that converts a file (image) to Base64 format using FileReader API

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror = (error) => {
                npm
                reject(error);
            };
        });
    };

    //import/sent cover photo

    const updateCoverPhoto = async () => {
        setLoading(true);
        try {
            const imageBase64 = await convertToBase64(image);

            const data = {
                base64: imageBase64,
                type: 'cover',
                entityId: user._id,
            };

            const response = await axios.post('https://green-api-nu.vercel.app/api/photos', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Response data:', response.data);

        } catch (error) {
            setError("Error: " + (error.response?.data?.message || error.message));
            console.error('Error response data:', error.response?.data);
            console.error('Error response status:', error.response?.status);
            console.error('Error response headers:', error.response?.headers);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex flex-col  lg:flex-row mx-auto mt-5 mr-5 gap-8">
            <div className="w-1/4 ml-5">
                <Sidebar />
            </div>
            <div className="md:w-3/4 h-32 pb-10 mt-5 relative">
                <div className="h-48 shadow-xl shadow-gray-400 rounded-md overflow-hidden flex justify-center items-center">
                    <img src={img} alt="dogsfamily" />
                </div>
                <input type="file" name="file" accept='.jpg, .png|image/*' onChange={handleImage} />
                <button onClick={updateCoverPhoto}>Submit</button>
                <div className="absolute top-11 left-1">
                    <ProfileImage size={'big'} />
                </div>
                <div className="p-1 absolute top-0 left-0">
                    <h1 className="text-xl font-bold text-white text-shadow">{user.firstName} {user.lastName}</h1>
                </div>
                <div className="absolute top-2 md:top-0 right-2">
                    <p className="text-xl font-bold text-white text-shadow">{user.city}, {user.countryCode}</p>
                </div>
                <div className="flex-row md:flex m-5 gap-10">
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
