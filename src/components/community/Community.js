import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader";
import CommunityCard from "./communityCenter/CommunityCard";
import LeftList from "./communityLeft/LeftList";
import AddNewQuestion from "./communityCenter/AddNewQuestion";

import "./community.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetCommunityListMutation } from "../../services/communityApi";
import {
  deActivateLoginPopup,
  getCommentList,
  getQuestionList,
} from "../../slices/communitySlice";
import RightList from "./communityRight/RightList";
import LoginForm from "../ui/LoginForm";
import UserLogin from "../user/UserLogin";
import VendorLogin from "../vendor/VendorLogin";
import PageTitle from "../ui/PageTitle";

const Community = () => {
  const dispatch = useDispatch();

  const [activeUserLoginModal, setActiveUserLoginModal] = useState(true);
  const [activeVendorLoginModal, setActiveVendorLoginModal] = useState(false);

  const {
    questionList,
    commentList,
    selectedCommunityCategory,
    isQuestionFormActive,
    isLoginPopupActive,
  } = useSelector((state) => state.communityReducer);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);

  const [fetchCommunity, { data: communityData, isLoading }] =
    useGetCommunityListMutation();

  const handleFetchData = (pageCount = 1) => {
    const formData = new FormData();
    formData?.append("mainCat", selectedCommunityCategory);
    formData?.append("page", pageCount);

    fetchCommunity(formData);
  };

  // call only on changes of category
  useEffect(() => {
    // empty the question list
    dispatch(getQuestionList([]));
    // empty the comment list
    dispatch(getCommentList([]));
    // set the page to default - 1
    setPage(1);

    // call fetch data API function
    handleFetchData();
  }, [selectedCommunityCategory]);

  // update the redux state after fetching data
  useEffect(() => {
    if (communityData?.status === 1) {
      if (communityData?.QuestionList?.length > 0) {
        dispatch(
          getQuestionList([...questionList, ...communityData?.QuestionList])
        );
      }

      if (communityData?.datacount === 0) {
        setLastPage(true);
      } else {
        setLastPage(false);
      }

      dispatch(
        getCommentList({ ...commentList, ...communityData?.CommentList })
      );
    }
  }, [communityData]);

  return (
    <>
      <div className="community__page">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-lg-3 left__list">
              <LeftList />
            </div>
            <div className="col-md-8 col-lg-6 community__main__center">
              {isQuestionFormActive && <AddNewQuestion />}

              {isLoading && <Loader />}

              {questionList?.length > 0 && (
                <div className="community__cards">
                  <InfiniteScroll
                    dataLength={questionList?.length}
                    next={() => {
                      setPage(page + 1);
                      !lastPage && handleFetchData(page + 1);
                    }}
                    hasMore={true}
                    loader={isLoading && <Loader />}
                  >
                    {questionList?.map((item, i) => (
                      <CommunityCard key={i} item={item} />
                    ))}
                  </InfiniteScroll>
                </div>
              )}
            </div>
            <div className="col-md-12 col-lg-3 right__list">
              <RightList />
            </div>
          </div>
        </div>
      </div>

      {isLoginPopupActive && (
        <div className="custom__modal">
          <div className="custom__modal__container">
            <span
              className="deactivate__form__btn"
              style={{
                top: 5,
                right: 5,
                background: "var(--bs-danger)",
                color: "#fff",
              }}
              onClick={() => dispatch(deActivateLoginPopup())}
            >
              <i className="fa fa-times" style={{ color: "#fff" }} />
            </span>

            {activeUserLoginModal && (
              <>
                <div id="logreg-forms">
                  <div className="text-center">
                    <PageTitle title="user login" />
                  </div>
                  <LoginForm UserRole={2} />
                </div>
              </>
            )}
            {activeVendorLoginModal && (
              <>
                <div id="logreg-forms">
                  <div className="text-center">
                    <PageTitle title="vendor login" />
                  </div>
                  <LoginForm UserRole={3} />
                </div>
              </>
            )}
            <div className="text-center pt-3">
              <p
                className="border d-inline-block"
                style={{
                  borderRadius: "50%",
                  width: 30,
                  height: 30,
                  lineHeight: "28px",
                  background: "var(--bs-gray-300)",
                  fontWeight: 500,
                }}
              >
                OR
              </p>

              <span
                className="d-block"
                style={{ cursor: "pointer", color: "var(--bs-primary)" }}
                onClick={() => {
                  setActiveVendorLoginModal(!activeVendorLoginModal);
                  setActiveUserLoginModal(!activeUserLoginModal);
                }}
              >
                {activeUserLoginModal && "Login as Vendor"}
                {activeVendorLoginModal && "Login as User"}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Community;
