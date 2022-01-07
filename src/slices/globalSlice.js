import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeUserRole: null,
  isQuickLinkActive: true,
  userInquiryItem: {},
  userInquiryInfo: {},
  recentlyViewed: [],
  formPreviewData: [],
};

export const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    getActiveUserRole(state, { payload }) {
      state.activeUserRole = payload;
    },

    activateQuickLink(state) {
      state.isQuickLinkActive = true;
    },

    deactivateQuickLink(state) {
      state.isQuickLinkActive = false;
    },

    // get asked price for item
    getUserInquiryItem(state, { payload }) {
      if (!payload) {
        state.userInquiryItem = {};
      }
      state.userInquiryItem = payload;
    },

    getUserInquiryInfo(state, { payload }) {
      state.userInquiryInfo = payload;
    },

    // recently viewed products
    getRecentlyViewed(state, { payload }) {
      const findExisting = state?.recentlyViewed?.find(
        (item) => item?.Id === payload?.Id
      );
      if (!findExisting) {
        state.recentlyViewed = [payload, ...state.recentlyViewed];
      }
    },

    getFormPreviewData(state, { payload }) {
      state.formPreviewData = payload;
    },
  },
});

export const {
  getActiveUserRole,
  activateQuickLink,
  deactivateQuickLink,
  getUserInquiryItem,
  getUserInquiryInfo,
  getRecentlyViewed,
  getFormPreviewData,
} = globalSlice.actions;
