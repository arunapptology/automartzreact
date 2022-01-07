import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useGetCommunityListMutation } from "../../../services/communityApi";
import {
  getCommentList,
  getIsCommunityLoading,
  getQuestionList,
  getSelectedCommunityCategory,
} from "../../../slices/communitySlice";

const LeftList = () => {
  const dispatch = useDispatch();
  const { allCategoryList } = useSelector((state) => state.searchReducer);
  const [activeCategory, setActiveCategory] = useState("1");

  useEffect(() => {
    dispatch(getSelectedCommunityCategory(activeCategory));
  }, [activeCategory]);

  // const [fetchCommunity, { data: communityData, isLoading }] =
  //   useGetCommunityListMutation();

  // const handleFetchData = (id = "1") => {
  //   const formData = new FormData();
  //   formData?.append("mainCat", id);

  //   fetchCommunity(formData);
  //   setActiveCategory(id);
  // };

  // useEffect(() => {
  //   handleFetchData();
  // }, []);

  // useEffect(() => {
  //   dispatch(getIsCommunityLoading(isLoading));

  //   if (communityData?.status === 1) {
  //     if (communityData?.QuestionList?.length > 0) {
  //       dispatch(getQuestionList(communityData?.QuestionList));
  //     }

  //     dispatch(getCommentList(communityData?.CommentList));
  //   }
  // }, [communityData]);

  // console.log(communityData);

  return (
    <>
      <div className="left__list__wrapper shadow-sm">
        <div className="list__container">
          <h4 className="community__title">Catgeories</h4>
          <div className="left__list__items">
            {allCategoryList?.map((item) => (
              <div
                className={`left__list__card ${
                  item?.value === activeCategory ? "active" : ""
                }`}
                key={item?.id}
                onClick={() => setActiveCategory(item?.value)}
              >
                <p className="title">{item?.name}</p>
                <span className="badge"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftList;
