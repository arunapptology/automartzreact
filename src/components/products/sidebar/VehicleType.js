import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useGetVehicleCategoryQuery } from "../../../services/searchApi";
import {
  getAllVehicleTypes,
  getSelectedVehicleType,
} from "../../../slices/searchSlice";
import { navSearchProducts } from "../../navbar/navigationSlugs";

const VehicleType = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { allVehicleTypes, selectedVehicleType } = useSelector(
    (state) => state.searchReducer
  );
  const { data: vehicleCatgory } = useGetVehicleCategoryQuery();

  const handleChange = (e) => {
    const { value } = e?.target;
    dispatch(getSelectedVehicleType(value));
    history.push(navSearchProducts);
  };

  useEffect(() => {
    if (
      vehicleCatgory?.status === 1 &&
      vehicleCatgory?.data?.vehicleCategoryData?.length > 0
    ) {
      dispatch(getAllVehicleTypes(vehicleCatgory?.data?.vehicleCategoryData));
    }
  }, [vehicleCatgory]);

  return (
    <>
      <ul>
        {allVehicleTypes?.map((item) => (
          <li key={item?.Id}>
            <div className="custom__checkbox">
              <input
                type="radio"
                id={`vehicle_type_${item?.CategoryName}`}
                name="vehicle_type"
                value={item?.Id}
                onChange={handleChange}
                checked={selectedVehicleType?.Id === item?.Id}
              />
              <label htmlFor={`vehicle_type_${item?.CategoryName}`}>
                {item?.CategoryName}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default VehicleType;
