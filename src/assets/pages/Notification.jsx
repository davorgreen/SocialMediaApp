import { Link } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import ProfileImage from "../components/ProfileImage"


function Notification() {
    return (
        <div className="flex flex-col md:flex-row gap-5 w-full mt-10">
            <div className="ml-4 w-1/3">
                <Sidebar />
            </div>
            <div className="flex flex-col items-start gap-4 bg-white shadow-lg rounded-md shadow-gray-300 p-6 mb-6 w-full">
                <h2 className="text-5xl text-bold text-gray-500">Notifications</h2>
                <div className="flex justify-start items-center gap-4 w-full mt-5 p-4 border border-gray-300">
                    <Link to={'/profile'}>
                        <ProfileImage />
                    </Link>
                    <p className="text-xl font-semibold"><Link to={'/profile'}>John Johnson </Link><Link to={''}><span className="text-blue-600 hover:underline">liked your photo.</span></Link></p>
                </div>
                <div className="flex justify-start items-center gap-4 w-full mt-5 p-4 border border-gray-300">
                    <Link to={'/profile'}>
                        <ProfileImage />
                    </Link>
                    <p className="text-xl font-semibold"><Link to={'/profile'}>John Johnson </Link><Link to={''}><span className="text-blue-600 hover:underline">liked your photo.</span></Link></p>
                </div>
                <div className="flex justify-start items-center gap-4 w-full mt-5 p-4 border border-gray-300">
                    <Link to={'/profile'}>
                        <ProfileImage />
                    </Link>
                    <p className="text-xl font-semibold"><Link to={'/profile'}>John Johnson </Link><Link to={''}><span className="text-blue-600 hover:underline">liked your photo.</span></Link></p>
                </div>
            </div>

        </div>
    )
}

export default Notification