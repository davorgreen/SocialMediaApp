//icons
import { FaPeopleGroup } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { FaRegTimesCircle } from "react-icons/fa";
import ProfileImage from "./ProfileImage";
import { useRef, useState } from "react";
import axios from "axios";
import countries from '/src/data/countries.js'
import { useSelector } from "react-redux";



function CreatePost() {
    const [post, setPost] = useState('');
    const [feelings, setFeelings] = useState(['😊', '😢', '😡', '😄', '😮', '😴', '😕', '😨', '😍', '😬', '😎', '😳', '🤒', '😌', '😐']);
    const [showFeelings, setShowFeelings] = useState(false);
    const [showLocation, setShowLocation] = useState(false);
    const [showPeople, setShowPeople] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [error, setError] = useState('');
    const { addedFriends } = useSelector((state) => state.friendsStore);
    const fileInputRef = useRef(null);



    function handlePeople(friend) {
        setPost(prevPost => prevPost + ` With ${friend.firstName} ${friend.lastName}`);
        setShowPeople(false);
    }

    function handleOpenFeelings() {
        setShowFeelings(!showFeelings);
    }

    function handleSelectFeeling(feeling) {
        setPost(prevPost => prevPost + ' Feeling' + feeling + '');
        setShowFeelings(false);
    }

    function handleCheckIn() {
        setShowLocation(!showLocation);
    }

    function handleCountryChange(e) {
        const selectedCountryCode = e.target.value;
        setPost(prevPost => prevPost + ' In ' + selectedCountryCode + '');
    }
    const toggleInput = () => {
        setShowInput(prev => {
            if (prev) {
                handleRemovePhoto();
            }
            return !prev;
        });
    };
    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedPhoto(URL.createObjectURL(file));
            setPost(prevPost => ({
                ...prevPost,
                selectedPhoto
            }));

        }

    };

    const handleRemovePhoto = () => {
        setSelectedPhoto(null);
        fileInputRef.current.value = '';
    }

    const handleSharePost = async (post) => {
        try {
            const response = await axios.post('/api/posts', post);

        } catch (error) {
            setError('Error sharing the post');
            console.error('Error during login', error);

        }
    }

    return (
        <div className="flex flex-col bg-white shadow-lg rounded-lg p-6 mb-6">
            <div className="flex items-start gap-2">
                <ProfileImage />
                <textarea
                    placeholder="Share your status..."
                    className="flex-grow bg-gray-100 rounded-lg p-4 resize-none outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                ></textarea>
                <button onClick={() => handleSharePost(post)} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-bold">Share</button>
            </div>
            <div className="flex flex-col gap-3 justify-center mt-4 md:flex-row">
                <button onClick={() => setShowPeople(!showPeople)} className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-bold">
                    <FaPeopleGroup size={30} /> People
                </button>
                <button onClick={handleCheckIn} className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-bold">
                    <IoLocationSharp size={30} />Check in
                </button>
                <button onClick={handleOpenFeelings} className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-bold">
                    <MdEmojiEmotions size={30} /> Feelings
                </button>
                <button onClick={toggleInput
                } className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-bold">
                    <MdOutlineAddAPhoto size={30} /> Add Photo
                </button>
            </div>

            {showFeelings && (
                <div className="mt-4 grid grid-cols-5 gap-2">
                    {feelings.map((feeling, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelectFeeling(feeling)}
                            className="text-2xl p-2 hover:bg-gray-200 rounded-lg"
                        >
                            {feeling}
                        </button>
                    ))}
                </div>
            )}

            {showLocation && (
                <div className="mt-4">
                    <div className="flex gap-2">
                        <h6 className="font-semibold">Country</h6>
                        <select
                            onChange={handleCountryChange}
                            className="block w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Country</option>
                            {countries.map((item, index) => (
                                <option key={index}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}


            {showPeople && (
                <div className="mt-4">
                    <h6 className="font-semibold">Friends</h6>
                    <div className="grid grid-cols-5 gap-4">
                        {addedFriends && addedFriends.length > 0 ? (
                            addedFriends.map((friend, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePeople(friend)}
                                    className="text-lg p-3 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm flex items-center justify-center"
                                >
                                    <div className="text-center">
                                        <p className="font-medium text-gray-800">{friend.firstName} {friend.lastName}</p>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-5">No friends</p>
                        )}
                    </div>
                </div>
            )}

            {
                showInput && (
                    <div className="flex gap-2 mt-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handlePhotoChange}
                        />
                    </div>
                )}
            {selectedPhoto && (
                <div className="relative mt-2 flex">
                    <img src={selectedPhoto} className="w-96 h-64 object-cover rounded-lg" />
                    <button
                        onClick={handleRemovePhoto}
                        className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full"
                    >
                        <FaRegTimesCircle size={15} />
                    </button>
                </div>
            )
            }


        </div >

    );
}

export default CreatePost;