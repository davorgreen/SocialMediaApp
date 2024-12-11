import { useSelector } from "react-redux"


function About() {
    const { user } = useSelector((state) => state.userStore);
    console.log(user)
    return (
        <div className="flex flex-col gap-5 bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-2xl mb-2 font-bold text-blue-500">About me</h2>
            <p className="text-lg font-semibold text-gray-700">E-mail: {user.email}</p>
            <p className="text-lg font-semibold text-gray-700">Phone-number: {user.phone}</p>
            <p className="text-lg font-semibold text-gray-700">Gender: {user.gender}</p>
            <p className="text-lg font-semibold text-blue-700">About me: {user.aboutMe || 'Nothing'}</p>
        </div>
    )
}

export default About