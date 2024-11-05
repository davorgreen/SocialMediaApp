import { createSlice } from "@reduxjs/toolkit";



const PhotoSlice = createSlice({
    name: 'photo',
    initialState: {
        allPhotos: [],
        profilePhoto: JSON.parse(localStorage.getItem('profile')) || [],
        coverPhoto: JSON.parse(localStorage.getItem('cover')) || [],
        basicPhoto: JSON.parse(localStorage.getItem('basic')) || [],
        usersPhotos: [],
        postsPhotos: [],
        storyPhoto: [],
    },
    reducers: {
        allOfPhotos: (state, action) => {
            state.allPhotos = action.payload;
        },
        filteredPhotos: (state, action) => {
            let photos = action.payload;

            //cover
            const coverProfile = photos.filter((photo) => photo.type === 'cover');
            state.coverPhoto = coverProfile;
            localStorage.setItem('cover', JSON.stringify(coverProfile));

            //profile
            const profilePhotos = photos.filter((photo) => photo.type === 'profile');
            state.profilePhoto = profilePhotos;
            localStorage.setItem('profile', JSON.stringify(profilePhotos));

            //basic
            const basic = photos.filter((photo) => photo.type === 'basic');
            state.basicPhoto = basic;
            localStorage.setItem('basic', JSON.stringify(basic));
        },
        handleUsersPhotos: (state, action) => {
            state.usersPhotos = action.payload;
        },
        handlePostsPhotos: (state, action) => {
            state.postsPhotos = action.payload;
        },
        handleStoryPhoto: (state, action) => {
            state.storyPhoto = action.payload.flat().filter((photo) =>
                photo.type === 'story');
        },
        addedStory: (state, action) => {
            state.storyPhoto.push(action.payload);
        },
        deleteStory: (state, action) => {
            console.log('Brisanje storija sa ID:', action.payload);
            state.storyPhoto = state.storyPhoto.filter(story => story._id !== action.payload);
        }
    }

})

export const { allOfPhotos, filteredPhotos, handleUsersPhotos, handlePostsPhotos, handleStoryPhoto, addedStory, deleteStory } = PhotoSlice.actions;
export default PhotoSlice.reducer;