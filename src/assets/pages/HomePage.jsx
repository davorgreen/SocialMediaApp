import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import Story from '../components/Story';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllPosts } from '../../slices/PostsSlice';
import axios from 'axios';
import { allUsers, myFriends, mySuggestedFriends } from '../../slices/UserSlice';
import { ThreeCircles } from 'react-loader-spinner';
import { allOfPhotos, filteredPhotos, handlePostsPhotos, handleUsersPhotos } from '../../slices/PhotoSlice';



function HomePage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const [photosOfPosts, setPhotosofPosts] = useState([]);
    const { token } = useSelector((state) => state.userStore);
    const { user } = useSelector((state) => state.userStore);
    const { users } = useSelector((state) => state.userStore);
    const { posts } = useSelector((state) => state.postsStore);
    const { friends } = useSelector((state) => state.userStore);

    //filtered posts
    const filteredPosts = useMemo(() => {
        return posts
            .filter(post =>
                post.createdBy === user._id ||
                friends.some(friend => friend._id === post.createdBy)
            )
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [user, friends, posts]);

    //get friends
    useEffect(() => {
        const friendsList = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://green-api-nu.vercel.app/api/friends', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                dispatch(myFriends(response.data));
            } catch (error) {
                setError('Error: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        friendsList();
    }, [dispatch, token]);

    //get all users
    useEffect(() => {
        const usersList = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://green-api-nu.vercel.app/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                dispatch(allUsers(response.data));
                dispatch(mySuggestedFriends(response.data));
            } catch (error) {
                setError('Error: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        usersList();
    }, [dispatch, token]);

    //get all posts
    useEffect(() => {
        const getAllPosts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://green-api-nu.vercel.app/api/posts?offset=0&limit=50', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                dispatch(AllPosts(response.data));
            } catch (error) {
                setError('Error: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        getAllPosts();
    }, [dispatch, token]);

    //get user photos 
    useEffect(() => {
        const getAllPhotos = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://green-api-nu.vercel.app/api/photos', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                dispatch(allOfPhotos(response.data));
                dispatch(filteredPhotos(response.data));
            } catch (error) {
                setError("Error: " + (error.response?.data?.message || error.message));
            } finally {
                setLoading(false);
            }
        };
        getAllPhotos();
    }, [dispatch, token]);

    //get users photo 
    useEffect(() => {
        const fetchUSersPhoto = async () => {
            setLoading(true);
            try {
                const photos = await Promise.all(
                    users.map(async (user) => {
                        const response = await axios.get(`https://green-api-nu.vercel.app/api/photos/${user._id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        return response.data || [];
                    })
                )
                dispatch(handleUsersPhotos(photos));
            } catch (error) {
                setError('Error', error);
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchUSersPhoto()
    }, [token, dispatch, users]);


    //get posts photo
    useEffect(() => {
        const fetchPostsPhoto = async () => {
            setLoading(true);
            try {
                const postPhotos = await Promise.all(
                    filteredPosts.map(async (post) => {
                        const response = await axios.get(`https://green-api-nu.vercel.app/api/photos/${post._id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        return response.data || [];
                    })
                );
                setPhotosofPosts(postPhotos.flat());
                dispatch(handlePostsPhotos(postPhotos.flat()))
            } catch (error) {
                setError('Došlo je do greške prilikom učitavanja slika.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPostsPhoto();

    }, [filteredPosts, token, dispatch]);

    return (
        <div className="bg-gray-100 w-full mt-5">
            <Header />
            <Story />
            <div className="flex flex-col mx-auto gap-8 lg:flex-row px-4">
                <div className="md:w-1/3 w-full lg:max-w-md">
                    <Sidebar />
                </div>
                <div className="sm:ml-10 mr-6 mt-10">
                    <div className=" w-full  bg-white p-6 rounded-lg shadow-lg mb-6">
                        <CreatePost />
                    </div>
                    <div className="">
                        {loading ? (<div className="flex items-center justify-center min-h-screen"><ThreeCircles
                            visible={loading}
                            height="100"
                            width="100"
                            color="#4fa94d"
                            ariaLabel="three-circles-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        /></div>) : (<Post filteredPosts={filteredPosts} photosOfPosts={photosOfPosts} />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
