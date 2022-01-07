import TopHeading from "../ui/TopHeading";

const BestDeals = () => {
  return (
    <>
      <div className="deal-of-day">
        <TopHeading title="Deal of the day" subtitle="best deals" />

        <div className="deals-image">
          <a href="">
            <img
              src="../banners/deals-banner.jpg"
              className="w-100 border shadow"
              alt="Deal of the Day"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default BestDeals;
