import { createSlice } from "@reduxjs/toolkit";



const PhotoSlice = createSlice({
    name: 'photo',
    initialState: {
        allPhotos: [],
        profilePhoto: [],
        coverPhoto: [],
        basicPhoto: [],
        usersPhotos: [],
        postsPhotos: [],
        storyPhoto: [],
        userProfilePic: [],
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


            //profile
            const profilePhotos = photos.filter((photo) => photo.type === 'profile');
            state.profilePhoto = profilePhotos;


            //basic
            const basic = photos.filter((photo) => photo.type === 'basic');
            state.basicPhoto = basic;

        },
        handleUsersPhotos: (state, action) => {
            state.usersPhotos = action.payload;
        },
        handlePostsPhotos: (state, action) => {
            state.postsPhotos = action.payload;
        },
        handleStoryPhoto: (state, action) => {
            state.storyPhoto = action.payload.filter((photo) =>
                photo.type === 'story');
        },
        addedStory: (state, action) => {
            state.storyPhoto.push(action.payload);
        },
        deleteStory: (state, action) => {
            state.storyPhoto = state.storyPhoto.filter(story => story._id !== action.payload);
        },
        userProfilePhoto: (state, action) => {
            state.userProfilePic = action.payload.flat().filter((photo) => photo.type === 'userProfilePhoto');
        },
        addUserProfilePhoto: (state, action) => {
            state.userProfilePic = [...state.userProfilePic, action.payload];
        },
        deleteUserProfilePhoto: (state, action) => {
            state.userProfilePic = state.userProfilePic.filter((picture) => picture._id !== action.payload);
        },
        updateCoverPhoto: (state, action) => {
            state.coverPhoto = action.payload;
            localStorage.setItem('cover', JSON.stringify(action.payload));
        },
        updateProfilePhoto: (state, action) => {
            state.profilePhoto.push(action.payload);
            localStorage.setItem('profile', JSON.stringify(action.payload));
        },
        addPostPhoto: (state, action) => {
            state.postsPhotos = [...state.postsPhotos, action.payload];
        },
    }

})

export const { allOfPhotos, filteredPhotos, handleUsersPhotos, handlePostsPhotos, handleStoryPhoto, addedStory, deleteStory, userProfilePhoto, addUserProfilePhoto, deleteUserProfilePhoto, updateCoverPhoto, updateProfilePhoto, addPostPhoto, myStoryPhoto } = PhotoSlice.actions;
export default PhotoSlice.reducer;