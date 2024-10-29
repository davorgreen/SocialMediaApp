//image
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ProfileImage({ size, isUserProfile }) {
    const { profilePhoto } = useSelector((state) => state.photoStore);
    const { user } = useSelector((state) => state.userStore);



    let width = 'w-12';
    let height = 'h-14';
    if (size === 'big') {
        width = 'w-36'
        height = 'h-36'
    }

    const userPhoto = profilePhoto.find(photo => photo.entityId === user._id);
    return (
        <Link to={'/profile'}>
            <div>
                {userPhoto && isUserProfile ? (
                    <img
                        src={userPhoto.base64}
                        alt="Profile photo"
                        className={`${width} ${height} rounded-full object-cover`}
                    />
                ) : (
                    <div
                        className={`${width} ${height} rounded-full object-cover bg-gray-400`}
                    ></div>
                )}
            </div>
        </Link>
    );
}

export default ProfileImage