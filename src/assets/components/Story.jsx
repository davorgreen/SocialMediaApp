
import axios from "axios";
import { useMemo, useState } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { handleUsersPhotos } from "../../slices/PhotoSlice";

function Story() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [addStory, setAddStory] = useState(false);
    const [story, setStory] = useState(null);
    const { user, token, users } = useSelector((state) => state.userStore);
    const { usersPhotos } = useSelector((state) => state.photoStore);
    const dispatch = useDispatch();


    const storiesPhoto = useMemo(() => {
        return usersPhotos.flat().filter((photo) =>
            photo.type === 'story')
    }, [usersPhotos])

    console.log(storiesPhoto)
    console.log(storiesPhoto)

    //save story
    const handleSaveStory = (e) => {
        console.log(e.target.files[0]);
        setStory(e.target.files[0]);
    }

    // function to convert file to Base64 format
    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };

    //update story
    const updateStory = () => {
        if (!story) return;
        setLoading(true);
        getBase64(story, async (imageBase64) => {
            try {
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
                console.log('Response data:', response.data);
                dispatch(handleUsersPhotos(response.data))
            } catch (error) {
                setError("Error: " + (error.response?.data?.message || error.message));
            } finally {
                setLoading(false);
                setAddStory(false);
                setStory(null);
            }
        });
    }


    return (

        <div className="container mx-auto flex-row w-3/4 justify-center items-center mt-8">
            <div className="flex gap-2 mb-6">
                <IoImagesOutline size={50} className="text-blue-800" onClick={() => { setAddStory(prevState => !prevState) }} />
                {storiesPhoto.map((el) => {
                    const user = users.find(user => user._id === el.entityId);
                    console.log(user);

                    return (
                        <div key={el.id} className="relative group">
                            <img
                                src={el.base64}
                                alt={el.type}
                                className="w-80 h-80 object-cover rounded-xl transition-transform transform group-hover:scale-105 group-hover:shadow-2xl"
                            />
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