import { configureStore } from "@reduxjs/toolkit";
import ChampionsReducer from "../reducers/championsSlice";

export default configureStore({
  reducer: {
    champions: ChampionsReducer,
  },
});
