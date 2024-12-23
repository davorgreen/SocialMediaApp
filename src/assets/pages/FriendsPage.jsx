//hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//axios
import axios from "axios";
//components
import ProfileImage from "../components/ProfileImage";
import Friend from "../components/Friend";
//redux
import { addFriendToList, allUsers, myFriends, mySuggestedFriends, removeSuggestedFriend } from "../../slices/UserSlice";
import { handleUsersPhotos } from "../../slices/PhotoSlice";
//api
import { fetchFriends, fetchUsers, fetchUsersPhoto } from "../../services/api";


function FriendsPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { suggestedFriends, token, users } = useSelector((state) => state.userStore);
    const dispatch = useDispatch();

    //adding new friends
    const handleAddFriend = async (friend) => {
        setLoading(true);
        try {
            const response = await axios.post('https://green-api-nu.vercel.app/api/friends', { userId: friend._id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(addFriendToList(friend));
            dispatch(removeSuggestedFriend(friend._id));
        } catch (error) {
            setError('Error', error)
        }
        setLoading(false);
    }


    //all of users
    useEffect(() => {
        const getAllOfUser = async () => {
            setLoading(true);
            try {
                //users
                const usersResponse = await fetchUsers(token);
                dispatch(allUsers(usersResponse.data));

                //friends
                const friendsResponse = await fetchFriends(token);
                dispatch(myFriends(friendsResponse.data));

                dispatch(mySuggestedFriends(usersResponse.data));

                const userPhotos = await Promise.all(
                    users.map(user => fetchUsersPhoto(user._id, token).then(res => res.data))
                );
                dispatch(handleUsersPhotos(userPhotos.flat()));
            } catch (error) {
                setError('Error fetching: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        getAllOfUser();
    }, [dispatch, token, users]);

    return (
        <div className="flex flex-col gap-5 items-center md:items-start bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-2xl mb-2 font-bold text-blue-500">Friends</h2>
            <div className="grid-rows-1 md:grid grid-cols-2 gap-6">
                <Friend />
            </div>
            <div className="flex flex-col items-center mt-8 gap-8">
                <h2 className="text-2xl mb-2 font-bold text-blue-500">Suggested Friends</h2>
                <div className="flex justify-center gap-6 flex-wrap">
                    {suggestedFriends.map((el, index) => (
                        <div key={index} className="w-40 h-60 flex flex-col items-center gap-2 bg-blue-200 shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
                            <ProfileImage suggestedFriendId={el._id} />
                            <p className="text-xl font-semibold text-blue-500 text-center">{el.firstName} {el.lastName}</p>
                            <p className="text-sm font-semibold text-blue-500 text-center">{el.city}, {el.countryCode}</p>
                            <div className="mt-auto">
                                <button onClick={() => handleAddFriend(el)} className="px-4 py-2 font-bold bg-blue-700 text-white rounded-lg w-full"> Add Friend</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default FriendsPage;