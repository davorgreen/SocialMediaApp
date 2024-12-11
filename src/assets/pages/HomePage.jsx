//component
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
//hooks
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//api
import { fetchFriends, fetchPhotos, fetchPostPhoto, fetchPosts, fetchUsers, fetchUsersPhoto } from '../../services/api';
//slice
import { allUsers, entirePosts, myFriends, mySuggestedFriends } from '../../slices/UserSlice';
import { AllPosts } from '../../slices/PostsSlice';
import { allOfPhotos, filteredPhotos, handlePostsPhotos, handleStoryPhoto, handleUsersPhotos } from '../../slices/PhotoSlice';
//spinner
import { ThreeCircles } from 'react-loader-spinner';


const Header = React.lazy(() => import('../components/Header'));
const Sidebar = React.lazy(() => import('../components/Sidebar'));
const Story = React.lazy(() => import('../components/Story'));
function HomePage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { token, user } = useSelector((state) => state.userStore);

    //fetch all data
    const fetchData = useCallback(async () => {
        try {
            //users
            const usersResponse = await fetchUsers(token);
            dispatch(allUsers(usersResponse.data));



            //friends
            const friendsResponse = await fetchFriends(token);
            dispatch(myFriends(friendsResponse.data));

            dispatch(mySuggestedFriends(usersResponse.data));

            //posts
            const postsResponse = await fetchPosts(token);
            dispatch(AllPosts(postsResponse.data));
            dispatch(entirePosts(postsResponse.data));

            //specific posts photos
            const mineOrFriendsPost = await Promise.all(
                postsResponse.data.map(post => fetchPostPhoto(post._id, token).then(res => res.data))
            );
            const specificPostsPhotos = mineOrFriendsPost.flat();
            dispatch(handlePostsPhotos(specificPostsPhotos));

            //user photos
            const photosResponse = await fetchPhotos(user._id, token);
            console.log(photosResponse.data)
            dispatch(filteredPhotos(photosResponse.data))
            dispatch(allOfPhotos(photosResponse.data))

            //all users photos
            const allUsersPhotos = await Promise.all(
                usersResponse.data.map(user =>
                    fetchUsersPhoto(user._id, token).then(res => res.data)))
            const specificUserPhotos = allUsersPhotos.flat();
            console.log(allUsersPhotos)
            dispatch(handleUsersPhotos(specificUserPhotos));
            dispatch(handleStoryPhoto(specificUserPhotos));

        } catch (error) {
            setError('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    }, [user, dispatch, token])



    useEffect(() => {
        fetchData();
    }, [fetchData]);


    return (
        <div className="bg-gray-100  mt-5">
            {loading ? (<div className="flex items-center justify-center h-screen"><ThreeCircles
                visible={loading}
                height="100"
                width="100"
                color="#0981bd"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
            /></div>) : (<> <React.Suspense fallback={<div>Loading...</div>}>
                <Header />
                <Story />
            </React.Suspense>
                <div className="flex flex-col mx-auto gap-8 lg:flex-row px-4 w-full">
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <div className="md:w-1/3 lg:max-w-md w-1/3">
                            <Sidebar />
                        </div>
                    </React.Suspense>
                    <div className="sm:ml-10 lg:ml-6 lg:mr-10 mt-6 w-2/3">
                        <div className="lg:w-full p-6 rounded-lg shadow-lg mb-6">
                            <CreatePost />
                        </div>
                        <div className="lg:w-full p-6 rounded-lg shadow-lg mb-6"><Post /></div>
                    </div>
                </div>
            </>)
            }
        </div >
    );
}

export default HomePage;
