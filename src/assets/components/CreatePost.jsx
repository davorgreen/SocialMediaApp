import { FaPeopleGroup } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { FaRegTimesCircle } from "react-icons/fa";
import ProfileImage from "./ProfileImage";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import countries from '/src/data/countries.js';
import { useDispatch, useSelector } from "react-redux";
import { sharePost } from "../../slices/PostsSlice";
import { addPosts } from "../../slices/UserSlice";
import { addSharedPost } from "../../slices/CombinedSlice";
import { addPostPhoto } from "../../slices/PhotoSlice";


function CreatePost() {
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [feelings, setFeelings] = useState(['😊', '😢', '😡', '😄', '😮', '😴', '😕', '😨', '😍', '😬', '😎', '😳', '🤒', '😌', '😐']);
    const [showFeelings, setShowFeelings] = useState(false);
    const [emoji, setEmoji] = useState(null);
    const [showLocation, setShowLocation] = useState(false);
    const [location, setLocation] = useState('');
    const [showPeople, setShowPeople] = useState(false);
    const [people, setPeople] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const { token, user } = useSelector((state) => state.userStore);
    const { friends } = useSelector((state) => state.userStore);
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();



    function handleOpenFeelings() {
        setShowFeelings(!showFeelings);
    }


    function handleCheckIn() {
        setShowLocation(!showLocation);
    }

    const handlePeople = (friend) => {
        setPeople(`${friend.firstName} ${friend.lastName}`);
        setStatus((prevStatus) => `${prevStatus} with ${friend.firstName} ${friend.lastName}`);
        setShowPeople(false);
    };


    const handleLocationSelect = (country) => {
        setLocation(country);
        setStatus((prevStatus) => `${prevStatus} in ${country}`);
        setShowLocation(false);
    };

    const handleEmojiSelect = (selectedEmoji) => {
        setEmoji(selectedEmoji);
        setStatus((prevStatus) => `${prevStatus} Felling ${selectedEmoji}`);
        setShowFeelings(false);
    };

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
            const imageUrl = URL.createObjectURL(file);
            setSelectedPhoto(file);
        }
    };

    const handleRemovePhoto = () => {
        setSelectedPhoto(null);
        fileInputRef.current.value = '';
    };

    // function to convert file to Base64 format
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // share post or photo
    const handleSharePost = async (status, selectedPhoto) => {
        if (!status.trim() && !selectedPhoto) {
            setError('Status or Photo is required');
            return;
        }

        if (!token) {
            setError('Authorization token is missing');
            return;
        }

        setLoading(true);
        setError('');

        try {
            let postId = null;
            //status
            if (status.trim()) {
                const postData = {
                    description: status,
                };
                try {
                    const response = await axios.post('https://green-api-nu.vercel.app/api/posts', postData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    dispatch(sharePost(response.data));
                    dispatch(addPosts(response.data));
                    dispatch(addSharedPost(response.data));
                    //    console.log('Post shared successfully:', response.data);
                    postId = response.data._id;
                    setStatus("");
                } catch (error) {
                    setError("Error sharing post: " + (error.response?.data?.message || error.message));
                }
            }

            // photo
            if (selectedPhoto && postId) {
                const imageBase64 = await getBase64(selectedPhoto);
                const photoData = {
                    base64: imageBase64,
                    type: 'post',
                    entityId: postId,
                };

                //  console.log('Sending photo data:', photoData);

                try {
                    const response = await axios.post('https://green-api-nu.vercel.app/api/photos', photoData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (photoData) {
                        dispatch(addPostPhoto(response.data));
                    }
                    //  console.log('Photo uploaded successfully:', response.data);
                } catch (error) {
                    setError("Error uploading photo: " + (error.response?.data?.message || error.message));
                }
            }

        } catch (error) {
            setError("Error sharing post: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
        // reset
        setStatus('');
        setSelectedPhoto(null);
        setPeople('');
        setEmoji('');
        setLocation('');
        setError('');
        setShowFeelings(false);
        setShowLocation(false);
        setShowPeople(false);
        //fileInputRef.current.value = '';
        setShowInput(false);
    };


    return (
        <div className="flex flex-col bg-white shadow-lg  rounded-lg p-6 mb-6 w-full">
            <div className="flex items-start gap-2">
                <ProfileImage isUserProfile={true} />
                <textarea
                    placeholder="Share your status..."
                    className="w-full bg-gray-100 rounded-lg p-4 resize-none outline-none focus:ring-2 focus:ring-blue-500"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <button onClick={() => handleSharePost(status, selectedPhoto)} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-bold">Share</button>
            </div>
            <div className="flex flex-col gap-3 justify-center mt-4 md:flex-row">
                <button onClick={() => setShowPeople(!showPeople)} className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-bold">
                    <FaPeopleGroup size={30} /> People
                </button>
                <button onClick={handleCheckIn} className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-bold">
                    <IoLocationSharp size={30} /> Check in
                </button>
                <button onClick={handleOpenFeelings} className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-bold">
                    <MdEmojiEmotions size={30} /> Feelings
                </button>
                <button onClick={toggleInput} className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-bold">
                    <MdOutlineAddAPhoto size={30} /> Add Photo
                </button>
            </div>

            {showFeelings && (
                <div className="mt-4 grid grid-cols-5 gap-2">
                    {feelings.map((feeling, index) => (
                        <button
                            key={index}
                            onClick={() => handleEmojiSelect(feeling)}
                            className="text-2xl p-2 hover:bg-gray-200 rounded-lg"
                        >
                            {feeling}
                        </button>
                    ))}
                </div>
            )
            }

            {
                showLocation && (
                    <div className="mt-4">
                        <div className="flex gap-2">
                            <h6 className="font-semibold">Country</h6>
                            <select
                                onChange={(e) => handleLocationSelect(e.target.value)}
                                className="block w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Country</option>
                                {countries.map((item, index) => (
                                    <option key={index} value={item.name}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )
            }

            {
                showPeople && (
                    <div className="mt-4">
                        <h6 className="font-semibold">Friends</h6>
                        <div className="grid grid-cols-5 gap-4">
                            {friends && friends.length > 0 ? (
                                friends.map((friend, index) => (
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
                )
            }


            {
                showInput && (
                    <div className="flex gap-2 mt-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept=".jpg, .png, image/*"
                            onChange={handlePhotoChange}
                        />
                    </div>
                )
            }
            {
                selectedPhoto && (
                    <div className="relative mt-2 flex">
                        <img src={URL.createObjectURL(selectedPhoto)} className="w-96 h-64 object-cover rounded-lg" alt="Selected" />
                        <button
                            onClick={handleRemovePhoto}
                            className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full"
                        >
                            <FaRegTimesCircle size={15} />
                        </button>
                    </div>
                )
            }
            {error && <p className="text-red-500">{error}</p>}
        </div >
    );
}

export default CreatePost;