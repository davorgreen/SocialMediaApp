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
        <div className="bg-gray-100 w-full mt-5">
            <Header />
            <Story />
            <div className="flex flex-col mx-auto gap-8 lg:flex-row px-4">
                <div className="md:w-1/3 w-full lg:max-w-md">
                    <Sidebar />
                </div>
                <div className="sm:ml-10 mr-6 mt-10">
                    <div className=" w-full  bg-white p-6 rounded-lg shadow-lg mb-6">
                        <CreatePost />
                    </div>
                    <div className="">
                        <Post filteredPosts={filteredPosts} />
                    </div>
                </div>
            </div>
        </div>


    );
}

export default HomePage;
