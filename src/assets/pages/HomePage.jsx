import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import CreatePost from '../components//CreatePost'
import Post from '../components/Post'
import Story from '../components/Story'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AllPosts } from '../../slices/PostsSlice'
import axios from 'axios'
import { allUsers, myFriends, mySuggestedFriends } from '../../slices/UserSlice'



function HomePage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.userStore);


    //get friends
    useEffect(() => {
        const friendsList = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/friends', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                dispatch(myFriends(response.data))
            } catch (error) {
                setError('Error', error);
            } finally {
                setLoading(false);
            }
        };
        friendsList();
    }, []);



    //get all users
    useEffect(() => {
        const usersList = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                dispatch(allUsers(response.data));
                dispatch(mySuggestedFriends(response.data));
            } catch (error) {
                setError('Error', error);
            }
            setLoading(false);
        }
        usersList();
    }, []);



    //get all posts
    useEffect(() => {
        const getAllPosts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/posts?offset=0&limit=20', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                dispatch(AllPosts(response.data));
            } catch (error) {
                setError('Error', error);
            }
            setLoading(false);
        }
        getAllPosts();
    }, [])

    return (
        <div>
            <Header />
            <Story />
            <div className="flex flex-col max-w-7xl mx-auto mt-5 gap-8 md:flex-row">
                <div className="md:w-1/4 w-[420px]">
                    <Sidebar />
                </div>
                <div className="w-3/4 ml-20 md:ml-0">
                    <CreatePost />
                    <Post />
                </div>
            </div>
        </div>
    )
}

export default HomePage