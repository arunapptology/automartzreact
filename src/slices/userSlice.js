import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLoggedin: false,
  loggedinUserInfo: null,
  userStocks: [],
  buySell: [],
  spareParts: [],
  accessories: [],
  services: [],
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    getLoggedinUserInfo(state, { payload }) {
      if (
        payload?.Id &&
        payload?.IsActive === "1" &&
        payload?.Is_verified === "1" &&
        payload?.IsDeleted !== "1"
      ) {
        state.isUserLoggedin = true;
        state.loggedinUserInfo = payload;
      } else {
        state.isUserLoggedin = false;
        state.loggedinUserInfo = null;
      }
    },
    getUserLogout(state) {
      state.isUserLoggedin = false;
      state.loggedinUserInfo = null;
    },
    getUserStocks(state, { payload }) {
      state.userStocks = payload;

      // Buy Sell Stocks
      const buySell = payload?.filter((item) => item?.maincat === "1");
      state.buySell = buySell;

      // Spare Parts Stocks
      const spareParts = payload?.filter((item) => item?.maincat === "2");
      state.spareParts = spareParts;

      // Accessories Stocks
      const accessories = payload?.filter((item) => item?.maincat === "3");
      state.accessories = accessories;

      // Services Stocks
      const services = payload?.filter((item) => item?.maincat === "4");
      state.services = services;
    },
  },
});

export const { getLoggedinUserInfo, getUserLogout, getUserStocks } =
  userSlice.actions;
