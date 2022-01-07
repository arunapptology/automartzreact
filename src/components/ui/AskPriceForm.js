import { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInquiryItem,
  getUserInquiryInfo,
} from "../../slices/globalSlice";
import { globalValidation } from "../formValidation/globalValidation";

const AskPriceForm = ({ numberOnly }) => {
  const dispatch = useDispatch();
  const { userInquiryInfo } = useSelector((state) => state.globalReducer);

  const { countriesList } = useSelector((state) => state.locationReducer);
  const [selectedCountry, setSelectedCountry] = useState(countriesList[0]);

  const [errors, setErrors] = useState({});
  const [regisMsg, setRegisMsg] = useState({});
  const [sendingData, setSendingData] = useState(false);
  const [formData, setFormData] = useState({
    country_code: userInquiryInfo?.country_code || "",
    mobile: userInquiryInfo?.mobile || "",
    pin_code: userInquiryInfo?.pin_code || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { formErrors } = globalValidation(formData);

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

    // if (!errors[e.target.name]) {
    //   return null;
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setSendingData(true);
    let validForm;
    if (!numberOnly) {
      const { formErrors, formIsValid } = globalValidation(formData);
      if (!formIsValid) {
        setErrors(formErrors);
        setSendingData(false);
      }
      validForm = formIsValid;
    }

    if (numberOnly) {
      const { formErrors, formIsValid } = globalValidation({
        mobile: formData?.mobile,
      });
      if (!formIsValid) {
        setErrors(formErrors);
        setSendingData(false);
      }
      validForm = formIsValid;
    }

    if (validForm) {
      dispatch(getUserInquiryInfo(formData));
      let dataForm = new FormData();
      dataForm.append("country_code", formData?.country_code);
      dataForm.append("mobile", formData?.mobile);
      if (!numberOnly) {
        dataForm.append("pin_code", formData?.pin_code);
      }
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      country_code: selectedCountry.value,
      country: selectedCountry.countryName,
    });
  }, [selectedCountry]);

  useEffect(() => {
    if (regisMsg) {
      let regisMsgTimeout = setTimeout(() => setRegisMsg({}), 3000);
      return () => {
        clearTimeout(regisMsgTimeout);
      };
    }
  }, [regisMsg, setRegisMsg]);

  useEffect(() => {
    setFormData({ ...formData, ...userInquiryInfo });
  }, [userInquiryInfo]);

  const customSelectStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: "#002f5b",
      minWidth: 120,
      borderColor: isFocused ? "#002f5b" : "#ced4da",
      outline: "none",
      boxShadow: "none",
    }),
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="pt-4 pb-0 shadow-none bg-transparent"
        id="logreg-forms"
      >
        <div className="row">
          <div className="col-md-5">
            <Select
              styles={customSelectStyles}
              name="country_code"
              onChange={(code) => setSelectedCountry(code)}
              value={selectedCountry}
              options={countriesList}
            />
          </div>

          <div className="col-md-7">
            <div className="form-group">
              <div className="input__control">
                <input
                  type="number"
                  id="mobile"
                  name="mobile"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={handleBlur}
                  value={formData?.mobile}
                  className={
                    errors?.mobile ? "form-control error" : "form-control"
                  }
                  placeholder="mobile number"
                  required=""
                  autoComplete="off"
                />
                <label htmlFor="mobile">Mobile Number</label>
              </div>
              {errors?.mobile && (
                <span className="error">{errors?.mobile}</span>
              )}
            </div>
          </div>
          {!numberOnly && (
            <div className="col-md-12">
              <div className="form-group">
                <div className="input__control">
                  <input
                    type="number"
                    id="pin_code"
                    name="pin_code"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyUp={handleBlur}
                    value={formData.pin_code}
                    className={
                      errors?.pin_code ? "form-control error" : "form-control"
                    }
                    placeholder="pin code"
                    required=""
                    autoComplete="off"
                  />
                  <label htmlFor="pin_code">pin code</label>
                </div>
                {errors?.pin_code && (
                  <span className="error">{errors?.pin_code}</span>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="d-flex justify-content-end align-items-center py-3">
          {!numberOnly && (
            <span
              data-dismiss="modal"
              onClick={() => dispatch(getUserInquiryItem())}
              style={{ cursor: "pointer" }}
            >
              Cancel
            </span>
          )}
          <button
            className="btn submit__btn ml-3"
            type="submit"
            style={{ maxWidth: 150 }}
          >
            {!sendingData && "Submit"}
            {sendingData && "Sending..."}
          </button>
        </div>
      </form>
    </>
  );
};

export default AskPriceForm;
