import { useSelector } from "react-redux"
import Post from "../components/Post"
import Sidebar from "../components/Sidebar"
import { useMemo } from "react";


function SavedPosts() {
    const { posts } = useSelector((state) => state.postsStore);
    const { user } = useSelector((state) => state.userStore);
    const { postsPhotos } = useSelector((state) => state.photoStore);

    const savedPosts = useMemo(() => {
        return posts.filter((post) => post.savedBy.includes(user._id));
    }, [posts, user._id]);

    return (
        <div className="flex flex-col lg:flex-row gap-6 w-full mt-10 px-4">
            <div className="w-full lg:w-1/4 md:w-1/4 md:ml-10">
                <Sidebar />
            </div>
            <div className="w-full md:w-3/4">
                <Post savedPosts={savedPosts} photosOfPosts={postsPhotos} />
            </div>
        </div>

    )
}

export default SavedPosts