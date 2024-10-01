import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "./ProfileImage";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { friendsData, saveFriends } from "../../slices/FriendsSlice";

const getFilteredFriends = (friends, userId) => {
    return friends.map(friend => friend.userOneId === userId ? friend.userTwoId : friend.userOneId);
};

const getUniqueFriends = (friends) => {
    return friends.filter((value, index, self) => self.indexOf(value) === index);
};


const getSavedFriends = (suggestedFriends, uniqueFriends) => {
    return suggestedFriends.filter(friend => uniqueFriends.includes(friend._id));
};

function Friend() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.userStore);
    const { friends } = useSelector((state) => state.friendsStore);
    const { suggestedFriends } = useSelector((state) => state.friendsStore);
    const { user } = useSelector((state) => state.userStore);


    const uniqueFriends = useMemo(() => {
        const filtered = getFilteredFriends(friends, user._id);
        return getUniqueFriends(filtered);
    }, [friends, user._id]);


    const savedFriends = useMemo(() => {
        return getSavedFriends(suggestedFriends, uniqueFriends);
    }, [suggestedFriends, uniqueFriends]);

    useEffect(() => {
        const fetchFriends = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/friends', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data;
                dispatch(friendsData(data));
            } catch (error) {
                setError('Error', error);
            }
            setLoading(false);
        };
        fetchFriends();
    }, [token, dispatch]);

    useEffect(() => {
        dispatch(saveFriends(savedFriends))
    }, [savedFriends, dispatch]);

    return (
        <div className="flex flex-col gap-4">
            {savedFriends.map((friend, index) => (
                <div key={index} className="flex gap-4">
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
            ))}
        </div>
    );
}

export default Friend;
