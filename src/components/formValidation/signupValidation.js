export const signupValidation = (fields) => {
  let errors = {};
  let formIsValid = true;

  // Company Name - companyname
  if ("companyname" in fields) {
    if (!fields["companyname"]) {
      formIsValid = false;
      errors["companyname"] = "Please enter your company name!";
    }
  }

  // Full Name - fullname
  if ("fullname" in fields) {
    if (!fields["fullname"].trim()) {
      formIsValid = false;
      errors["fullname"] = "Please enter your full name!";
    }
  }

  // Email - email
  if ("email" in fields) {
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Please enter your email address!";
    } else if (typeof fields["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "Please enter valid email address!";
      }
    }
  }

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

  // Password - password
  if ("password" in fields) {
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Please enter your password!";
    } else {
      const strongRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      );
      if (!strongRegex.test(fields["password"])) {
        formIsValid = false;
        errors["password"] =
          "Password should not be less than 8 characters and must contain atleast a capital letter, a number and a special character.";
      }
    }
  }

  // Confirm Password - confirmPassword

  if ("confirmPassword" in fields) {
    if (!fields["confirmPassword"]) {
      formIsValid = false;
      errors["confirmPassword"] = "Please confirm your password!";
    } else if (fields["password"] !== fields["confirmPassword"]) {
      formIsValid = false;
      errors["confirmPassword"] = "Passwords don't match.";
    }
  }

  return {
    formErrors: errors,
    formIsValid,
  };
};
