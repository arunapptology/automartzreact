import { useState } from "react";

const EventDetailsContent = ({ item }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <>
      <div>
        <img
          src={item?.image}
          alt={item?.title}
          className="w-100 img-fluid shadow"
        />

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

export default EventDetailsContent;
