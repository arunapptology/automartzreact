import { useState } from "react";

const NewsDetailsContent = ({ item }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <>
      <div>
        {/* <ul className="list-inline d-flex justify-content-between py-3">
          <li className="list-inline-item">
            <i className="ti-user mr-2"></i> <small>Post by Admin </small>
          </li>
          <li className="list-inline-item">
            <i className="ti-calendar mr-2"></i>
            <small> {propertyValues[13]}</small>{" "}
          </li>
        </ul> */}
        <img
          src={`${process.env.REACT_APP_API_URL}/${item?.imagepath}/${item?.image_name}`}
          alt={item?.title}
          className="w-100 img-fluid shadow"
        />

        {/* <div className="social-shearing-tabs">
          <ul className="d-flex align-items-center mt-3">
            <li>
              <a>
                {" "}
                <i className="fa fa-heart-o" aria-hidden="true">
                  {" "}
                </i>{" "}
                Like <span>2</span>
              </a>{" "}
            </li>
            <li>
              {" "}
              <a href="">
                <i className="fa fa-share" aria-hidden="true"></i> Share{" "}
              </a>
            </li>
            <li>
              <a href="">
                <i className="fa fa-angle-right" aria-hidden="true"></i> Read
                More
              </a>{" "}
            </li>
          </ul>
        </div> */}

        <div className="content-box pt-3 ">
          <div className="content">
            <h2 className="title">{item?.title}</h2>

            {!readMore ? (
              <>
                <small
                  dangerouslySetInnerHTML={{
                    __html:
                      item?.description && item?.description.substring(0, 800),
                  }}
                />
                <div
                  className="showMoreDetailBtn"
                  onClick={() => setReadMore(!readMore)}
                >
                  Click to read more
                </div>
              </>
            ) : (
              <small
                dangerouslySetInnerHTML={{
                  __html: item?.description && item?.description,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsDetailsContent;
