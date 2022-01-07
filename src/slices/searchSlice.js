import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchModalActive: false,
  searchTerm: "",
  allCategoryList: [],
  selectedCategory: {},
  allVehicleTypes: [],
  selectedVehicleType: {},
  vehicleModel: [],
  filteredModels: [],
  selectedModel: [],
  allBrands: [],
  selectedBrand: [],
  searchResults: [],
  isLoading: false,
};

export const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    // Search Modal Activation
    activateSearchModal(state) {
      state.searchModalActive = true;
    },
    // Search Modal De-Activation
    deactivateSearchModal(state) {
      state.searchModalActive = false;
    },

    // Search Keyword
    getSearchTerm(state, { payload }) {
      state.searchTerm = payload;
    },

    // get All Catgeory List
    getAllCategoryList(state, { payload }) {
      state.allCategoryList = payload;
    },

    // get selected Search Category
    getSelectedCategory(state, { payload }) {
      const selectedCategory = state?.allCategoryList?.filter(
        (item) => item?.value === payload
      );
      state.selectedCategory = selectedCategory?.[0];
    },

    // get All Vehicle Types
    getAllVehicleTypes(state, { payload }) {
      state.allVehicleTypes = payload;
    },

    // get Selected Vehicle Type
    getSelectedVehicleType(state, { payload }) {
      if (!payload) {
        state.selectedVehicleType = {};
      }
      const selectedVehicleType = state?.allVehicleTypes?.filter(
        (item) => item?.Id === payload
      );
      state.selectedVehicleType = selectedVehicleType?.[0];
    },

    // All Vehicle Models
    getVehicleModel(state, { payload }) {
      state.vehicleModel = payload;
    },

    // Filtered Vehicle Models on basis of Search category & Vehicle Type
    getFilteredModels(state, { payload }) {
      state.filteredModels = state.vehicleModel?.filter(
        (item) => item?.MainCategoryId === payload?.MainCategoryId
      );

      if (payload?.vehicle_type) {
        state.filteredModels = state.filteredModels?.filter((item) =>
          item?.vehicle_type?.includes(payload?.vehicle_type)
        );
      }
    },

    // get Selected Models
    getSelectedModel(state, { payload }) {
      if (!payload) {
        state.selectedModel = [];
      }

      if (payload?.add) {
        const selectedModel = state?.filteredModels?.find(
          (item) => item?.Id === payload?.add
        );
        state.selectedModel = [...state.selectedModel, selectedModel];
      } else if (payload?.remove) {
        const selectedModel = state?.selectedModel?.filter(
          (item) => item?.Id !== payload?.remove
        );
        state.selectedModel = selectedModel;
      }
    },

    // get all brands
    getAllBrands(state, { payload }) {
      state.allBrands = payload;
    },

    // get Selected Brands
    getSelectedBrand(state, { payload }) {
      if (!payload) {
        state.selectedBrand = [];
      }

      if (payload?.add) {
        const selectedBrand = state?.allBrands?.find(
          (item) => item?.Id === payload?.add
        );
        state.selectedBrand = [...state.selectedBrand, selectedBrand];
      } else if (payload?.remove) {
        const selectedBrand = state?.selectedBrand?.filter(
          (item) => item?.Id !== payload?.remove
        );
        state.selectedBrand = selectedBrand;
      }
    },
  },
});

export const {
  activateSearchModal,
  deactivateSearchModal,
  getSearchTerm,
  getAllCategoryList,
  getSelectedCategory,
  getAllVehicleTypes,
  getSelectedVehicleType,
  getVehicleModel,
  getFilteredModels,
  getSelectedModel,
  getAllBrands,
  getSelectedBrand,
} = searchSlice.actions;
