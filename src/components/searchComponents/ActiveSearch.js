import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedBrand,
  getSelectedModel,
  getSelectedVehicleType,
} from "../../slices/searchSlice";

const ActiveSearch = () => {
  const dispatch = useDispatch();
  const { selectedVehicleType, selectedModel, selectedBrand } = useSelector(
    (state) => state.searchReducer
  );

  const handleClearAll = () => {
    dispatch(getSelectedVehicleType());
    dispatch(getSelectedModel());
    dispatch(getSelectedBrand());
  };
  return (
    <>
      <div className="active__search">
        {(selectedVehicleType?.Id ||
          selectedModel?.length > 0 ||
          selectedBrand?.length > 0) && (
          <div className="clear__all" onClick={handleClearAll}>
            <i className="fa fa-undo" aria-hidden="true"></i>
            Clear All
          </div>
        )}
        {selectedVehicleType?.Id && (
          <div
            className="active__search__card"
            onClick={() => dispatch(getSelectedVehicleType())}
          >
            {selectedVehicleType?.CategoryName}
          </div>
        )}
        {selectedModel?.length > 0 &&
          selectedModel?.map((item) => (
            <div
              className="active__search__card"
              key={item?.Id}
              onClick={() =>
                dispatch(
                  getSelectedModel({
                    remove: item?.Id,
                  })
                )
              }
            >
              {item?.name}
            </div>
          ))}
        {selectedBrand?.length > 0 &&
          selectedBrand?.map((item) => (
            <div
              className="active__search__card"
              key={item?.Id}
              onClick={() =>
                dispatch(
                  getSelectedBrand({
                    remove: item?.Id,
                  })
                )
              }
            >
              {item?.SubCategoryName}
            </div>
          ))}
      </div>
    </>
  );
};

export default ActiveSearch;
