import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "./ProfileImage";
import { useState } from "react";
import { IoIosMore, IoIosNotifications } from "react-icons/io";
import { FaRegCommentAlt, FaRegHeart, FaRegTrashAlt, FaSave } from "react-icons/fa";
import { BiHide } from "react-icons/bi";
import { TbShare3 } from "react-icons/tb";
import { IoImagesOutline } from "react-icons/io5";
import image1 from '../images/golden-retriever-177213599-2000-a30830f4d2b24635a5d01b3c5c64b9ef.jpg'
import { useLocation } from "react-router-dom";
import axios from "axios";


function Post({ filteredPosts = [], savedPosts = [] }) {
    const [dropDownMenu, setDropDownMenu] = useState(false);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { users } = useSelector((state) => state.userStore);
    const { token } = useSelector((state) => state.userStore);
    const location = useLocation();


    function openDropDownMenu() {
        setDropDownMenu(!dropDownMenu);
    }

    const handleSendPost = async (post, token) => {
        setLoading(true);
        try {
            const response = await axios.put(`/api/posts/${post._id}/save`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
        } catch (error) {
            setError('Error', error);
        }

        setLoading(false);
    };



    const displayedPosts = location.pathname === '/savedposts' ? savedPosts : filteredPosts;

    return (
        <div className="flex flex-col gap-5 bg-white shadow-lg rounded-lg p-6 mb-6">
            {displayedPosts.length > 0 ? displayedPosts.map((post) => {
                const { createdAt, createdBy, description, likes, shares, _id } = post;
                const matchingUser = users.find(user => user._id === createdBy);
                const formattedDate = new Date(createdAt).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                });

                return (
                    <div key={_id}>
                        <div className="flex gap-3 mb-3 relative">
                            <ProfileImage />
                            <div>
                                <p>
                                    <span className="font-bold text-blue-600 text-xl">
                                        {matchingUser ? `${matchingUser.firstName} ${matchingUser.lastName}` : 'Unknown User'}
                                    </span>
                                    {' '}shared a post
                                </p>
                                <p className="text-md font-semibold text-gray-500">{formattedDate}</p>
                            </div>
                            <div className="absolute right-10">
                                <button onClick={openDropDownMenu}>
                                    <IoIosMore size={40} />
                                </button>
                                <div className="relative">
                                    {dropDownMenu && (
                                        <div className="absolute right-0 bg-white shadow-lg rounded-md p-5">
                                            <button onClick={() => handleSendPost(post, token)} className="flex items-center gap-3 mt-2 text-xl font-semibold text-blue-500 hover:text-blue-600 transition-all transform hover:scale-110 cursor-pointer">
                                                <FaSave size={30} color="#6495ED" />
                                                Save Post
                                            </button>
                                            <button className="flex items-center gap-3 mt-2 text-xl font-semibold text-blue-500 hover:text-blue-600 transition-all transform hover:scale-110 cursor-pointer">
                                                <IoIosNotifications size={30} color="#6495ED" />
                                                Notifications
                                            </button>
                                            <button className="flex items-center gap-3 mt-2 text-xl font-semibold text-blue-500 hover:text-blue-600 transition-all transform hover:scale-110 cursor-pointer">
                                                <BiHide size={30} color="#6495ED" />
                                                Hide Post
                                            </button>
                                            <button className="flex items-center gap-3 mt-2 text-xl font-semibold text-blue-500 hover:text-blue-600 transition-all transform hover:scale-110 cursor-pointer">
                                                <FaRegTrashAlt size={30} color="#6495ED" />
                                                Delete Post
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-lg">{description}</p>
                            <div className="rounded-lg overflow-hidden mt-4">
                                <img src={image1} alt="dog" className="w-full h-auto object-cover" />
                            </div>
                        </div>
                        <div className="flex gap-8 items-center mt-6">
                            <button className="flex items-center gap-2">
                                <FaRegHeart size={30} className="text-blue-500 hover:text-blue-600" />
                                <span className="font-semibold">{likes}</span>
                            </button>
                            <button className="flex items-center gap-2">
                                <FaRegCommentAlt size={30} className="text-blue-500 hover:text-blue-600" />
                                <span className="font-semibold">30</span>
                            </button>
                            <button className="flex items-center gap-2">
                                <TbShare3 size={30} className="text-blue-500 hover:text-blue-600" />
                                <span className="font-semibold">{shares}</span>
                            </button>
                        </div>
                        <div className="flex items-start gap-5 mt-4">
                            <ProfileImage />
                            <div className="flex flex-col flex-grow">
                                <textarea
                                    placeholder="Leave a comment..."
                                    className="border w-full h-14 rounded-full bg-gray-100 p-4 resize-none outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden"
                                ></textarea>
                                <div className="flex justify-end gap-4 items-center mt-2">
                                    <button>
                                        <IoImagesOutline size={35} className="text-blue-500 hover:text-blue-600" />
                                    </button>
                                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-bold">
                                        Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }) : <p>No posts available</p>}
        </div>
    );
}


export default Post;