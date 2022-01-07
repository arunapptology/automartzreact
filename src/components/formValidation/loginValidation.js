export const loginValidaion = (fields) => {
  let errors = {};
  let formIsValid = true;

  // Email - email
  if ("email" in fields) {
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Please enter your registered email address!";
    } else if (typeof fields["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "Please enter valid registered email address!";
      }
    }
  }

  if ("mobile" in fields) {
    if (!fields["mobile"]) {
      formIsValid = false;
      errors["mobile"] = "Please enter your registered mobile number!";
    } else if (typeof fields["mobile"] !== "undefined") {
      var pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(fields["mobile"])) {
        formIsValid = false;
        errors["mobile"] = "Please enter 10 digit registered mobile number!";
      } else if (fields["mobile"].length != 10) {
        formIsValid = false;
        errors["mobile"] = "Please enter 10 digit registered mobile number!";
      }
    }
  }

  if ("password" in fields) {
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Please enter your password!";
    }
  }

  return {
    formErrors: errors,
    formIsValid,
  };
};
