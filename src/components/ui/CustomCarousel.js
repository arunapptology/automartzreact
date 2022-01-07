import Slider from "react-slick";

const CustomArrorw = ({ className, style, onClick }) => {
  let icon;
  if (className.includes("slick-next")) {
    icon = <i className="fa fa-angle-right" aria-hidden="true"></i>;
  }

  if (className.includes("slick-prev")) {
    icon = <i className="fa fa-angle-left" aria-hidden="true"></i>;
  }

  return (
    <div className={className} onClick={onClick}>
      {icon}
    </div>
  );
};

const CustomCarousel = ({ children, settings }) => {
  const sliderSettings = {
    dots: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite:
      children?.length >= settings?.slidesToShow || children?.length >= 2,
    speed: 1500,
    slidesToShow: 2,
    slidesToScroll: 2,
    nextArrow: <CustomArrorw />,
    prevArrow: <CustomArrorw />,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
    ...settings,
  };
  return (
    <>
      <Slider {...sliderSettings}>{children}</Slider>
    </>
  );
};

export default CustomCarousel;
