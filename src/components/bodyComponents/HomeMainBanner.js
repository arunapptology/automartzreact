import { Link } from "react-router-dom";
import { useGetMostVisitedVendorsQuery } from "../../services/vendorApi";
import { navVendorDetails, navVendors } from "../navbar/navigationSlugs";

const HomeMainBanner = () => {
  const { data: mvvData } = useGetMostVisitedVendorsQuery();
  return (
    <>
      <div
        className="main-banner"
        style={{
          backgroundImage: `url('banners/banner-main-minn.jpg')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="main-banner-text">
            {/* <p>Introducing AutoMartz</p> */}
            <h1>
              FIND THE BEST
              <p>
                AUTOMOTIVE <br />
              </p>
              DEALERS
            </h1>
            <div className="main-banner-buttons mt-5">
              <ul>
                <li>
                  <Link to={navVendors} className="btn btn-custom">
                    Our Prestigious partners
                  </Link>
                </li>
                {mvvData?.mostVisitVan_data &&
                  mvvData?.mostVisitVan_data
                    ?.slice(0, 4)
                    ?.map((mvvDatas, i) => (
                      <li key={i}>
                        <Link
                          to={`${navVendorDetails}/vendor/${mvvDatas?.UserSlug}`}
                          className="btn btn-custom"
                        >
                          {mvvDatas?.companyname}
                        </Link>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeMainBanner;
