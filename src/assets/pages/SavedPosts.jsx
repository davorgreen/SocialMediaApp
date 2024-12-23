import Post from "../components/Post"
import Sidebar from "../components/Sidebar"
//hook
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
//spinner
import { ThreeCircles } from "react-loader-spinner";
//slices
import { handlePostsPhotos, handleUsersPhotos } from "../../slices/PhotoSlice";
import { getOnlyUserPosts, getUserSavedPosts } from "../../slices/CombinedSlice";
//api
import { fetchPostPhoto, fetchPosts, fetchUsers, fetchUsersPhoto } from "../../services/api";
import { allUsers } from "../../slices/UserSlice";


function SavedPosts() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { token, users } = useSelector((state) => state.userStore);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                //users
                const usersResponse = await fetchUsers(token);
                dispatch(allUsers(usersResponse.data));
                //posts
                const postsResponse = await fetchPosts(token);
                const posts = postsResponse.data;
                //photos of posts
                const postsPhotos = await Promise.all(
                    posts.map(post => fetchPostPhoto(post._id, token).then(res => res.data))
                );
                //user photos
                const userPhotos = await Promise.all(
                    usersResponse.data.map(user => fetchUsersPhoto(user._id, token).then(res => res.data))
                );


                dispatch(getOnlyUserPosts(posts));
                dispatch(getUserSavedPosts(posts));
                dispatch(handlePostsPhotos(postsPhotos.flat()));
                dispatch(handleUsersPhotos(userPhotos.flat()));
            } catch (error) {
                setError('Error fetching data: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch, token]);



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
                /></div>) : (<Post />)
            }

            </div>
        </div>
    )
}

export default SavedPosts