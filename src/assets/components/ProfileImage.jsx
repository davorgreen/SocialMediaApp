import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


function ProfileImage({ size, isUserProfile, friendId, suggestedFriendId, usersId }) {
    const { profilePhoto } = useSelector((state) => state.photoStore);
    const { user } = useSelector((state) => state.userStore);
    const { usersPhotos } = useSelector((state) => state.photoStore);
    const myUserPhoto = profilePhoto.find(photo => photo.entityId === user._id && photo.type === 'profile');
    const friendPhoto = usersPhotos.find(photo =>
        (photo.entityId === friendId || photo.entityId === suggestedFriendId || photo.entityId === usersId)
        && photo.type === 'profile'
    );


    let width = 'w-12';
    let height = 'h-14';
    if (size === 'big') {
        width = 'w-36';
        height = 'h-36';
    }

    return (
        <Link to={`/profile/${friendId}`}>
            <div>
                {isUserProfile ? (
                    myUserPhoto ? (
                        <img
                            src={myUserPhoto.url}
                            alt={myUserPhoto.type}
                            className={`${width} ${height} rounded-full object-cover`}
                        />
                    ) : (
                        <div className={`${width} ${height} rounded-full object-cover bg-gray-400`}></div>
                    )
                ) : (
                    friendPhoto ? (
                        <img
                            src={friendPhoto.url}
                            alt={friendPhoto.type}
                            className={`${width} ${height} rounded-full object-cover`}
                        />
                    ) : (
                        <div className={`${width} ${height} rounded-full object-cover bg-gray-400`}></div>
                    )
                )}
            </div>
        </Link>
    );
}

export default ProfileImage;
