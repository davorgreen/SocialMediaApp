import axios from "axios";
//hooks
import { useEffect, useState } from "react";
//icons
import { IoImagesOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
//redux
import { useDispatch, useSelector } from "react-redux";
//api
//import { fetchPhotos } from "../../services/api";
//slices
import { addUserProfilePhoto, userProfilePhoto, deleteUserProfilePhoto } from "../../slices/PhotoSlice";
import { fetchPhotos } from "../../services/api";


function Photos() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [imageType, setImageType] = useState('');
    const [addPhoto, setAddPhoto] = useState(false);
    const [image, setImage] = useState(null);
    const { user, token } = useSelector((state) => state.userStore);
    const { userProfilePic } = useSelector((state) => state.photoStore);
    const dispatch = useDispatch();

    //add type and open input
    const handleAddUserProfilePhoto = () => {
        setImageType('userProfilePhoto');
        setAddPhoto(prevState => !prevState);
    }

    //set image
    const handleImage = (e) => {
        setImage(e.target.files[0]);
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

    // send user photo
    const updateUserProfilePhoto = () => {
        if (!image) return;
        setLoading(true);
        getBase64(image, async (imageBase64) => {
            try {
                const data = {
                    base64: imageBase64,
                    type: imageType,
                    entityId: user._id,
                };

                const response = await axios.post('https://green-api-nu.vercel.app/api/photos', data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                dispatch(addUserProfilePhoto(response.data));
            } catch (error) {
                setError("Error: " + (error.response?.data?.message || error.message));
            } finally {
                setLoading(false);
                setAddPhoto(false);
                setImage(null);
            }
        });
    }


    //user photos
    useEffect(() => {
        const fetchUserPhotos = async () => {
            setLoading(true);
            try {
                const photosResponse = await fetchPhotos(user._id, token);
                dispatch(userProfilePhoto(photosResponse.data));
            } catch (error) {
                setError('Error fetching photos: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserPhotos();

    }, [dispatch, token, user]);


    const handleDeleteUserProfilePicture = async (id) => {
        setLoading(true);
        try {
            const response = await axios.delete(` https://green-api-nu.vercel.app/api/photos/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            dispatch(deleteUserProfilePhoto(id));
        } catch (error) {
            setError('Error: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    }

    return (

        <div className="flex flex-col gap-5 bg-white shadow-lg rounded-lg p-6 mb-6">
            <div onClick={handleAddUserProfilePhoto}> <IoImagesOutline size={50} color="blue" /></div>
            <div className="grid grid-cols-2 w-full h-full gap-4">
                {userProfilePic.length > 0 ?
                    userProfilePic.map((picture) => {
                        return <div key={picture._id}><img src={picture.url} alt={picture.type} className="w-full h-96 object-cover rounded-md" />
                            <div>
                                <MdDeleteForever size={50} color="red" onClick={() => handleDeleteUserProfilePicture(picture._id)} />
                            </div>
                        </div>
                    }) : (<div>No User Profile Picture found</div>)
                }
            </div>
            {addPhoto && (
                <>
                    <input type="file" name="file" accept=".jpg, .png, image/*" onChange={handleImage} />
                    <button className="px-6 py-3 bg-blue-500 rounded-xl text-white font-semibold mt-2" onClick={updateUserProfilePhoto}>
                        Submit
                    </button>
                </>
            )}
        </div>


    );
}

export default Photos;
