import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  useGetMostVisitedProductsQuery,
  useGetProductDetailsMutation,
} from "../../../services/productsApi";
import { useGetVehicleCategoryQuery } from "../../../services/searchApi";

import Loader from "../../loader";
import { navProductDetails } from "../../navbar/navigationSlugs";
import NoDataFound from "../../utils/NoDataFound";

import "./ProductDetails.css";

const ProductDetails = () => {
  const params = useParams();

  const [fetchProductDetails, { data: productData, isLoading }] =
    useGetProductDetailsMutation();

  const { data: mdpData } = useGetMostVisitedProductsQuery();

  const { data: vehicleCatgory } = useGetVehicleCategoryQuery();

  useEffect(() => {
    const formData = new FormData();
    formData?.append("proid", params?.id);
    formData?.append("tbl", params?.categoryTbl);
    fetchProductDetails(formData);
  }, [params?.id]);

  return (
    <>
      <div className="container py-5 product__details">
        {!isLoading &&
          productData?.status === 1 &&
          productData?.data?.details?.length > 0 && (
            <div className="row">
              <div className="col-md-8">
                {productData?.data?.details?.map((productDetails) => (
                  <div className="shadow p-4" key={productDetails?.Id}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="text-center">
                          <img
                            src={`${process.env.REACT_APP_API_URL}/${productDetails?.productimage}`}
                            alt={productDetails?.productName}
                            className="w-100 m-auto border"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <h2 className="mb-3 title">
                          {productDetails?.ProductName}
                        </h2>
                        <div className="">
                          <p>
                            <strong>Vehicle Type:</strong>{" "}
                            {vehicleCatgory?.status === 1 &&
                              vehicleCatgory?.data?.vehicleCategoryData
                                ?.length > 0 &&
                              vehicleCatgory?.data?.vehicleCategoryData?.find(
                                (item) =>
                                  item?.Id === productDetails?.CategoryId
                              )?.CategoryName}{" "}
                          </p>
                        </div>
                        <p>{productDetails?.Description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-4">
                <div className="shadow p-3">
                  <div className="products__list">
                    <h5 className="mb-4" style={{ color: "var(--bs-danger" }}>
                      Most Demanding Products
                    </h5>
                    {mdpData?.status === 1 &&
                      mdpData?.mostDemandingPro?.length > 0 &&
                      mdpData?.mostDemandingPro?.slice(0, 5).map((item) => (
                        <Link
                          to={`${navProductDetails}/${item?.ProductId}/${item?.CategoryId}`}
                          key={item?.Id}
                          className="item"
                        >
                          <div className="image">
                            <img
                              className="w-100"
                              src={item?.img_status && item?.img_path}
                              alt={item?.ProductName}
                            />
                          </div>
                          <div className="item-content">
                            <p>{item?.ProductName}</p>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        {isLoading && <Loader />}
        {!isLoading && productData?.status === 0 && (
          <NoDataFound
            title="No Product Found"
            subtitle="Product Details Not Found"
          />
        )}
      </div>
    </>
  );
};

export default ProductDetails;
