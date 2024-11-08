import Post from "../components/Post"
import Sidebar from "../components/Sidebar"
//hook
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
//spinner
import { ThreeCircles } from "react-loader-spinner";
//slices
import { handlePostsPhotos, handleUsersPhotos } from "../../slices/PhotoSlice";
import { getUserSavedPosts } from "../../slices/CombinedSlice";
//api
import { fetchPostPhoto, fetchPosts, fetchUsersPhoto } from "../../services/api";


function SavedPosts() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { token, users } = useSelector((state) => state.userStore);
    const { postsPhotos } = useSelector((state) => state.photoStore);
    const { mySavedPosts } = useSelector((state) => state.combinedStore);



    //get all posts
    useEffect(() => {
        setLoading(true);
        const fetchAllPosts = async () => {
            try {
                const postsResponse = await fetchPosts(token);
                dispatch(getUserSavedPosts(postsResponse.data));

            } catch (error) {
                setError('Error: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchAllPosts();
    }, [dispatch, token])


    //all photos of users
    useEffect(() => {
        const getUserPhotos = async () => {
            setLoading(true);
            try {
                const userPhotos = await Promise.all(
                    users.map(user => fetchUsersPhoto(user._id, token).then(res => res.data))
                );
                dispatch(handleUsersPhotos(userPhotos.flat()));
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
                    mySavedPosts.map(user => fetchPostPhoto(user._id, token).then(res => res.data))
                );
                dispatch(handlePostsPhotos(mineOrFriendsPost.flat()));
            } catch (error) {
                setError('Error fetching user photos: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
        getSpecificPosts()
    }, [token, mySavedPosts, dispatch])


    return (
        <div className="flex flex-col lg:flex-row gap-6 w-full mt-10 px-4">
            <div className="w-full lg:w-1/4 md:w-1/4 md:ml-10">
                <Sidebar />
            </div>
            <div className="w-full md:w-3/4">{
                loading ? (<div className="flex items-center justify-center min-h-screen"><ThreeCircles
                    visible={loading}
                    height="100"
                    width="100"
                    color="#0981bd"
                    ariaLabel="three-circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                /></div>) : (<Post savedPosts={mySavedPosts} photosOfPosts={postsPhotos} />)
            }

            </div>
        </div>
    )
}

export default SavedPosts