import { useParams } from "react-router";

const DetailBanner = () => {
  const params = useParams();
  let bannerTitle;

  switch (params?.id) {
    case "latest-news":
      bannerTitle = "Latest News";
      break;

    case "latest-launches":
      bannerTitle = "Latest Launches";
      break;

    default:
      break;
  }
  return (
    <>
      <div className="news__detail__banner">
        <img
          src="/images/latest_news_banner.png"
          alt="latest news"
          className="w-100"
        />
        <div className="news__detail__banner__content">
          <div className="container">
            <h2 className="title">{bannerTitle}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailBanner;
