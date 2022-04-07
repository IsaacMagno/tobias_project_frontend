import { configureStore } from "@reduxjs/toolkit";
import ChampionsReducer from "../reducers/championsSlice";
import UserReducer from "../reducers/userSlice";

export default configureStore({
  reducer: {
    champions: ChampionsReducer,
    user: UserReducer,
  },
});
