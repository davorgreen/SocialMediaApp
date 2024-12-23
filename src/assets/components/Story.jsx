import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//icons
import { IoImagesOutline } from "react-icons/io5";
import { addedStory, deleteStory } from "../../slices/PhotoSlice";


function Story() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [addStory, setAddStory] = useState(false);
    const [story, setStory] = useState(null);
    const { user, token, users } = useSelector((state) => state.userStore);
    const { storyPhoto, myStory } = useSelector((state) => state.photoStore);
    const dispatch = useDispatch();
    //save story
    const handleSaveStory = (e) => {
        setStory(e.target.files[0]);
    }

    // function to convert file to Base64 format
    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => callback(reader.result);
        reader.onerror = (error) => {
            // console.error("Error reading file:", error);
            callback(null);
        };
    };

    //update story
    const updateStory = () => {
        if (!story) return;
        setLoading(true);

        getBase64(story, async (imageBase64) => {
            try {
                if (!imageBase64) {
                    throw new Error("Image conversion to base64 failed.");
                }
                const data = {
                    base64: imageBase64,
                    type: 'story',
                    entityId: user._id,
                };
                const response = await axios.post('https://green-api-nu.vercel.app/api/photos', data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                dispatch(addedStory(response.data));
            } catch (error) {
                console.error("Error:", error);
                setError("Error: " + (error.response?.data?.message || error.message));
            } finally {
                setLoading(false);
                setAddStory(false);
                setStory(null);
            }
        });
    };

    //delete story
    const handleDeleteStory = async (id) => {
        setLoading(true);
        try {
            const response = await axios.delete(`https://green-api-nu.vercel.app/api/photos/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            //  console.log('Post deleted successfully:', response.data);
            dispatch(deleteStory(id))
        } catch (error) {
            setError('Error: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mx-auto flex-row w-3/4 justify-center items-center mt-8">
            <div className="flex gap-2 mb-6">
                <IoImagesOutline size={50} className="text-blue-800" onClick={() => { setAddStory(prevState => !prevState) }} />
                {storyPhoto.map((el, index) => {
                    const user = users.find(user => user._id === el.entityId);
                    return (
                        <div key={index} className="relative group" onClick={() => handleDeleteStory(el._id)}>
                            <img
                                src={el.url}
                                alt={el.type}
                                className="w-80 h-80 object-cover rounded-xl transition-transform transform group-hover:scale-105 group-hover:shadow-2xl"
                            />
                            <div className="absolute top-2 right-2 text-red-600 cursor-pointer" >
                                <span className="text-2xl font-bold">X</span>
                            </div>
                            <p className="absolute flex justify-start inset-0 text-center mt-1 ml-1 text-xl text-white font-bold">
                                {user ? `${user.firstName} ${user.lastName}` : 'Unknown User'}
                            </p>
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-start">{addStory && <>
                <input type="file" name="file" accept=".jpg, .png, image/*" onChange={handleSaveStory} />
                <button className="px-2 py-1 bg-blue-500 rounded-xl text-white font-semibold mt-2" onClick={updateStory} >
                    Submit
                </button>
            </>}</div>
        </div >
    )
}

export default Story