import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import Story from '../components/Story';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllPosts } from '../../slices/PostsSlice';
import axios from 'axios';
import { allUsers, myFriends, mySuggestedFriends } from '../../slices/UserSlice';
import { ThreeCircles } from 'react-loader-spinner';

function HomePage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.userStore);
    const { user } = useSelector((state) => state.userStore);
    const { posts } = useSelector((state) => state.postsStore);
    const { friends } = useSelector((state) => state.userStore);

    //filtered posts
    const filteredPosts = useMemo(() => {
        return posts
            .filter(post =>
                post.createdBy === user._id ||
                friends.some(friend => friend._id === post.createdBy)
            )
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [user, friends, posts]);

    //get friends
    useEffect(() => {
        const friendsList = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://green-api-nu.vercel.app/api/friends', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                dispatch(myFriends(response.data));
            } catch (error) {
                setError('Error: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        friendsList();
    }, [dispatch, token]);

    //get all users
    useEffect(() => {
        const usersList = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://green-api-nu.vercel.app/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                dispatch(allUsers(response.data));
                dispatch(mySuggestedFriends(response.data));
            } catch (error) {
                setError('Error: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        usersList();
    }, [dispatch, token]);

    //get all posts
    useEffect(() => {
        const getAllPosts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://green-api-nu.vercel.app/api/posts?offset=0&limit=20', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                dispatch(AllPosts(response.data));
            } catch (error) {
                setError('Error: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        getAllPosts();
    }, [dispatch, token]);

    return (
        <div>
            <Header />
            <Story />
            {loading ? (<div className="flex items-center justify-center min-h-screen"><ThreeCircles
                visible={loading}
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
            /></div>) : (
                <div className="flex flex-col max-w-7xl mx-auto mt-5 gap-8 md:flex-row">
                    <div className="md:w-1/4 w-[420px]">
                        <Sidebar />
                    </div>
                    <div className="w-3/4 ml-20 md:ml-0">
                        <CreatePost />
                        <Post filteredPosts={filteredPosts} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;
