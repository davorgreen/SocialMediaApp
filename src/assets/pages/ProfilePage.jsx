import ProfileImage from "../components/ProfileImage"
import Sidebar from "../components/Sidebar"
//image
import img from '../images/6e0vct73g0n91.jpg'


function ProfilePage() {
    return (
        <div className="flex max-w-7xl mx-auto mt-5 gap-8">
            <div className="w-1/4">
                <Sidebar />
            </div>
            <div className="w-3/4 h-32 pb-10 mt-5 relative">
                <div className="h-48 shadow-xl shadow-gray-400 rounded-md overflow-hidden flex justify-center items-center">
                    <img src={img} alt="dogsfamily" />
                </div>
                <div className="absolute top-11 left-1">
                    <ProfileImage size={'big'} />
                </div>
                <div className="p-4 absolute top-0 left-0">
                    <h1 className="text-xl font-bold text-white text-shadow">Bob Smith</h1>
                </div>
                <div className="absolute top-0 right-2">
                    <p className="text-xl font-bold text-white text-shadow">London, UK</p>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage