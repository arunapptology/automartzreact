import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useGetVehicleModelMutation } from "../../../services/searchApi";
import {
  getFilteredModels,
  getVehicleModel,
  getSelectedModel,
} from "../../../slices/searchSlice";
import { navSearchProducts } from "../../navbar/navigationSlugs";

const VehicleModel = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    selectedCategory,
    selectedVehicleType,
    filteredModels,
    selectedModel,
  } = useSelector((state) => state.searchReducer);

  // Fetch Vehicle Model Query API
  const [fetchVehicleModel, { data: vehicleModalData }] =
    useGetVehicleModelMutation();

  // Call Vehicle Model API on render / load
  useEffect(() => {
    fetchVehicleModel();
  }, []);

  // store all vehicle model in state after fetching data
  useEffect(() => {
    if (
      vehicleModalData?.status === 1 &&
      vehicleModalData?.data?.vehicleModelData?.length > 0
    )
      dispatch(getVehicleModel(vehicleModalData?.data?.vehicleModelData));
  }, [vehicleModalData]);

  // handle on change vehicle model
  const handleChange = (e) => {
    const { value } = e?.target;
    history.push(navSearchProducts);
    if (e.target.checked) {
      dispatch(
        getSelectedModel({
          add: value,
        })
      );
      return;
    } else {
      dispatch(
        getSelectedModel({
          remove: value,
        })
      );
      return;
    }
  };

  // Filter vehicle model data whenever main category changes
  useEffect(() => {
    dispatch(
      getFilteredModels({
        MainCategoryId: selectedCategory?.value,
        vehicle_type: selectedVehicleType?.Id,
      })
    );
  }, [vehicleModalData, selectedCategory, selectedVehicleType]);

  return (
    <>
      <ul>
        {filteredModels?.map((item) => (
          <li key={item?.Id}>
            <div className="custom__checkbox">
              <input
                type="checkbox"
                id={`vehicle_model_${item?.name}`}
                name="vehicle_model"
                value={item?.Id}
                onChange={handleChange}
                checked={selectedModel?.some((val) => val?.Id === item?.Id)}
              />
              <label htmlFor={`vehicle_model_${item?.name}`}>
                {item?.name}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default VehicleModel;
