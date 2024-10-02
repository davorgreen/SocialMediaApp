import { useEffect, useMemo, useState } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "../components/ProfileImage";
import { suggestedUsers } from "../../slices/FriendsSlice";
import Friend from "../components/Friend";

function FriendsPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.userStore);
    const { user } = useSelector((state) => state.userStore);
    const { suggestedFriends } = useSelector((state) => state.friendsStore);
    const { addedFriends } = useSelector((state) => state.friendsStore);


    const filteredUsers = useMemo(() => {
        return suggestedFriends.filter(friend =>
            friend._id !== user._id &&
            !addedFriends.some(addedFriend =>
                addedFriend._id === friend._id
            )
        );
    }, [suggestedFriends, user._id, addedFriends]);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                dispatch(suggestedUsers(response.data));
            } catch (error) {
                setError('Error', error);
            }
            setLoading(false);
        }
        fetchUsers();
    }, []);

    const handleAddFriend = async (friend) => {
        try {
            const response = await axios.post('/api/friends', { userId: friend._id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            setError('Error', error)
        }
    }

    return (
        <div className="flex flex-col gap-5 items-center md:items-start bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-2xl mb-2 font-bold text-blue-500">Friends</h2>
            <div className="grid-rows-1 md:grid grid-cols-2 gap-6">
                <Friend />
            </div>
            <div className="flex flex-col items-center mt-8 gap-8">
                <h2 className="text-2xl mb-2 font-bold text-blue-500">Suggested Friends</h2>
                <div className="flex justify-center gap-6 flex-wrap">
                    {filteredUsers.map((el, index) => (
                        <div key={index} className="w-40 h-60 flex flex-col items-center gap-2 bg-blue-200 shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
                            <ProfileImage />
                            <p className="text-xl font-semibold text-blue-500 text-center">{el.firstName} {el.lastName}</p>
                            <p className="text-sm font-semibold text-blue-500 text-center">{el.city}, {el.countryCode}</p>
                            <div className="mt-auto">
                                <button onClick={() => handleAddFriend(el)} className="px-4 py-2 font-bold bg-blue-700 text-white rounded-lg w-full">Add Friend</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    )
}

export default FriendsPage;