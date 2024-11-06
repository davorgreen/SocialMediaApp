import { useDispatch, useSelector } from "react-redux"
import Post from "../components/Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { getOnlyUserPosts } from "../../slices/CombinedSlice";
import { ThreeCircles } from "react-loader-spinner";
import { handlePostsPhotos } from "../../slices/PhotoSlice";


function MyPostPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.postsStore);
    const { user, token } = useSelector((state) => state.userStore);
    const { postsPhotos } = useSelector((state) => state.photoStore);
    const { myPosts } = useSelector((state) => state.combinedStore);

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
                dispatch(getOnlyUserPosts(response.data));
            } catch (error) {
                setError('Error: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        getAllPosts();
    }, [dispatch, token]);

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