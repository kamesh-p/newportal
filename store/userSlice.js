// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const userPersistConfig = {
  key: "user",
  storage: storage,
  blacklist: [], // Add any state properties you want to exclude from persistence
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    resetUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

const persistedUserReducer = persistReducer(userPersistConfig, userSlice.reducer);

export const { setUser, setToken, resetUser } = userSlice.actions;
export const selectUser = (state) => state.user;

export default persistedUserReducer;
