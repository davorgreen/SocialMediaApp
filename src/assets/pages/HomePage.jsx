//component
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import Story from '../components/Story';
//hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//api
import { fetchFriends, fetchPhotos, fetchPostPhoto, fetchPosts, fetchUsers, fetchUsersPhoto } from '../../services/api';
//slice
import { entirePosts, myFriends, mySuggestedFriends } from '../../slices/UserSlice';
import { AllPosts } from '../../slices/PostsSlice';
import { allOfPhotos, filteredPhotos, handlePostsPhotos, handleStoryPhoto, handleUsersPhotos } from '../../slices/PhotoSlice';
//spinner
import { ThreeCircles } from 'react-loader-spinner';


function HomePage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { token, users, myOrFriendsPosts } = useSelector((state) => state.userStore);
    const { postsPhotos } = useSelector((state) => state.photoStore);


    //all users
    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const usersResponse = await fetchUsers(token);
                dispatch(mySuggestedFriends(usersResponse.data));
            } catch (error) {
                setError('Error: ' + error.message);
            }
        }
        fetchAllUsers();
    }, [dispatch, token])


    //friends
    useEffect(() => {
        const fetchFriendsData = async () => {
            try {
                const friendsResponse = await fetchFriends(token);
                dispatch(myFriends(friendsResponse.data));
                dispatch
            } catch (error) {
                setError('Error: ' + error.message);
            }
        };
        fetchFriendsData();
    }, [dispatch, token]);


    //posts
    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const postsResponse = await fetchPosts(token);
                dispatch(AllPosts(postsResponse.data));
                dispatch(entirePosts(postsResponse.data));
            } catch (error) {
                setError('Error: ' + error.message);
            }
        }
        fetchAllPosts();
    }, [dispatch, token])

    //user photos
    useEffect(() => {
        const fetchUserPhotos = async () => {
            setLoading(true);
            try {
                const photosResponse = await fetchPhotos(token);
                dispatch(allOfPhotos(photosResponse.data));
                dispatch(filteredPhotos(photosResponse.data));
            } catch (error) {
                setError('Error fetching photos: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUserPhotos();
    }, [dispatch, token]);

    //all photos of users
    useEffect(() => {
        const getUserPhotos = async () => {
            setLoading(true);
            try {
                const userPhotos = await Promise.all(
                    users.map(user => fetchUsersPhoto(user._id, token).then(res => res.data))
                );
                dispatch(handleUsersPhotos(userPhotos.flat()));
                dispatch(handleStoryPhoto(userPhotos.flat()));
            } catch (error) {
                setError('Error fetching user photos: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        getUserPhotos();
    }, [dispatch, token, users]);

    //posts photos
    useEffect(() => {
        const getSpecificPosts = async () => {
            setLoading(true);
            try {
                const mineOrFriendsPost = await Promise.all(
                    myOrFriendsPosts.map(user => fetchPostPhoto(user._id, token).then(res => res.data))
                );
                dispatch(handlePostsPhotos(mineOrFriendsPost.flat()));
            } catch (error) {
                setError('Error fetching user photos: ' + error.message);
            } finally {
                setLoading(false);
            }

        }
        getSpecificPosts()
    }, [token, myOrFriendsPosts, dispatch])




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
                        /></div>) : (<Post filteredPosts={myOrFriendsPosts} photosOfPosts={postsPhotos} />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
