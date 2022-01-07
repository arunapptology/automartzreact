import { configureStore } from "@reduxjs/toolkit";
import { communityApi } from "../services/communityApi";
import { globalApi } from "../services/globalApi";
import { newsApi } from "../services/newsApi";
import { productsApi } from "../services/productsApi";
import { searchApi } from "../services/searchApi";
import { uploadStocksApi } from "../services/uploadStocksApi";
import { userApi } from "../services/userApi";
import { vendorApi } from "../services/vendorApi";
import { communitySlice } from "../slices/communitySlice";
import { globalSlice } from "../slices/globalSlice";
import { locationSlice } from "../slices/locationSlice";
import { searchSlice } from "../slices/searchSlice";
import { userSlice } from "../slices/userSlice";
import { vendorSlice } from "../slices/vendorSlice";

export const store = configureStore({
  reducer: {
    [globalApi.reducerPath]: globalApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [vendorApi.reducerPath]: vendorApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [communityApi.reducerPath]: communityApi.reducer,
    [uploadStocksApi.reducerPath]: uploadStocksApi.reducer,
    globalReducer: globalSlice.reducer,
    searchReducer: searchSlice.reducer,
    locationReducer: locationSlice.reducer,
    userReducer: userSlice.reducer,
    vendorReducer: vendorSlice.reducer,
    communityReducer: communitySlice.reducer,
  },
});
