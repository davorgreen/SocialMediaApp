//icons
import { FaPeopleGroup } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
import ProfileImage from "./ProfileImage";
import { useEffect, useState } from "react";
import axios from "axios";
import {
    GetCountries,
    GetState,
    GetCity,
} from "react-country-state-city";



function CreatePost() {
    const [post, setPost] = useState('');
    const [feelings, setFeelings] = useState(['😊', '😢', '😡', '😄', '😮', '😴', '😕', '😨', '😍', '😬', '😎', '😳', '🤒', '😌', '😐']);
    const [showFeelings, setShowFeelings] = useState(false);
    const [showLocation, setShowLocation] = useState(false);
    const [error, setError] = useState('');
    const [countryId, setCountryId] = useState("");
    const [stateId, setStateId] = useState("");
    const [cityId, setCityId] = useState("");

    const [countriesList, setCountriesList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);


    useEffect(() => {
        GetCountries().then((result) => {
            setCountriesList(result);
        });
    }, []);

    const handleCountryChange = (e) => {
        const selectedCountry = countriesList[e.target.value]; // get full country object
        setCountryId(selectedCountry.id);
        setStateId(""); // reset state and city selections
        setCityId("");
        GetState(selectedCountry.id).then((result) => {
            setStateList(result);
        });
    };

    const handleStateChange = (e) => {
        const selectedState = stateList[e.target.value]; // get full state object
        setStateId(selectedState.id);
        setCityId(""); // reset city selection
        GetCity(countryId, selectedState.id).then((result) => {
            setCityList(result);
        });
    };

    const handleCityChange = (e) => {
        const selectedCity = cityList[e.target.value]; // get full city object
        setCityId(selectedCity.id);
    };

    function handleOpenFeelings() {
        setShowFeelings(!showFeelings);
    }

    function handleSelectFeeling(feeling) {
        setPost(prevPost => prevPost + 'Feeling' + feeling);
        setShowFeelings(false);
    }

    function handleCheckIn() {
        setShowLocation(!showLocation);
    }

    const handleSharePost = async (post) => {
        try {
            const response = await axios.post('/api/posts', post);

        } catch (error) {
            setError('Error sharing the post');
            console.error('Error during login', error);

        }
    }

    return (
        <div className="flex flex-col bg-white shadow-lg rounded-lg p-6 mb-6">
            <div className="flex items-start gap-2">
                <ProfileImage />
                <textarea
                    placeholder="Share your status..."
                    className="flex-grow bg-gray-100 rounded-lg p-4 resize-none outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                ></textarea>
                <button onClick={() => handleSharePost(post)} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-bold">Share</button>
            </div>
            <div className="flex flex-col gap-3 justify-center mt-4 md:flex-row">
                <button className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-bold">
                    <FaPeopleGroup size={30} /> People
                </button>
                <button onClick={handleCheckIn} className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-bold">
                    <IoLocationSharp size={30} />Check in
                </button>
                <button onClick={handleOpenFeelings} className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-bold">
                    <MdEmojiEmotions size={30} /> Feelings
                </button>
            </div>

            {showFeelings && (
                <div className="mt-4 grid grid-cols-5 gap-2">
                    {feelings.map((feeling, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelectFeeling(feeling)}
                            className="text-2xl p-2 hover:bg-gray-200 rounded-lg"
                        >
                            {feeling}
                        </button>
                    ))}
                </div>
            )}

            {showLocation && (
                <div className="mt-4">
                    <div>
                        <h6 className="font-semibold">Country</h6>
                        <select
                            onChange={handleCountryChange}
                            value={countryId}
                            className="block w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Country</option>
                            {countriesList.map((item, index) => (
                                <option key={index} value={index}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        <h6 className="font-semibold mt-4">State</h6>
                        <select
                            onChange={handleStateChange}
                            value={stateId}
                            disabled={!countryId}
                            className="block w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select State</option>
                            {stateList.map((item, index) => (
                                <option key={index} value={index}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        <h6 className="font-semibold mt-4">City</h6>
                        <select
                            onChange={handleCityChange}
                            value={cityId}
                            disabled={!stateId}
                            className="block w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select City</option>
                            {cityList.map((item, index) => (
                                <option key={index} value={index}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>

    );
}

export default CreatePost;