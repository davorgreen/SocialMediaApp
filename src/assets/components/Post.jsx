import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "./ProfileImage";
import { useState } from "react";
import { TbShare3 } from "react-icons/tb";
import { IoImagesOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { removePost, savePost } from "../../slices/PostsSlice";
//icons
import { MdDeleteForever } from "react-icons/md";
import { IoIosMore, IoIosNotifications } from "react-icons/io";
import { FaRegCommentAlt, FaRegHeart, FaRegTrashAlt, FaSave } from "react-icons/fa";
//redux
import { getComments, removeComment, sendComment } from "../../slices/CommentSlice";





function Post({ filteredPosts, savedPosts, myPosts, photosOfPosts }) {
    const [dropDownMenu, setDropDownMenu] = useState(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { users } = useSelector((state) => state.userStore);
    const { token } = useSelector((state) => state.userStore);
    const { user } = useSelector((state) => state.userStore);
    const [comment, setComment] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    const commentsByPostId = useSelector((state) => state.commentStore.comment);

    function openDropDownMenu(id) {
        setDropDownMenu(dropDownMenu === id ? null : id);
    }


    //send post
    const handleSendPost = async (post, token) => {
        setDropDownMenu(null);
        setLoading(true);
        try {
            const response = await axios.put(`https://green-api-nu.vercel.app/api/posts/${post._id}/save`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data)
            dispatch(savePost({ post: response.data, userId: user._id }));
        } catch (error) {
            setError('Error', error);
        } finally {
            setLoading(false);
            navigate('/savedposts');
        }
    };

    //send comment
    const handleShareComment = async (comment, postId, token) => {
        const addedComment = comment[postId];
        const data = {
            description: addedComment,
            entityId: postId,
            type: 'post'
        };
        if (!addedComment) {
            console.error("Comment is empty or undefined for post:", postId);
            return;
        }

        setLoading(true);
        try {
            console.log('Sending data:', data);
            const response = await axios.post('https://green-api-nu.vercel.app/api/comments', data, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('response:', response.data);
            dispatch(sendComment(response.data))
        } catch (error) {
            console.error('Error response:', error.response);
            setError('error', error);
        } finally {
            setLoading(false);
            setComment(prevState => ({
                ...prevState,
                [postId]: ''
            }));
        }
    };

    //get comments 
    const handleGetComments = async (id, token) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://green-api-nu.vercel.app/api/comments/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data)
            dispatch(getComments({ [id]: response.data }));
        }
        catch (error) {
            setError('error', error)
        } finally {
            setLoading(false);
        }
    }

    //delete post
    const handleDeletePost = async (id) => {
        setLoading(true);
        try {
            const response = await axios.delete(`https://green-api-nu.vercel.app/api/posts/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log('Post deleted successfully:', response.data);
            setDropDownMenu(null);
            dispatch(removePost(id));
        } catch (error) {
            setError('Error: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    }

    //delete comment
    const handledeleteComment = async (id) => {
        setLoading(true);
        try {
            const response = await axios.delete(` https://green-api-nu.vercel.app/api/comments/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log('Post deleted successfully:', response.data);
            dispatch(removeComment(id));
        } catch (error) {
            setError('Error: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }

    }

    const displayedPosts = location.pathname === '/savedposts'
        ? savedPosts
        : location.pathname === '/'
            ? filteredPosts
            : myPosts;


    return (
        <div className="flex flex-col gap-5" >
            {
                displayedPosts.length > 0 ? displayedPosts.map((post) => {
                    const { createdAt, createdBy, description, likes, shares, _id, comments } = post;
                    const matchingUser = users.find(user => user._id === createdBy);
                    const formattedDate = new Date(createdAt).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    });

                    return (
                        <div className="mt-2 bg-white shadow-lg rounded-lg p-8 mb-6 " key={_id}>
                            <div className="flex gap-3 mb-3 relative">
                                <ProfileImage usersId={matchingUser._id} />
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
                                    <button onClick={() => openDropDownMenu(_id)}>
                                        <IoIosMore size={40} />
                                    </button>
                                    <div className="relative">
                                        {dropDownMenu === post._id && (
                                            <div className="absolute right-0 bg-white shadow-lg rounded-md p-5">
                                                <button onClick={() => handleSendPost(post, token)} className="flex items-center gap-3 mt-2 text-xl font-semibold text-blue-500 hover:text-blue-600 transition-all transform hover:scale-110 cursor-pointer">
                                                    <FaSave size={30} color="#6495ED" />
                                                    {post.savedBy.includes(user._id) ? 'Saved Post' : 'Save Post'}
                                                </button>
                                                <button className="flex items-center gap-3 mt-2 text-xl font-semibold text-blue-500 hover:text-blue-600 transition-all transform hover:scale-110 cursor-pointer">
                                                    <IoIosNotifications size={30} color="#6495ED" />
                                                    Notifications
                                                </button>
                                                <button onClick={() => handleDeletePost(post._id)} className="flex items-center gap-3 mt-2 text-xl font-semibold text-blue-500 hover:text-blue-600 transition-all transform hover:scale-110 cursor-pointer">
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
                                    {photosOfPosts ?
                                        (photosOfPosts.filter(photo => post._id === photo.entityId).map(photo => (
                                            <img
                                                key={photo._id}
                                                src={photo.base64}
                                                alt="dog"
                                                className="w-full h-full object-cover"
                                            />
                                        ))) : (null)
                                    }
                                    { /*  < img src={image1} alt="dog" className="w-full h-auto object-cover" />*/}
                                </div>
                            </div>
                            <div className="flex gap-8 items-center mt-6">
                                <button className="flex items-center gap-2">
                                    <FaRegHeart size={30} className="text-blue-500 hover:text-blue-600" />
                                    <span className="font-semibold">{likes}</span>
                                </button>
                                <button onClick={() => handleGetComments(post._id, token)} className="flex items-center gap-2">
                                    <FaRegCommentAlt size={30} className="text-blue-500 hover:text-blue-600" />
                                    <span className="font-semibold">
                                        {comments}
                                    </span>
                                </button>

                                <button className="flex items-center gap-2">
                                    <TbShare3 size={30} className="text-blue-500 hover:text-blue-600" />
                                    <span className="font-semibold">{shares}</span>
                                </button>
                            </div>
                            <div className="flex items-start gap-5 mt-4">
                                <ProfileImage usersId={user._id} />
                                <div className="flex flex-col flex-grow">
                                    <input value={comment[post._id] || ''} onChange={(e) => setComment(prevState => ({
                                        ...prevState,
                                        [post._id]: e.target.value
                                    }))} className="border w-full h-14 rounded-full bg-gray-100 p-4 resize-none outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden"
                                        placeholder="Leave a comment..." />
                                    <div className="flex justify-end gap-4 items-center mt-2">
                                        <button>
                                            <IoImagesOutline size={35} className="text-blue-500 hover:text-blue-600" />
                                        </button>
                                        <button onClick={() => handleShareComment(comment, post._id, token)} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-bold">
                                            Comment
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {commentsByPostId[post._id] && commentsByPostId[post._id].length > 0 && (
                                <div className="mt-4 space-y-4">
                                    {commentsByPostId[post._id].map((el) => {
                                        const user = users.find(user => user._id === el.createdBy);
                                        return (
                                            <div key={el._id} className="flex gap-4 bg-white shadow-md rounded-lg p-4 border border-gray-200">
                                                <div className="flex-row ml-4">
                                                    <ProfileImage usersId={user._id} />
                                                    <p className="font-bold text-blue-600 text-xl">
                                                        {user.firstName} {user.lastName}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xl text-black">
                                                        {el.description}
                                                    </p>
                                                    <p className=" mt-4 text-md text-gray-700">{new Date(el.createdAt).toLocaleString()}</p>
                                                </div>
                                                <div>
                                                    <MdDeleteForever size={50} color="red" onClick={() => handledeleteComment(el._id)} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )
                            }

                        </div>
                    );
                }) : <p>No posts available</p>
            }
        </div >
    );
}


export default Post;