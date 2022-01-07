import { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  activateLoginPopup,
  deActivateQuestionForm,
} from "../../../slices/communitySlice";
import { useGetAddedCommunityQuestionMutation } from "../../../services/communityApi";
import Loader from "../../loader";

const AddNewQuestion = () => {
  const dispatch = useDispatch();
  const { isUserLoggedin, loggedinUserInfo } = useSelector(
    (state) => state.userReducer
  );
  const { isVendorLoggedin, loggedinVendorInfo } = useSelector(
    (state) => state.vendorReducer
  );

  const { allCategoryList } = useSelector((state) => state.searchReducer);

  const [callAddQuestionApi, { data: addedQuestionStatus, isLoading }] =
    useGetAddedCommunityQuestionMutation();

  const [errors, setErrors] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [newQuestion, setNewQuestion] = useState({
    category: "",
    question: "",
  });

  useEffect(() => {
    setNewQuestion({ ...newQuestion, category: allCategoryList[0] });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newQuestion?.question?.trim()) {
      setErrors("Please write your question!");
      return;
    }
    if (!isUserLoggedin) {
      setErrors("Kindly Login to post your question!");
      return;
    }

    if (!errors) {
      const formData = new FormData();
      formData?.append("UserId", loggedinUserInfo?.Id);
      formData?.append("user_role", loggedinUserInfo?.UserRole);
      formData?.append("user_name", loggedinUserInfo?.FullName);
      formData?.append("Title", newQuestion?.category?.value || "1");
      formData?.append("description", newQuestion?.question);

      callAddQuestionApi(formData);
      setNewQuestion({
        ...newQuestion,
        question: "",
      });
    }
  };

  useEffect(() => {
    if (newQuestion?.question) {
      if (!isUserLoggedin && !isVendorLoggedin) {
        setErrors("Kindly Login to post your question!");

        if (newQuestion?.question?.length >= 3) {
          dispatch(activateLoginPopup());
          setNewQuestion({
            ...newQuestion,
            question: "",
          });
        }
      } else {
        setErrors("");
      }
    } else {
      setErrors("");
    }
  }, [newQuestion]);

  useEffect(() => {
    if (addedQuestionStatus?.status === 1) {
      setSuccessMsg("Question added successfully!");
    }
  }, [addedQuestionStatus]);

  useEffect(() => {
    const timer = setTimeout(() => setSuccessMsg(""), 1500);
    return () => {
      clearTimeout(() => timer());
    };
  }, [successMsg]);

  const customSelectStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#002f5b",
      minWidth: 80,
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
      <form onSubmit={handleSubmit} id="question__form">
        <div className="community__form add__new__question">
          <h4 className="text-capitalize mb-3 " style={{ fontSize: 18 }}>
            Post Your Question
          </h4>
          <span
            className="deactivate__form__btn"
            onClick={() => dispatch(deActivateQuestionForm())}
          >
            <i className="fa fa-times"></i>
          </span>
          <div className="row">
            <div className="col-sm-4 mb-0 mb-sm-3">
              <label htmlFor="category">Select Category:</label>
            </div>
            <div className="col-sm-8  mb-3 mb-sm-3">
              <Select
                styles={customSelectStyles}
                name="category"
                id="category"
                onChange={(value) =>
                  setNewQuestion({ ...newQuestion, category: value })
                }
                value={newQuestion?.category || allCategoryList[0]}
                options={allCategoryList}
              />
            </div>
            <div className="col-sm-4 mb-0 mb-sm-3">
              <label htmlFor="question">Write your Question:</label>
            </div>
            <div className="col-sm-8 mb-0 mb-sm-3">
              <div className="form-group">
                <div className="input__control">
                  <textarea
                    type="text"
                    name="question"
                    id="question"
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        question: e.target.value,
                      })
                    }
                    value={newQuestion?.question}
                    className={errors ? "form-control error" : "form-control"}
                    placeholder="Your question...."
                    required=""
                    autoFocus=""
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-10 col-lg-9 mb-3 mb-sm-0">
              {errors && <span className="error">{errors}</span>}
              {successMsg && (
                <span className="text-success">
                  Question added successfully!
                </span>
              )}
              {addedQuestionStatus?.status === 0 && (
                <span className="error">something went worng!</span>
              )}
            </div>
            <div className="col-sm-2 col-lg-3">
              <button className="custom__btn" type="submit">
                {!isLoading && (
                  <i className="fa fa-paper-plane" aria-hidden="true"></i>
                )}
                {isLoading && <Loader type="white" />}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddNewQuestion;
