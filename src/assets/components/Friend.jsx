import { useDispatch, useSelector } from "react-redux"
import ProfileImage from "./ProfileImage"
import { useEffect, useState } from "react";
import axios from "axios";
import { friendsData } from "../../slices/FriendsSlice";



function Friend() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.userStore);
    const { friends } = useSelector((state) => state.friendsStore);



    useEffect(() => {

        const fetchFriends = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/friends', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                const data = response.data;
                dispatch(friendsData(data))
            } catch (error) {
                setError('Error', error)
            }
            setLoading(false);


        }
        fetchFriends()
    }, []);

    return (
        <div className="flex flex-col gap-4">
            {friends && friends.length > 0 ? (
                friends.map((friend) => (
                    <div key={friend._id} className="flex gap-4">
                        <ProfileImage />
                        <div className="flex flex-col">
                            <p className="text-lg font-bold text-blue-400">
                                {friend.firstName} {friend.lastName}
                            </p>
                            <p className="text-sm text-gray-500">
                                {friend.mutualFriends} mutual friends
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <p className=" font-bold text-gray-500">No friends added yet.</p>
            )}
        </div>
    )
}

export default Friend;