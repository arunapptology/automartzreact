import qs from "query-string";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { useGetFilteredResultsMutation } from "../../services/searchApi";
import Loader from "../loader";
import AskPriceModal from "../ui/AskPriceModal";
import ProductCard from "../ui/ProductCard";
import Sidebar from "../products/sidebar";
import ActiveSearch from "./ActiveSearch";

import "./SearchProducts.css";
import {
  getSelectedCategory,
  getSelectedVehicleType,
} from "../../slices/searchSlice";
import NoDataFound from "../utils/NoDataFound";

const SearchProducts = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const queryParam = qs.parse(location.search);

  const {
    selectedCategory,
    selectedVehicleType,
    selectedModel,
    selectedBrand,
  } = useSelector((state) => state.searchReducer);

  const [fetchFilteredData, { data: filteredResults, isLoading }] =
    useGetFilteredResultsMutation();

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const [dataItems, setDataItems] = useState([]);

  const handleFetchData = (pageCount = 1) => {
    const formData = new FormData();
    // Based on Product Id after search result
    if (queryParam?.resultId) {
      formData?.append("resultId", queryParam?.resultId);
    }
    if (queryParam?.type) {
      formData?.append("dataFrom", queryParam?.type);
    }

    // based on quicklinks - main category
    if (queryParam?.maincat) {
      formData?.append("mainCat", queryParam?.maincat);
    }

    // based on filter -  main category
    if (selectedCategory?.value) {
      formData?.append("mainCat", selectedCategory?.value);
    }

    // based on quicklinks - vehicle type
    if (queryParam?.cat) {
      formData?.append("vehicleCat", queryParam?.cat);
    }
    // based on filter -   vehicle type
    if (selectedVehicleType?.Id) {
      formData?.append("vehicleCat", selectedVehicleType?.Id);
    }
    // based on quicklinks - vehicle options
    if (queryParam?.feature) {
      formData?.append("vehicleOptions", [queryParam?.feature]);
    }
    // based on filter -   vehicle options
    if (selectedModel?.length > 0) {
      const modalIds = selectedModel?.map((item) => item?.Id);
      formData?.append("vehicleOptions", modalIds);
    }
    // based on filter -   vehicle brands
    if (selectedBrand?.length > 0) {
      const brandIds = selectedBrand?.map((item) => item?.Id);
      formData?.append("brand", brandIds);
    }

    formData?.append("page", pageCount);

    fetchFilteredData(formData);
  };

  useEffect(() => {
    if (filteredResults?.status === 1) {
      if (filteredResults?.data?.length > 0) {
        setDataItems([...dataItems, ...filteredResults?.data]);
      }
      if (filteredResults?.datacount === 0) {
        setLastPage(true);
      } else {
        setLastPage(false);
      }
    }
  }, [filteredResults]);

  useEffect(() => {
    setDataItems([]);
    setPage(1);
    handleFetchData();
  }, [
    selectedCategory,
    selectedVehicleType,
    selectedModel,
    selectedBrand,
    queryParam?.maincat,
    queryParam?.cat,
    queryParam?.feature,
  ]);

  useEffect(() => {
    if (queryParam?.maincat) {
      dispatch(getSelectedCategory(queryParam?.maincat));
    }
  }, [queryParam?.maincat]);

  useEffect(() => {
    if (queryParam?.cat) {
      dispatch(getSelectedVehicleType(queryParam?.cat));
    }
  }, [queryParam?.cat]);

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <ActiveSearch />
            <h2 className="page__title my-3">
              {selectedVehicleType?.CategoryName}&nbsp;{" "}
              {selectedCategory?.value === "1"
                ? "products"
                : selectedCategory?.name}
            </h2>

            {isLoading && <Loader />}

            {dataItems?.length > 0 && (
              <InfiniteScroll
                dataLength={dataItems?.length}
                next={() => {
                  setPage(page + 1);
                  !lastPage && handleFetchData(page + 1);
                }}
                hasMore={true}
                loader={<Loader />}
              >
                <div className="row search__products__wrapper">
                  {dataItems?.map((item, i) => (
                    <div
                      key={i}
                      className="col-md-4 col-xl-3"
                      style={{ marginBottom: 30 }}
                    >
                      <ProductCard
                        item={item}
                        categoryId={selectedCategory?.value}
                      />
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            )}

            {!isLoading && dataItems?.length < 1 && <NoDataFound />}
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="askPriceModal"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
      >
        <AskPriceModal />
      </div>
    </>
  );
};

export default SearchProducts;
