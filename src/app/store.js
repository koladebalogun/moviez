import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { movieApi } from "../services/Movies";
import genreOrCategoryReducer from "../features/currentGenreOrCategory";
import userReducer from "../features/auth";

export default configureStore({
    reducer:{
        [movieApi.reducerPath]:movieApi.reducer,
        currentGenreOrCategory: genreOrCategoryReducer,
        user: userReducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieApi.middleware)

})