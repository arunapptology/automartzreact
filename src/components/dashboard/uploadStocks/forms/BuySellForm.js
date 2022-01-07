import { useEffect, useState } from "react";
import Select from "react-select";
import { SketchPicker } from "react-color";
import DatePicker from "react-datepicker";
import SweetAlert from "react-bootstrap-sweetalert";
import { stockFormValidation } from "./stockFormValidation";
import Loader from "../../../loader";

import {
  useGetUploadUserStocksMutation,
  useGetVehicleBrandsMutation,
  useGetVehicleModelsMutation,
  useGetVehicleTypesQuery,
} from "../../../../services/uploadStocksApi";

import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getFormPreviewData } from "../../../../slices/globalSlice";

const BuySellForm = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());

  const [sAlertModal, setSAlertModal] = useState(false);

  const { loggedinUserInfo } = useSelector((state) => state.userReducer);
  const { loggedinVendorInfo } = useSelector((state) => state.vendorReducer);

  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  // Get Vehicle Types List
  const { data: vehicleTypesList } = useGetVehicleTypesQuery();
  // Get Vehicle Brands List
  const [fetchVehicleBrand, { data: vehicleBrandsList }] =
    useGetVehicleBrandsMutation();
  // Get Vehicle Models List
  const [fetchVehicleModels, { data: vehicleModelsList }] =
    useGetVehicleModelsMutation();

  const [callUploadApi, { data: uploadReturnData, isLoading }] =
    useGetUploadUserStocksMutation();

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    brand: "",
    model: "",
    color: "",
    year: startDate?.getFullYear(),
    nod: "",
    price: "",
    discount: "",
    description: "",
    km: "",
    profile_image: "",
    multi_product_image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (e.target.files) {
      let selectedFiles = [];

      for (const f of [...e.target.files]) {
        selectedFiles.push(f);
      }

      setFormData({
        ...formData,
        [name]: selectedFiles,
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { formErrors } = stockFormValidation(formData);

    if (formErrors?.[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: formErrors?.[e.target.name],
      });
    }

    if (!formErrors?.[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: formErrors?.[e.target.name],
      });
    }

    if (!errors[e.target.name]) {
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { formErrors, formIsValid } = stockFormValidation(formData);
    if (!formIsValid) {
      setErrors(formErrors);
    }

    if (formIsValid) {
      let newFormData = new FormData();

      // if (loggedinVendorInfo?.Id) {
      //   newFormData?.append("user_id", loggedinVendorInfo?.Id);
      // } else if (loggedinUserInfo?.Id) {
      newFormData?.append("user_id", loggedinUserInfo?.Id);
      // }
      newFormData?.append("main_cat", "1");

      newFormData?.append("name", formData?.name);
      newFormData?.append("type", formData?.type?.value);
      newFormData?.append("brand", formData?.brand?.value);
      newFormData?.append("model", formData?.model?.value);
      newFormData?.append("color", formData?.color);
      newFormData?.append("year", formData?.year);
      newFormData?.append("nod", formData?.nod);
      newFormData?.append("price", formData?.price);
      newFormData?.append("discount", formData?.discount);
      newFormData?.append("description", formData?.description);
      newFormData?.append("km", formData?.km);
      newFormData?.append("profile_image", formData?.profile_image[0]);
      newFormData?.append(
        "multi_product_image",
        formData?.multi_product_image[0]
      );

      console.log(formData?.multi_product_image);
      // console.log(formData?.profile_image[0]);

      callUploadApi(newFormData);
    }
  };

  // Fetch Vehicle Brands on change of Vehicle type
  useEffect(() => {
    const newFormData = new FormData();
    newFormData?.append("vehicletype", formData?.type?.value);
    fetchVehicleBrand(newFormData);
  }, [formData?.type]);

  // Fetch Vehicle Models on change of Vehicle Brand
  useEffect(() => {
    const newFormData = new FormData();
    newFormData?.append("brandtype", formData?.brand?.value);
    fetchVehicleModels(newFormData);
  }, [formData?.brand]);

  // if uploaded successfully
  useEffect(() => {
    if (!isLoading && uploadReturnData?.status === 1) {
      setSAlertModal(true);
      // setFormData("");
    }
  }, [uploadReturnData]);

  console.log(uploadReturnData);

  // update form preview data state on change of input data
  useEffect(() => {
    let newData = { ...formData };
    if (newData?.profile_image) {
      newData = {
        ...newData,
        profile_image: URL.createObjectURL(newData?.profile_image[0]),
      };
    }

    if (newData?.multi_product_image) {
      let selectedImagesUrl = [];
      for (const f of [...newData?.multi_product_image]) {
        selectedImagesUrl.push(URL.createObjectURL(f));
      }
      newData = {
        ...newData,
        multi_product_image: selectedImagesUrl,
      };
    }

    dispatch(getFormPreviewData(newData));
  }, [formData]);

  const customSelectStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: "#002f5b",
      minWidth: 180,
      borderColor: isFocused ? "#002f5b" : "#ced4da",
      outline: "none",
      boxShadow: "none",
      fontSize: 14,
    }),
    option: (provided) => ({
      ...provided,
      fontSize: 14,
    }),
  };

  const styles = {
    popover: {
      position: "absolute",
      zIndex: "2",
    },
    cover: {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    },
  };

  const asterisk = <i className="fa fa-asterisk" />;

  return (
    <>
      <form className="pt-3" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <div className="input__control">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData?.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={handleBlur}
                  placeholder="Full name *"
                  className="form-control"
                  required=""
                  autoFocus=""
                  autoComplete="off"
                />
                <label htmlFor="name">Product Name {asterisk}</label>
              </div>
              {errors?.name && <span className="error">{errors?.name}</span>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <div className="input__control select">
                <Select
                  styles={customSelectStyles}
                  name="type"
                  onChange={(value) => {
                    setFormData({ ...formData, type: value });
                    setErrors({ ...errors, type: "" });
                  }}
                  value={formData?.type}
                  options={vehicleTypesList?.data}
                  placeholder="Select Vehicle Type *"
                />

                <label>Vehicle Type {asterisk}</label>
              </div>
              {errors?.type && <span className="error">{errors?.type}</span>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <div className="input__control select">
                <Select
                  styles={customSelectStyles}
                  name="brand"
                  onChange={(value) => {
                    setFormData({ ...formData, brand: value });
                    setErrors({ ...errors, brand: "" });
                  }}
                  value={formData?.brand}
                  options={vehicleBrandsList?.data}
                  placeholder="Select Brand *"
                />
                <label>Vehicle Brand {asterisk}</label>
              </div>
              {errors?.brand && <span className="error">{errors?.brand}</span>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <div className="input__control select">
                <Select
                  styles={customSelectStyles}
                  name="model"
                  onChange={(value) => {
                    setFormData({ ...formData, model: value });
                    setErrors({ ...errors, model: "" });
                  }}
                  value={formData?.model}
                  options={vehicleModelsList?.data}
                  placeholder="Select Model *"
                />
                <label>Vehicle Model {asterisk}</label>
              </div>
              {errors?.model && <span className="error">{errors?.model}</span>}
            </div>
          </div>

          <div className="col-md-12">
            <div className="box-fileupload mb-4">
              <input
                type="file"
                onChange={(e) => {
                  handleChange(e);
                  setErrors({ ...errors, profile_image: "" });
                }}
                className="filetype"
                name="profile_image"
              />

              <span className="box-fileupload__lable">
                upload Featured image {asterisk}
              </span>
              {errors?.profile_image && (
                <span className="error mt-4">{errors?.profile_image}</span>
              )}

              {formData?.profile_image && (
                <span className="mt-4">{formData?.profile_image[0]?.name}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <div className="input__control date">
                <DatePicker
                  className="form-control custom__datepicker"
                  showYearPicker
                  dateFormat="yyyy"
                  onChange={(year) => {
                    setFormData({
                      ...formData,
                      year: new Date(year).getFullYear(),
                    });
                    setStartDate(year);
                  }}
                  selected={startDate}
                />
                <label htmlFor="year">Manufacturing Year {asterisk}</label>
              </div>
              {errors?.year && <span className="error">{errors?.year}</span>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <div className="input__control">
                <input
                  type="number"
                  id="km"
                  name="km"
                  value={formData?.km}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Driven in K.M."
                  className="form-control"
                  required=""
                  autoFocus=""
                  autoComplete="off"
                />
                <label htmlFor="km">Driven in K.M.</label>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <div className="input__control">
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData?.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={handleBlur}
                  placeholder="Price *"
                  className="form-control"
                  required=""
                  autoFocus=""
                  autoComplete="off"
                />
                <label htmlFor="price">Price {asterisk}</label>
              </div>
              {errors?.price && <span className="error">{errors?.price}</span>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <div className="input__control">
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={formData?.discount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="discount in %"
                  className="form-control"
                  required=""
                  autoFocus=""
                  autoComplete="off"
                />
                <label htmlFor="discount">discount in %</label>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <div className="input__control color">
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={
                    formData?.color?.r
                      ? `rgba(${formData?.color.r}, ${formData?.color.g}, ${formData?.color.b}, ${formData?.color.a})`
                      : formData?.color
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="color"
                  className="form-control"
                  required=""
                  autoFocus=""
                  autoComplete="off"
                />
                <label htmlFor="color">color</label>
                <span
                  onClick={() => setDisplayColorPicker(!displayColorPicker)}
                  style={{
                    background: formData?.color.r
                      ? `rgba(${formData?.color.r}, ${formData?.color.g}, ${formData?.color.b}, ${formData?.color.a})`
                      : formData?.color,
                  }}
                >
                  Or choose color
                </span>
                {displayColorPicker ? (
                  <div style={styles.popover}>
                    <div style={styles.cover} onClick={handleClose} />
                    <SketchPicker
                      color={formData?.color}
                      onChange={(color) =>
                        setFormData({ ...formData, color: color.rgb })
                      }
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <div className="input__control color">
                <div className="vehicle__nod d-flex align-items-center justify-content-between">
                  <p className="mb-0">Select Type {asterisk}</p>
                  <div className="custom__input__radio">
                    <div className="radio__option">
                      <input
                        type="radio"
                        id="used"
                        name="nod"
                        value="used"
                        onChange={handleChange}
                      />
                      <label htmlFor="used">used</label>
                    </div>

                    <div className="radio__option">
                      <input
                        type="radio"
                        id="new"
                        name="nod"
                        value="new"
                        onChange={handleChange}
                      />
                      <label htmlFor="new">New</label>
                    </div>
                  </div>
                </div>
              </div>
              {errors?.nod && <span className="error">{errors?.nod}</span>}
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-group">
              <div className="input__control">
                <textarea
                  id="description"
                  name="description"
                  value={formData?.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={handleBlur}
                  placeholder="description *"
                  className="form-control"
                  required=""
                  autoFocus=""
                  autoComplete="off"
                />
                <label htmlFor="description">description {asterisk}</label>
              </div>
              {errors?.description && (
                <span className="error">{errors?.description}</span>
              )}
            </div>
          </div>

          <div className="col-md-12">
            <div className="box-fileupload mb-3">
              <input
                type="file"
                onChange={handleChange}
                className="filetype"
                name="multi_product_image"
                multiple
              />

              <span className="box-fileupload__lable">
                upload Gallery Images
              </span>

              {formData?.multi_product_image && (
                <span className="mt-4">
                  {formData?.multi_product_image?.map((item, i, arr) => (
                    <span key={i}>
                      {i + 1 === arr.length ? item?.name : `${item?.name}, `}
                    </span>
                  ))}
                </span>
              )}
            </div>
          </div>

          <div className="col-md-12">
            <div className="d-flex justify-content-end mt-4">
              <button type="submit" className="custom__btn">
                {!isLoading ? "submit" : <Loader type="white" />}
              </button>
            </div>
          </div>
        </div>
      </form>

      {!isLoading && uploadReturnData?.status === 1 && sAlertModal && (
        <SweetAlert
          success
          title="Uploaded"
          closeOnClickOutside
          btnSize="sm"
          onConfirm={() => setSAlertModal(false)}
        >
          Stock has been uploaded successfully!
        </SweetAlert>
      )}
    </>
  );
};

export default BuySellForm;
