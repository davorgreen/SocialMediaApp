import { createSlice } from "@reduxjs/toolkit";



const PhotoSlice = createSlice({
    name: 'photo',
    initialState: {
        allPhotos: [],
        profilePhoto: JSON.parse(localStorage.getItem('profile')) || [],
        coverPhoto: JSON.parse(localStorage.getItem('cover')) || [],
        basicPhoto: JSON.parse(localStorage.getItem('basic')) || [],
    },
    reducers: {
        allOfPhotos: (state, action) => {
            state.allPhotos = action.payload;
            console.log(allOfPhotos)
        },
        filteredPhotos: (state, action) => {
            let photos = action.payload;
            console.log(photos);

            //cover
            const coverProfile = photos.filter((photo) => photo.type === 'cover');
            state.coverPhoto = coverProfile;
            localStorage.setItem('cover', JSON.stringify(coverProfile));
            console.log(state.coverPhoto);

            //profile
            const profilePhotos = photos.filter((photo) => photo.type === 'profile');
            state.profilePhoto = profilePhotos;
            localStorage.setItem('profile', JSON.stringify(profilePhotos));
            console.log(state.profilePhoto)

            //basic
            const basic = photos.filter((photo) => photo.type === 'basic');
            state.basicPhoto = basic;
            localStorage.setItem('basic', JSON.stringify(basic));
            console.log(state.basicPhoto)

        }

    }

})

export const { allOfPhotos, filteredPhotos } = PhotoSlice.actions;
export default PhotoSlice.reducer;