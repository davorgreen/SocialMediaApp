import { useDispatch, useSelector } from "react-redux"
import Post from "../components/Post"
import Sidebar from "../components/Sidebar"
import { useEffect, useState } from "react";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { getUserSavedPosts } from "../../slices/CombinedSlice";




function SavedPosts() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.userStore);
    const { postsPhotos } = useSelector((state) => state.photoStore);
    const { mySavedPosts } = useSelector((state) => state.combinedStore);



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
                dispatch(getUserSavedPosts(response.data));
            } catch (error) {
                setError('Error: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        getAllPosts();
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
                /></div>) : (<Post savedPosts={mySavedPosts} photosOfPosts={postsPhotos} />)
            }

            </div>
        </div>
    )
}

export default SavedPosts