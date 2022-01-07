import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVendorLoggedin: false,
  loggedinVendorInfo: null,
  vendorStocks: [],
  buySell: [],
  spareParts: [],
  accessories: [],
  services: [],
};

export const vendorSlice = createSlice({
  name: "vendorSlice",
  initialState,
  reducers: {
    getLoggedinVendorInfo(state, { payload }) {
      if (
        payload?.Id &&
        payload?.IsActive === "1" &&
        // payload?.Is_verified === "1" &&
        payload?.IsDeleted !== "1"
      ) {
        state.isVendorLoggedin = true;
        state.loggedinVendorInfo = payload;
      } else {
        state.isVendorLoggedin = false;
        state.loggedinVendorInfo = null;
      }
    },
    getVendorLogout(state) {
      state.isVendorLoggedin = false;
      state.loggedinVendorInfo = null;
    },
    getVendorStocks(state, { payload }) {
      state.vendorStocks = payload;

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

export const { getLoggedinVendorInfo, getVendorLogout, getVendorStocks } =
  vendorSlice.actions;
