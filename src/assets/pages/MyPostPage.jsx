import { useSelector } from "react-redux"
import Post from "../components/Post";


function MyPostPage() {
    const { posts } = useSelector((state) => state.postsStore);
    const { user } = useSelector((state) => state.userStore);
    const myPosts = posts.filter((post) => post.createdBy === user._id);
    const { postsPhotos } = useSelector((state) => state.photoStore);

    return (
        <div><Post myPosts={myPosts} photosOfPosts={postsPhotos} /></div>
    )
}

export default MyPostPage