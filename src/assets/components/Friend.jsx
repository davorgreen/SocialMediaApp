import { useSelector } from "react-redux";
import ProfileImage from "./ProfileImage";


function Friend() {
    const { friends } = useSelector((state) => state.userStore);
    return (
        <div className="flex flex-col gap-4">
            {friends.map(friend => {
                return (
                    <div key={friend._id} className="flex gap-4">
                        <ProfileImage friendId={friend._id} isUserProfile={false} />
                        <div className="flex flex-col justify-center">
                            <p className="text-lg font-bold text-blue-400">
                                {friend.firstName} {friend.lastName}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Friend;
