import { createSlice } from "@reduxjs/toolkit";

export const championsSlice = createSlice({
  name: "Champions",
  initialState: {
    champions: [],
    selectedChampion: [],
  },
  reducers: {
    setChampions(state, { payload }) {
      return { ...state, champions: payload };
    },
    selectChampion(state, { payload }) {
      return { ...state, selectedChampion: payload };
    },
  },
});

export const {
  setChampions,
  selectChampion,
  setChampionFiles,
} = championsSlice.actions;

export default championsSlice.reducer;
