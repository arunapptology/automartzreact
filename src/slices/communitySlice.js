import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCommunityCategory: "",
  questionList: [],
  commentList: [],
  isQuestionFormActive: true,
  isLoginPopupActive: false,
};

export const communitySlice = createSlice({
  name: "communitySlice",
  initialState,
  reducers: {
    getSelectedCommunityCategory(state, { payload }) {
      state.selectedCommunityCategory = payload;
    },
    getQuestionList(state, { payload }) {
      state.questionList = payload;
    },
    getCommentList(state, { payload }) {
      state.commentList = payload;
    },
    activateQuestionForm(state) {
      state.isQuestionFormActive = true;
    },
    deActivateQuestionForm(state) {
      state.isQuestionFormActive = false;
    },
    activateLoginPopup(state) {
      state.isLoginPopupActive = true;
    },
    deActivateLoginPopup(state) {
      state.isLoginPopupActive = false;
    },
  },
});

export const {
  getSelectedCommunityCategory,
  getQuestionList,
  getCommentList,
  activateQuestionForm,
  deActivateQuestionForm,
  activateLoginPopup,
  deActivateLoginPopup,
} = communitySlice.actions;
