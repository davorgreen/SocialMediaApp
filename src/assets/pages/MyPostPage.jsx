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
    const { token, users } = useSelector((state) => state.userStore);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {

                const postsResponse = await fetchPosts(token);
                const posts = postsResponse.data;

                const postsPhotos = await Promise.all(
                    posts.map(post => fetchPostPhoto(post._id, token).then(res => res.data))
                );

                const userPhotos = await Promise.all(
                    users.map(user => fetchUsersPhoto(user._id, token).then(res => res.data))
                );


                dispatch(getOnlyUserPosts(posts));
                dispatch(handlePostsPhotos(postsPhotos.flat()));
                dispatch(handleUsersPhotos(userPhotos.flat()));
            } catch (error) {
                setError('Error fetching data: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch, token, users]);


    return (
        <div>{loading ? (<div className="flex items-center justify-center min-h-screen"><ThreeCircles
            visible={loading}
            height="100"
            width="100"
            color="#0981bd"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
        /></div>) : <Post />}</div>
    )
}

export default MyPostPage