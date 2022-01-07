import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useGetDeleteUserStocksMutation,
  useGetUserStocksMutation,
} from "../../../services/userApi";
import {
  useGetDeleteVendorStocksMutation,
  useGetVendorStocksMutation,
} from "../../../services/vendorApi";
import { getUserStocks } from "../../../slices/userSlice";
import { getVendorStocks } from "../../../slices/vendorSlice";
import { useGetUserRole } from "../useGetUserRole";

import SweetAlert from "react-bootstrap-sweetalert";

const StockTable = ({ stock }) => {
  const dispatch = useDispatch();

  // Get Info from Local Storage
  const user_info = JSON.parse(localStorage?.getItem("user_info"));
  const vendor_info = JSON.parse(localStorage?.getItem("vendor_info"));

  // Get User Role
  const [userRole, setUserRole] = useGetUserRole();

  // Confirmation State For Deletion
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // Delete User / Vendor Stock API QUERY
  const [deleteUserStock, { data: userDeleteData }] =
    useGetDeleteUserStocksMutation();
  const [deleteVendorStock, { data: vendorDeleteData }] =
    useGetDeleteVendorStocksMutation();

  // Fetch User / Vendor Stock API QUERY
  const [fetchUserStock, { data: userStocks }] = useGetUserStocksMutation();
  const [fetchVendorStock, { data: vendorStocks }] =
    useGetVendorStocksMutation();

  // Handle Delete User / Vendor Stock
  const handleDeleteStock = (id, cat) => {
    let formData = new FormData();
    formData?.append("stockId", id);
    formData?.append("catId", cat);

    if (userRole === 2) {
      deleteUserStock(formData);
    }
    if (userRole === 3) {
      deleteVendorStock(formData);
    }

    setConfirmationModal(false);
  };

  useEffect(() => {
    setUserRole();
  }, [userRole]);

  // Call the Fetch - user/ vendor  API whenever the user role changes or user stock/vendor stockd deletes
  useEffect(() => {
    let formData = new FormData();
    if (userRole === 2) {
      fetchUserStock(formData);
      if (userDeleteData?.status === 1) {
        formData?.append("userId", "7783");
        // formData?.append("vendorId", user_info?.Id);
        setIsDeleted(true);
      }
    }

    if (userRole === 3) {
      if (vendorDeleteData?.status === 1) {
        formData?.append("vendorId", "4985");
        // formData?.append("vendorId", vendor_info?.Id);
        fetchVendorStock(formData);
        setIsDeleted(true);
      }
    }
  }, [userRole, userDeleteData, vendorDeleteData]);

  // Dispatch the updated User stocks to state after deleting the stock
  useEffect(() => {
    if (
      userStocks?.status === 1 &&
      userStocks?.search_data?.userStock?.length > 0
    ) {
      dispatch(getUserStocks(userStocks?.search_data?.userStock));
    } else {
      dispatch(getUserStocks([]));
    }
  }, [userStocks]);

  // Dispatch the updated Vendor stocks to state after deleting the stock
  useEffect(() => {
    if (
      vendorStocks?.status === 1 &&
      vendorStocks?.search_data?.vendorStock?.length > 0
    ) {
      dispatch(getVendorStocks(vendorStocks?.search_data?.vendorStock));
    } else {
      dispatch(getVendorStocks([]));
    }
  }, [vendorStocks]);

  // Auto close deleted popup after 2 seconds
  useEffect(() => {
    if (isDeleted) {
      const timer = setTimeout(() => setIsDeleted(false), 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isDeleted]);

  return (
    <>
      {stock && (
        <table className="table table-striped text-center stock__table">
          <thead>
            <tr>
              <th>S.No</th>
              <th className="text-left">Product name</th>
              <th>Product Image</th>
              <th>Price</th>
              <th>Valid Till Date</th>
              <th>Renew Product stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {stock?.map((item, i) => (
              <tr key={item?.Id}>
                <td>{i + 1} </td>
                <td className="text-left text-capitalize">
                  {item?.ProductName}
                </td>
                <td>
                  <img src={`${item?.imagePata}${item?.ProductImage}`} />
                </td>
                <td>{item?.PricePerPieces}</td>
                <td>{item?.ValidTill}</td>
                <td>
                  {new Date().getTime() >
                  new Date(item?.ValidTill).getTime() ? (
                    <button className="btn btn-warning btn-sm">Renew</button>
                  ) : (
                    "Active"
                  )}
                  <br />
                </td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => setConfirmationModal(true)}
                  >
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </button>
                  {confirmationModal && (
                    <SweetAlert
                      warning
                      showCancel
                      confirmBtnText="Yes, delete it!"
                      confirmBtnBsStyle="danger"
                      title="Are you sure?"
                      onConfirm={() =>
                        handleDeleteStock(item?.Id, item?.maincat)
                      }
                      onCancel={() => setConfirmationModal(false)}
                      btnSize="sm"
                    >
                      You will not be able to recover this stock!
                    </SweetAlert>
                  )}
                </td>
              </tr>
            ))}
            {stock?.length === 0 && (
              <tr>
                <td colSpan="7" className="py-3">
                  <span>No Stock Found</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {isDeleted && (
        <SweetAlert
          success
          title="Deleted"
          onConfirm={() => setIsDeleted(false)}
          closeOnClickOutside
          btnSize="sm"
        >
          Stock has been deleted successfully!
        </SweetAlert>
      )}
    </>
  );
};

export default StockTable;
