import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  activateSearchModal,
  getAllCategoryList,
  getSelectedCategory,
  getSearchTerm,
} from "../../slices/searchSlice";
import { catgeoryTypeList } from "./categoryTypeList";

const SearchForm = () => {
  const dispatch = useDispatch();

  // Search Category & keyword State
  const { allCategoryList, selectedCategory, searchTerm } = useSelector(
    (state) => state.searchReducer
  );

  // Handle Search Keyword on change nad store the keyword in state
  const handleSearchInput = (e) => {
    const { value } = e.target;
    dispatch(getSearchTerm(value));
  };

  // store all category list on load/render
  useEffect(() => {
    dispatch(getAllCategoryList(catgeoryTypeList));
  }, []);

  // Default Search Catgeory on load/render after storing all list into state
  useEffect(() => {
    dispatch(getSelectedCategory(allCategoryList?.[0]?.value));
  }, [allCategoryList]);

  return (
    <>
      <div className="select__box">
        <select
          value={selectedCategory?.value}
          onChange={(e) => dispatch(getSelectedCategory(e.target.value))}
        >
          {allCategoryList?.map((option) => (
            <option key={option?.id} value={option?.value}>
              {option?.name}
            </option>
          ))}
        </select>
      </div>

      <input
        id="main_search"
        className="main_search"
        placeholder="Search by make, model, or variant, e.g. 'MG Hector'"
        onChange={handleSearchInput}
        onFocus={() =>
          searchTerm?.length >= 3 && dispatch(activateSearchModal())
        }
        value={searchTerm}
        autoComplete="off"
      />
    </>
  );
};

export default SearchForm;
