import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useGetVehicleBrandMutation } from "../../../services/searchApi";
import { getAllBrands, getSelectedBrand } from "../../../slices/searchSlice";
import { navSearchProducts } from "../../navbar/navigationSlugs";

const VehicleBrand = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [fetchBrand, { data: vehicleBrandData }] = useGetVehicleBrandMutation();
  const { selectedVehicleType, allBrands, selectedBrand } = useSelector(
    (state) => state.searchReducer
  );

  // call brand API whenever selected vehicle type changes
  useEffect(() => {
    let formData = new FormData();
    formData?.append("catId", selectedVehicleType?.Id);
    fetchBrand(formData);
  }, [selectedVehicleType]);

  // store all brands into state after fetching data
  useEffect(() => {
    if (
      vehicleBrandData?.status === 1 &&
      vehicleBrandData?.data?.vehicleBrandData?.length > 0
    )
      dispatch(getAllBrands(vehicleBrandData?.data?.vehicleBrandData));
  }, [vehicleBrandData]);

  // handle change function
  const handleChange = (e) => {
    const { value } = e?.target;
    history.push(navSearchProducts);
    if (e.target.checked) {
      dispatch(
        getSelectedBrand({
          add: value,
        })
      );
      return;
    } else {
      dispatch(
        getSelectedBrand({
          remove: value,
        })
      );
      return;
    }
  };

  return (
    <>
      {allBrands?.length > 0 && (
        <div className="sidebar__widget">
          <h4
            className="title"
            data-toggle="collapse"
            data-target="#vehicleBrand"
          >
            Select Brand
          </h4>
          <div className="collapse multi-collapse show" id="vehicleBrand">
            <ul>
              {allBrands?.map((item) => (
                <li key={item?.Id}>
                  <div className="custom__checkbox">
                    <input
                      type="checkbox"
                      id={`vehicle_brand_${item?.SubCategoryName}`}
                      name="vehicle_model"
                      value={item?.Id}
                      onChange={handleChange}
                      checked={selectedBrand?.some(
                        (val) => val?.Id === item?.Id
                      )}
                    />
                    <label htmlFor={`vehicle_brand_${item?.SubCategoryName}`}>
                      {item?.SubCategoryName}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default VehicleBrand;
