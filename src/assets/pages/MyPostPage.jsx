import Post from "../components/Post";
//hook
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
//spinner
import { ThreeCircles } from "react-loader-spinner";
//slices
import { getOnlyUserPosts } from "../../slices/CombinedSlice";
import { handlePostsPhotos, handleUsersPhotos } from "../../slices/PhotoSlice";
//api
import { fetchPostPhoto, fetchPosts, fetchUsersPhoto } from "../../services/api";


function MyPostPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.postsStore);
    const { user, token, users } = useSelector((state) => state.userStore);
    const { postsPhotos } = useSelector((state) => state.photoStore);
    const { myPosts } = useSelector((state) => state.combinedStore);

    //get all posts
    useEffect(() => {
        setLoading(true);
        const fetchAllPosts = async () => {
            try {
                const postsResponse = await fetchPosts(token);
                dispatch(getOnlyUserPosts(postsResponse.data));

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
                    myPosts.map(user => fetchPostPhoto(user._id, token).then(res => res.data))
                );
                dispatch(handlePostsPhotos(mineOrFriendsPost.flat()));
            } catch (error) {
                setError('Error fetching user photos: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
        getSpecificPosts()
    }, [token, myPosts, dispatch])


    return (
        <div>{loading ? (<div className="flex items-center justify-center min-h-screen"><ThreeCircles
            visible={loading}
            height="100"
            width="100"
            color="#0981bd"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
        /></div>) : <Post myPosts={myPosts} photosOfPosts={postsPhotos} />}</div>
    )
}

export default MyPostPage