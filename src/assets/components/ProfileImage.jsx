//image
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProfileImage({ size }) {
    const { user } = useSelector((state) => state.userStore);
    let width = 'w-12';
    let height = 'h-14';
    if (size === 'big') {
        width = 'w-36'
        height = 'h-36'
    }
    return (
        <Link to={'/profile'}> <div>
            {user.profileImage ? (<img
                src={user.ProfileImage}
                alt="goldenret"
                className={`${width} ${height} rounded-full object-cover`}
            />) : (<div className={`${width} ${height} rounded-full object-cover bg-gray-400`}></div>

            )} </div>
        </Link >
    )
}

export default ProfileImage