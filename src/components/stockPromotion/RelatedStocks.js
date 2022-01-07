import { useGetStockPromotionQuery } from "../../services/productsApi";
import CustomCarousel from "../ui/CustomCarousel";
import ProductCard from "../ui/ProductCard";
import StockPromotionItem from "./StockPromotionItem";

const RelatedStocks = () => {
  const { data, isFetching, isLoading } = useGetStockPromotionQuery();
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
    ],
  };
  console.log(data);
  return (
    <>
      <h4 className="subtitle" style={{ fontSize: 30 }}>
        Related Stocks
      </h4>
      {!isLoading &&
        data?.status === 1 &&
        data?.getvanstockinfoData?.length > 0 && (
          <CustomCarousel settings={settings}>
            {data?.getvanstockinfoData?.map((item, i) => (
              <StockPromotionItem key={item?.Id} {...item} />
            ))}
          </CustomCarousel>
        )}
    </>
  );
};

export default RelatedStocks;
