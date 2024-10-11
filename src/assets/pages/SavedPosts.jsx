import { useSelector } from "react-redux";
import Post from "../components/Post"
import Sidebar from "../components/Sidebar"


function SavedPosts() {
    const { savedPosts } = useSelector((state) => state.postsStore);

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