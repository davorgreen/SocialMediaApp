//components
import Sidebar from '../components/Sidebar';
import ProfileImage from '../components/ProfileImage';
import Photos from '../components/Photos';
import About from '../components/About';
import FriendsPage from "./FriendsPage";
import MyPostPage from "./MyPostPage";
// icons
import { MdPostAdd, MdDeleteForever } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { TbPhotoSquareRounded } from "react-icons/tb";
import { IoImagesOutline } from "react-icons/io5";
// image
//import img from '../images/6e0vct73g0n91.jpg';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//api
import axios from "axios";
import { fetchPhotos } from '../../services/api';
//redux
import { filteredPhotos, updateCoverPhoto, updateProfilePhoto } from '../../slices/PhotoSlice';

function ProfilePage() {
    const { component } = useParams();
    const [image, setImage] = useState(null);
    const [imageType, setImageType] = useState('');
    const [activeComponent, setActiveComponent] = useState(component || 'posts');
    const [addPhoto, setAddPhoto] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useSelector((state) => state.userStore);
    const { token } = useSelector((state) => state.userStore);
    const { coverPhoto } = useSelector((state) => state.photoStore);
    const [isUserProfile, setIsUserProfile] = useState(true);
    const dispatch = useDispatch();


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

    //add cover photo
    const handleAddCoverPhoto = () => {
        setImageType('cover');
        setAddPhoto(prevState => !prevState);
    };

    //add profile photo
    const handleAddProfilePhoto = () => {
        setImageType('profile');
        setAddPhoto(prevState => !prevState);
    };

    //store photo
    const handleImage = (e) => {
        // console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    }

    // function to convert file to Base64 format
    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };

    // send photo
    const updatePhoto = () => {
        if (!image) return;
        setLoading(true);
        getBase64(image, async (imageBase64) => {
            try {
                const data = {
                    base64: imageBase64,
                    type: imageType,
                    entityId: user._id,
                };

                const response = await axios.post('https://green-api-nu.vercel.app/api/photos', data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                //  console.log(imageType)
                // imageType === 'profile' ? dispatch(updateProfilePhoto(response.data)) : dispatch(updateCoverPhoto(response.data))
                console.log('Response data:', response.data);
            } catch (error) {
                setError("Error: " + (error.response?.data?.message || error.message));
            } finally {
                setLoading(false);
                setAddPhoto(false);
                setImage(null);
            }
        });
    };


    //user photos
    useEffect(() => {
        const fetchUserPhotos = async () => {
            setLoading(true);
            try {
                const photosResponse = await fetchPhotos(user._id, token);
                dispatch(filteredPhotos(photosResponse.data));
            } catch (error) {
                setError('Error fetching photos: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserPhotos();
    }, [dispatch, user._id, token, coverPhoto]);

    return (
        <div className="flex flex-col lg:flex-row mx-auto mt-5 mr-5 gap-8">
            <div className="w-1/4 ml-5">
                <Sidebar />
            </div>
            <div className="md:w-3/4 h-32 pb-10 mt-5 relative">
                <div className="h-48 shadow-xl shadow-gray-400 rounded-md overflow-hidden flex justify-center items-center">
                    {coverPhoto.length > 0 ? (
                        coverPhoto.map((photo, index) => (
                            <img key={index} src={photo.url} alt="Cover" />
                        ))
                    ) : (
                        'No cover photo'
                    )}
                    <div onClick={handleAddCoverPhoto} className="absolute right-10 cursor-pointer">
                        <IoImagesOutline size={50} color="blue" />
                    </div>
                </div>

                <div onClick={handleAddProfilePhoto} className="absolute top-11 left-1 cursor-pointer">
                    <ProfileImage isUserProfile={isUserProfile} size="big" />
                    <IoImagesOutline size={40} color="blue" className="absolute -bottom-2 -right-2" />
                </div>

                {addPhoto && (
                    <div className='flex items-center justify-start'>
                        <input type="file" name="file" accept=".jpg, .png, image/*" onChange={handleImage} />
                        <button className="px-6 py-3 bg-blue-500 rounded-xl text-white font-semibold mt-2" onClick={updatePhoto}>
                            Submit
                        </button>
                        <button><MdDeleteForever size={50} color='red' /></button>
                    </div>
                )}

                <div className="p-1 absolute top-0 left-0">
                    <h1 className="text-xl font-bold text-white text-shadow">
                        {user.firstName} {user.lastName}
                    </h1>
                </div>
                <div className="absolute top-2 md:top-0 right-2">
                    <p className="text-xl font-bold text-white text-shadow">
                        {user.city}, {user.countryCode}
                    </p>
                </div>
                <div className="flex-row md:flex m-5 gap-10">
                    <button onClick={() => setActiveComponent('posts')} className="flex items-center gap-3 text-xl font-semibold text-blue-500 pb-1 border-b-4 border-transparent hover:border-blue-600 transition-all duration-300">
                        <MdPostAdd size={30} />Posts
                    </button>
                    <button onClick={() => setActiveComponent('about')} className="flex items-center gap-3 text-xl font-semibold text-blue-500 pb-1 border-b-4 border-transparent hover:border-blue-600 transition-all duration-300">
                        <IoIosInformationCircleOutline size={30} />About
                    </button>
                    <button onClick={() => setActiveComponent('friends')} className="flex items-center gap-3 text-xl font-semibold text-blue-500 pb-1 border-b-4 border-transparent hover:border-blue-600 transition-all duration-300">
                        <FaUserFriends size={30} />Friends
                    </button>
                    <button onClick={() => setActiveComponent('photos')} className="flex items-center gap-3 text-xl font-semibold text-blue-500 pb-1 border-b-4 border-transparent hover:border-blue-600 transition-all duration-300">
                        <TbPhotoSquareRounded size={30} />Photos
                    </button>
                </div>
                {renderComponent()}
            </div>
        </div>
    );
}

export default ProfilePage;
