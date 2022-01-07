import ShareOptions from "./ShareOptions";

const CommunityCardActions = ({ likes }) => {
  return (
    <>
      <div className="action">
        <div className="action__btn like">
          <i className="fa fa-heart-o" aria-hidden="true"></i>
          {likes > 0 ? (
            <>{likes === "1" ? `${likes} like` : `${likes} likes`}</>
          ) : (
            <>like</>
          )}
        </div>
        <div className="action__btn add__response">
          <i className="far fa-comment-alt"></i>
          <span>Add Response</span>
        </div>
        <div className="action__btn share">
          <i className="fa fa-share"></i>
          <span>Share</span>

          <ShareOptions />
        </div>
      </div>
    </>
  );
};

export default CommunityCardActions;
