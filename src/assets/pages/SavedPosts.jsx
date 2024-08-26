import Post from "../components/Post"
import Sidebar from "../components/Sidebar"


function SavedPosts() {
    return (
        <div className="flex-row md:flex gap-10 w-full mt-10">
            <div className="ml-4 w-2/3">
                <Sidebar />
            </div>
            <div><Post /></div>
        </div>
    )
}

export default SavedPosts