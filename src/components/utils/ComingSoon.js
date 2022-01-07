import { Link } from "react-router-dom";

const ComingSoon = () => {
  return (
    <>
      <div className="container">
        <div className="py-5 text-center">
          <h2
            className="text-capitalize pt-5"
            style={{ fontSize: 40, fontWeight: 600 }}
          >
            Coming Soon
          </h2>
          <Link to="/" className="custom__btn text-uppercase mt-4 mb-5">
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
