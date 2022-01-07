import { useEffect, useState } from "react";
import Select from "react-select";
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

const SparePartsForm = () => {
  const { loggedinUserInfo } = useSelector((state) => state.userReducer);
  const { loggedinVendorInfo } = useSelector((state) => state.vendorReducer);

  // Get Vehicle Types List
  const { data: vehicleTypesList } = useGetVehicleTypesQuery();

  const [callUploadApi, { data: uploadReturnData, isLoading }] =
    useGetUploadUserStocksMutation();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    discount: "",
    profile_image: "",
    pieces: "",
    min_qty: "",
    description: "",
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
      newFormData?.append("multi_product_image", formData?.multi_product_image);

      callUploadApi(newFormData);
    }
  };

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
                  placeholder="Full name"
                  className="form-control"
                  required=""
                  autoFocus=""
                  autoComplete="off"
                />
                <label htmlFor="name">Product Name</label>
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
                  placeholder="Select Vehicle Type"
                />

                <label>Vehicle Type</label>
              </div>
              {errors?.type && <span className="error">{errors?.type}</span>}
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
                  placeholder="Price"
                  className="form-control"
                  required=""
                  autoFocus=""
                  autoComplete="off"
                />
                <label htmlFor="price">Price</label>
              </div>
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
                upload Featured image
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
              <div className="input__control">
                <input
                  type="number"
                  id="pieces"
                  name="pieces"
                  value={formData?.pieces}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Number of pieces"
                  className="form-control"
                  required=""
                  autoFocus=""
                  autoComplete="off"
                />
                <label htmlFor="pieces">Number of pieces</label>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <div className="input__control">
                <input
                  type="number"
                  id="min_qty"
                  name="min_qty"
                  value={formData?.min_qty}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Minimum Quantity"
                  className="form-control"
                  required=""
                  autoFocus=""
                  autoComplete="off"
                />
                <label htmlFor="min_qty">Minimum Quantity</label>
              </div>
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
                  placeholder="description"
                  className="form-control"
                  required=""
                  autoFocus=""
                  autoComplete="off"
                />
                <label htmlFor="description">description</label>
              </div>
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

      {!isLoading && uploadReturnData?.status === 1 && (
        <SweetAlert success title="Uploaded" closeOnClickOutside btnSize="sm">
          Stock has been uploaded successfully!
        </SweetAlert>
      )}
    </>
  );
};

export default SparePartsForm;
