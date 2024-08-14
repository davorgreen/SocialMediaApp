//images
import image1 from '../images/golden-retriever-177213599-2000-a30830f4d2b24635a5d01b3c5c64b9ef.jpg'
//icons
import { IoIosMore } from 'react-icons/io';
import { FaSave, FaRegTrashAlt, FaRegHeart, FaRegCommentAlt } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import { BiHide } from 'react-icons/bi';
import { TbShare3 } from 'react-icons/tb';
import { useState } from 'react';
import { IoImagesOutline } from 'react-icons/io5';

import ProfileImage from '../components//ProfileImage.jsx'

function Post() {
    const [dropDownMenu, setDropDownMenu] = useState(false);

    function openDropDownMenu() {
        setDropDownMenu(!dropDownMenu);
    }

    return (
        <div className="flex flex-col gap-5 bg-white shadow-lg rounded-lg p-6 mb-6">
            <div className="flex gap-3 mb-3 relative">
                < ProfileImage />
                <div>
                    <p><span className="font-bold text-blue-600 text-xl">Owner</span> shared a post</p>
                    <p className="text-lg font-semibold">2 hours ago</p>
                </div>
                <div className="absolute right-10">
                    <button onClick={openDropDownMenu}><IoIosMore size={40} /></button>
                    <div className="relative" >
                        {dropDownMenu && (
                            <div className="absolute right-0 bg-white shadow-lg rounded-md p-5">
                                <p className="flex items-center gap-3 mt-2 text-xl font-semibold text-blue-500 hover:text-blue-600 focus:text-blue-600 transition-all transform hover:scale-110  focus:scale-105 cursor-pointer">
                                    <FaSave size={30} color="#6495ED" />
                                    Saved Posts
                                </p>
                                <p className="flex items-center gap-3 mt-2 text-xl font-semibold text-blue-500 hover:text-blue-600 focus:text-blue-600 transition-all transform hover:scale-110  focus:scale-105 cursor-pointer">
                                    <IoIosNotifications size={30} color="#6495ED" />
                                    Notifications
                                </p>
                                <p className="flex items-center gap-3 mt-2 text-xl font-semibold text-blue-500 hover:text-blue-600 focus:text-blue-600 transition-all transform hover:scale-110  focus:scale-105 cursor-pointer">
                                    <BiHide size={30} color="#6495ED" />
                                    Hide Post
                                </p>
                                <p className="flex items-center gap-3 mt-2 text-xl font-semibold text-blue-500 hover:text-blue-600 focus:text-blue-600 transition-all transform hover:scale-110  focus:scale-105 cursor-pointer">
                                    <FaRegTrashAlt size={30} color="#6495ED" />
                                    Delete Post
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <p className="text-lg">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa ea fuga, possimus voluptas saepe ex ratione sequi est adipisci magnam, harum reiciendis maiores nulla in voluptatibus voluptatum quos voluptates quidem aut laborum consectetur perspiciatis incidunt? Ratione molestias voluptate, modi architecto praesentium ea. Soluta animi inventore porro blanditiis tenetur qui vero.
                </p>
                <div className="rounded-lg overflow-hidden mt-4">
                    <img src={image1} alt="dog" className="w-full h-auto object-cover" />
                </div>
            </div>
            <div className="flex gap-8 items-center">
                <button className="flex items-center gap-2">
                    <FaRegHeart size={30} className="text-blue-500 hover:text-blue-600" />
                    <span className="font-semibold">30</span>
                </button>
                <button className="flex items-center gap-2">
                    <FaRegCommentAlt size={30} className="text-blue-500 hover:text-blue-600" />
                    <span className="font-semibold">30</span>
                </button>
                <button className="flex items-center gap-2">
                    <TbShare3 size={30} className="text-blue-500 hover:text-blue-600" />
                    <span className="font-semibold">5</span>
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
                        <button><IoImagesOutline size={35} className="text-blue-500 hover:text-blue-600" /></button>
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-bold">
                            Comment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
