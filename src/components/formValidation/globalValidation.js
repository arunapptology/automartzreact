export const globalValidation = (fields) => {
  let errors = {};
  let formIsValid = true;

  // Mobile - mobile
  if ("mobile" in fields) {
    if (!fields["mobile"]) {
      formIsValid = false;
      errors["mobile"] = "Please enter 10 digit mobile number!";
    } else if (typeof fields["mobile"] !== "undefined") {
      var pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(fields["mobile"])) {
        formIsValid = false;
        errors["mobile"] = "Please enter 10 digit mobile number!";
      } else if (fields["mobile"].length != 10) {
        formIsValid = false;
        errors["mobile"] = "Please enter 10 digit mobile number!";
      }
    }
  }

  // Pin code - pin_code
  if ("pin_code" in fields) {
    if (!fields["pin_code"]) {
      formIsValid = false;
      errors["pin_code"] = "Please enter your area pin code";
    }
  }

  return {
    formErrors: errors,
    formIsValid,
  };
};
