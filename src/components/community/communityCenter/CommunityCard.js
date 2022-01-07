import moment from "moment";
import { useSelector } from "react-redux";

import CommunityCardActions from "./CommunityCardActions";
import CommunityForm from "./CommunityForm";
import ResponseCard from "./ResponseCard";

const CommunityCard = ({ item }) => {
  const { commentList } = useSelector((state) => state.communityReducer);
  return (
    <>
      <div className="community__card shadow-sm">
        <div className="head">
          <div className="image shadow-sm border">
            <img
              src={item?.ProfileImage || "/images/default_image.png"}
              alt={item?.FullName}
              id={item?.Id}
            />
          </div>
          <div className="name__timing ml-2">
            <p className="name">{item?.FullName}</p>
            <p className="timing">
              {new Date(item?.CreatedOn).getDate() - 2 < new Date().getDate()
                ? moment(item?.CreatedOn).calendar(null, {
                    lastDay: "[Yesterday]",
                    sameDay: "[Today]",
                    lastWeek: "[Last] dddd",
                  })
                : moment(item?.CreatedOn).endOf("day").fromNow()}
            </p>
          </div>
          <div className="total__response">
            {commentList?.[item?.Id] && (
              <>
                {commentList?.[item?.Id]?.length > 0 ? (
                  <span>
                    {commentList?.[item?.Id]?.length > 1
                      ? `${commentList?.[item?.Id]?.length} responses`
                      : `${commentList?.[item?.Id]?.length} response`}
                  </span>
                ) : (
                  <span>Be the first one to respond</span>
                )}
              </>
            )}
          </div>
        </div>
        <div className="desc">
          <p>{item?.description}</p>
        </div>

        <CommunityCardActions likes={item?.likes} />

        {commentList?.[item?.Id] && commentList?.[item?.Id]?.length > 0 && (
          <div className="responses">
            {commentList?.[item?.Id]?.map((commentItem) => (
              <ResponseCard key={commentItem?.Id} item={commentItem} />
            ))}
          </div>
        )}

        <CommunityForm />
      </div>
    </>
  );
};

export default CommunityCard;
