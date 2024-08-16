//image
import image from '../images/golden-retriever-tongue-out.jpg'

function ProfileImage({ size }) {
    let width = 'w-12';
    let height = 'h-14';
    if (size === 'big') {
        width = 'w-36'
        height = 'h-36'
    }
    return (
        <div><img
            src={image}
            alt="goldenret"
            className={`${width} ${height} rounded-full object-cover`}
        /></div>
    )
}

export default ProfileImage