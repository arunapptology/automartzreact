const Loader = ({ type }) => {
  return (
    <>
      {!type && (
        <div className="loader text-center py-3">
          <img
            src="/images/loader_icon.svg"
            alt="Loading..."
            style={{ width: 60 }}
          />
        </div>
      )}
      {type === "white" && (
        <img src="/images/loader_icon_white.svg" alt="Loading..." />
      )}
    </>
  );
};

export default Loader;
