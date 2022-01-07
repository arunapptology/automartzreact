import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countriesList: [
    { value: "91", countryName: "india", label: "+91-India" },
    { value: "92", countryName: "SA", label: "+92-SA" },
  ],
  userLocation: {},
};

export const locationSlice = createSlice({
  name: "locationSlice",
  initialState,
  reducers: {
    getCountriesList(state, { payload }) {
      state.countriesList = payload;
    },
    getUserLocation(state, { payload }) {
      state.userLocation = payload;
    },
  },
});

export const { getCountriesList, getUserLocation } = locationSlice.actions;
