import { useEffect } from "react";

import { useGetVendorsListMutation } from "../../../services/vendorApi";
import VendorItem from "./VendorItem";
import Loader from "../../loader";

const VendorsResult = () => {
  const [fetchVendorList, { data: vendorList, isLoading }] =
    useGetVendorsListMutation();

  useEffect(() => {
    fetchVendorList();
  }, []);
  console.log(vendorList);
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading &&
        vendorList?.status === 1 &&
        vendorList?.data?.list?.length > 0 &&
        vendorList?.data?.list?.map((item) => (
          <VendorItem info={item} key={item?.Id} />
        ))}
    </>
  );
};

export default VendorsResult;
