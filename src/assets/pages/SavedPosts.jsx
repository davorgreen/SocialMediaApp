import { useSelector } from "react-redux"
import Post from "../components/Post"
import Sidebar from "../components/Sidebar"
import { useMemo } from "react";


function SavedPosts() {
    const { posts } = useSelector((state) => state.postsStore);
    console.log(posts)
    const { user } = useSelector((state) => state.userStore);

    const savedPosts = useMemo(() => {
        return posts.filter((post) => post.savedBy.includes(user._id));
    }, [posts, user._id]);

    console.log(savedPosts)

    return (
        <div className="flex-row md:flex gap-10 w-full mt-10">
            <div className="ml-4 w-2/3">
                <Sidebar />
            </div>
            <div>
                <Post savedPosts={savedPosts} />
            </div>
        </div>
    )
}

export default SavedPosts