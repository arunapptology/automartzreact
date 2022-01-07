export const stockFormValidation = (fields) => {
  let errors = {};
  let formIsValid = true;

  // product Name - name
  if ("name" in fields) {
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Please enter product name!";
    }
  }

  // vehicle type - type
  if ("type" in fields) {
    if (!fields["type"]) {
      formIsValid = false;
      errors["type"] = "Please select vehicle type!";
    }
  }

  // vehicle brand - brand
  if ("brand" in fields) {
    if (!fields["type"] && !fields["brand"]) {
      formIsValid = false;
      errors["brand"] = "Please select vehicle type first!";
    } else if (!fields["brand"]) {
      formIsValid = false;
      errors["brand"] = "Please select brand!";
    }
  }

  // vehicle model - model
  if ("model" in fields) {
    if (!fields["type"] && !fields["brand"] && !fields["model"]) {
      formIsValid = false;
      errors["model"] = "Please select vehicle type & brand first!";
    } else if (!fields["brand"] && !fields["model"]) {
      formIsValid = false;
      errors["model"] = "Please select brand first!";
    } else if (!fields["model"]) {
      formIsValid = false;
      errors["model"] = "Please select model!";
    }
  }

  // featured image - profile_image
  if ("profile_image" in fields) {
    if (!fields["profile_image"]) {
      formIsValid = false;
      errors["profile_image"] = "Please upload featured image";
    }
  }

  // manufacturing year - year
  if ("year" in fields) {
    if (!fields["year"]) {
      formIsValid = false;
      errors["year"] = "Please mention manufacturing year";
    }
    if (fields["year"] > new Date().getFullYear()) {
      formIsValid = false;
      errors["year"] = "Manufacturing year cannot be higher than current year";
    }
  }

  // price - price
  if ("price" in fields) {
    if (!fields["price"]) {
      formIsValid = false;
      errors["price"] = "Please enter price";
    }
    if (fields["price"] < 0) {
      formIsValid = false;
      errors["price"] = "Price must be positive value";
    }
  }

  // nod - nod
  if ("nod" in fields) {
    if (!fields["nod"]) {
      formIsValid = false;
      errors["nod"] = "Please select type!";
    }
  }

  // description - description
  if ("description" in fields) {
    if (!fields["description"]) {
      formIsValid = false;
      errors["description"] = "Please add description!";
    }
  }

  return {
    formErrors: errors,
    formIsValid,
  };
};
