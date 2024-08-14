//image
import image from '../images/golden-retriever-tongue-out.jpg'

function ProfileImage() {
    return (
        <div><img
            src={image}
            alt="goldenret"
            className="w-14 h-14 rounded-full object-cover"
        /></div>
    )
}

export default ProfileImage