import { useSelector } from "react-redux"
import Post from "../components/Post";


function MyPostPage() {
    const { posts } = useSelector((state) => state.postsStore);
    const { user } = useSelector((state) => state.userStore);
    const myPosts = posts.filter((post) => post.createdBy === user._id)
    console.log(myPosts)
    return (
        <div><Post myPosts={myPosts} /></div>
    )
}

export default MyPostPage