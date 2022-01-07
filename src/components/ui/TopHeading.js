const TopHeading = ({ title, subtitle, className, style }) => {
  return (
    <>
      <div className={className ? `top-heading ${className}` : "top-heading"}>
        <h3>{title}</h3>
        <span>{subtitle}</span>
      </div>
    </>
  );
};

export default TopHeading;
