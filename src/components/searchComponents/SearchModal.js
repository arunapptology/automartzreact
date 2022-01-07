import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useGetSearchResultsMutation } from "../../services/searchApi";

import {
  activateSearchModal,
  deactivateSearchModal,
  getSearchTerm,
  getSelectedBrand,
  getSelectedModel,
  getSelectedVehicleType,
} from "../../slices/searchSlice";

import Loader from "../loader";
import {
  navProductDetails,
  navSearchProducts,
  navVendorDetails,
} from "../navbar/navigationSlugs";

import "./SearchModal.css";

const SearchModal = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const ref = useRef();

  // Search Category & keyword State
  const { searchTerm, selectedCategory, searchModalActive } = useSelector(
    (state) => state.searchReducer
  );

  const [callSearchAPI, { data: searchResults, isLoading }] =
    useGetSearchResultsMutation();

  const handleSearchClicked = (item) => {
    if (
      item?.dataFrom === "result_ByCategory" ||
      item?.dataFrom === "result_Bybrand"
    ) {
      history.push(
        `${navSearchProducts}?resultId=${item?.Id}&type=${item?.dataFrom}`
      );
    }
    if (item?.dataFrom === "result_Byvendor") {
      history.push(`${navVendorDetails}/vendor/${item?.UserSlug}`);
    }
    if (item?.dataFrom === "result_Bytbl") {
      history.push(`${navProductDetails}/${item?.Id}/${item?.category}`);
    }

    dispatch(getSearchTerm(""));

    dispatch(deactivateSearchModal());

    dispatch(getSelectedVehicleType());
    dispatch(getSelectedModel());
    dispatch(getSelectedBrand());
  };

  useEffect(() => {
    const formData = new FormData();
    if (searchTerm?.length >= 2) {
      dispatch(activateSearchModal());
      formData?.append("categories", selectedCategory?.value);
      formData?.append("keywords", searchTerm);
      callSearchAPI(formData);
    }
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(deactivateSearchModal());
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      {searchModalActive && (
        <div className="search__modal" ref={ref}>
          <div className="card">
            <div className="card-body p-0 ">
              {isLoading && (
                <div
                  style={{ minHeight: 120 }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <Loader />
                </div>
              )}

              {!isLoading &&
              searchResults?.status === 1 &&
              searchResults?.search_data?.search?.length > 0 ? (
                <ul>
                  {searchResults?.search_data?.search?.flatMap((item) => (
                    <li className="search__result__item" key={item?.Id}>
                      {item && (
                        <div
                          className="card-title"
                          onClick={() => handleSearchClicked(item)}
                        >
                          {item?.name}
                          <span>
                            {item?.dataFrom === "result_ByCategory" &&
                              "in Category"}
                            {item?.dataFrom === "result_Byvendor" &&
                              "in Vendor"}
                            {item?.dataFrom === "result_Bybrand" && "in Brand"}
                            {item?.dataFrom === "result_Bytbl" && "in Product"}
                          </span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  {!isLoading && (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ minHeight: 120 }}
                    >
                      <p>No Data Found</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;
