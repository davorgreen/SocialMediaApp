//component
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import Story from '../components/Story';
//hooks
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
    const { token, myOrFriendsPosts, users } = useSelector((state) => state.userStore);
    const { postsPhotos } = useSelector((state) => state.photoStore);


    //fetch all data
    const fetchData = useCallback(async () => {
        try {
            //users
            const usersResponse = await fetchUsers(token);
            dispatch(mySuggestedFriends(usersResponse.data));

            //friends
            const friendsResponse = await fetchFriends(token);
            dispatch(myFriends(friendsResponse.data));

            //posts
            const postsResponse = await fetchPosts(token);
            dispatch(AllPosts(postsResponse.data));
            dispatch(entirePosts(postsResponse.data));

            //specific posts photos
            const mineOrFriendsPost = await Promise.all(
                postsResponse.data.map(post => fetchPostPhoto(post._id, token).then(res => res.data))
            );
            dispatch(handlePostsPhotos(mineOrFriendsPost.flat()));

            //user photos
            const photosResponse = await fetchPhotos(token);
            dispatch(allOfPhotos(photosResponse.data));
            dispatch(filteredPhotos(photosResponse.data));


            //all users photos
            const userPhotos = await Promise.all(
                usersResponse.data.map(user => fetchUsersPhoto(user._id, token).then(res => res.data))
            );
            console.log(userPhotos.data)

            dispatch(handleUsersPhotos(userPhotos.data.flat()));
            dispatch(handleStoryPhoto(userPhotos.data.flat()));


        } catch (error) {
            setError('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    }, [dispatch, token]);


    useEffect(() => {
        fetchData();
    }, [fetchData]);


    /* const renderedPosts = useMemo(() => {
         return myOrFriendsPosts && myOrFriendsPosts.length > 0 ? (
             <Post />
         ) : (
             <p className="text-center text-gray-500">No posts available</p>
         );
     }, [myOrFriendsPosts, postsPhotos]);*/

    return (
        <div className="bg-gray-100  mt-5">
            {loading ? (<div className="flex items-center justify-center min-h-screen"><ThreeCircles
                visible={loading}
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
            /></div>) : (<> <React.Suspense fallback={<div>Loading...</div>}>
                <Header />
                <Story />
                <div className="flex flex-col mx-auto gap-8 lg:flex-row px-4">
                    <div className="md:w-1/3 lg:max-w-md w-full">
                        <Sidebar />
                    </div>
                    <div className="sm:ml-10 lg:ml-6 lg:mr-10 mt-6">
                        <div className="lg:w-full p-6 rounded-lg shadow-lg mb-6">
                            <CreatePost />
                        </div>
                        <div className="lg:w-full p-6 rounded-lg shadow-lg mb-6"><Post /></div>
                    </div>
                </div>
            </React.Suspense>
            </>)
            }
        </div >
    );
}

export default HomePage;
