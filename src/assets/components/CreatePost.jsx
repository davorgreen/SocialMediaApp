//image
import image from '../images/golden-retriever-tongue-out.jpg'
//icons
import { FaPeopleGroup } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
function CreatePost() {
    return (
        <div className="flex flex-col bg-white shadow-lg rounded-lg p-6 mb-6">
            <div className="flex items-start gap-2">
                <img
                    src={image}
                    alt="goldenret"
                    className="w-14 h-14 rounded-full object-cover"
                />
                <textarea
                    placeholder="Share your status..."
                    className="flex-grow bg-gray-100 rounded-lg p-4 resize-none outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                ></textarea>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-bold">Share</button>
            </div>
            <div className="flex gap-3 justify-center mt-4">
                <button className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-bold"><FaPeopleGroup size={30} /> People</button>
                <button className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-bold"><IoLocationSharp size={30} />Check in</button>
                <button className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-bold" ><MdEmojiEmotions size={30} /> Feelings</button>
            </div>
        </div >



    )
}

export default CreatePost