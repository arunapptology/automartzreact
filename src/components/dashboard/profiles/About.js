import { useState } from "react";
import { Link } from "react-router-dom";
import { navAbout } from "../../navbar/navigationSlugs";
import DashboardHeading from "../../ui/DashboardHeading";

const About = ({ info }) => {
  const regex = /(<([^>]+)>)/gi;
  const [readMore, setReadMore] = useState(false);
  return (
    <>
      <div className="row ">
        <div className="col-md-4 mb-4">
          <div
            className="shadow-sm card border-0 h-100 text-center d-flex flex-column justify-content-center align-items-center"
            style={{
              background: "url(/images/prfoile_bg.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              overflow: "hidden",
              zIndex: 1,
              position: "relative",
            }}
          >
            <div className="overlay"></div>
            <img
              src={info?.ProfileImage || "/images/user_icon.png"}
              className="rounded-circle border mx-auto"
              width="60"
              alt={info?.FullName}
            />
            <p className="text-white my-2">{info?.FullName}</p>
            <ul className="rating__stars">
              <li>
                <i className="fa fa-star" aria-hidden="true"></i>
              </li>
              <li>
                <i className="fa fa-star" aria-hidden="true"></i>
              </li>
              <li>
                <i className="fa fa-star" aria-hidden="true"></i>
              </li>
              <li>
                <i className="fa fa-star-o" aria-hidden="true"></i>
              </li>
              <li>
                <i className="fa fa-star-o" aria-hidden="true"></i>
              </li>
              <li>
                <span className=" text-white">( 3.0/5 ) </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-md-8 mb-4">
          <div className="card shadow-sm px-3 pb-3  d-block">
            <DashboardHeading title={"About Me"} />
            <div
              className=""
              style={{ display: "initial" }}
              dangerouslySetInnerHTML={{
                __html: `${
                  info?.about && !readMore
                    ? `${info?.about?.replace(regex, "").substring(0, 300)}...`
                    : info?.about
                }`,
              }}
            />
            {info?.about && (
              <span
                onClick={() => setReadMore(!readMore)}
                style={{ color: "var(--bs-danger)", cursor: "pointer" }}
              >
                {readMore ? " Read Less" : " Read More"}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
