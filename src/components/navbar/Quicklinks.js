import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetQuickLinksQuery } from "../../services/globalApi";

import { Link } from "react-router-dom";

import { navSearchProducts } from "./navigationSlugs";

import "./quicklinks.css";
import {
  activateQuickLink,
  deactivateQuickLink,
} from "../../slices/globalSlice";
import { vehicleTypesList } from "../../store/vehicleTypesList";

function Quicklinks() {
  const dispatch = useDispatch();
  const [quickLinkId, setQuickLinkId] = useState("1");
  const { isQuickLinkActive } = useSelector((state) => state.globalReducer);

  const { data: quickLinksData } = useGetQuickLinksQuery(quickLinkId);

  const uniqueMainCategories = [
    ...new Set(
      quickLinksData?.user_info
        ?.map((item) => item?.MainCategoryId)
        ?.sort((a, b) => a - b)
    ),
  ];

  const handleMouseEnter = (id) => {
    setQuickLinkId(id);
    dispatch(activateQuickLink());
  };

  return (
    <>
      <div className="quick-links-main desktop-view">
        <div className="ruby-menu-demo-header">
          <div className="ruby-wrapper container">
            {/* <button className="c-hamburger c-hamburger--htx visible-xs">
          <span>toggle menu</span>
        </button> */}

            <ul className="ruby-menu">
              {vehicleTypesList?.map((item) => (
                <li className="ruby-menu-mega" key={item?.id}>
                  <span
                    className="main__link"
                    onMouseEnter={() => handleMouseEnter(item?.id)}
                  >
                    {item?.label?.toLowerCase()?.includes("two")
                      ? item?.label?.replace(/two/i, 2)
                      : item?.label?.toLowerCase()?.includes("three")
                      ? item?.label?.replace(/three/i, 3)
                      : item?.label?.toLowerCase()?.includes("four")
                      ? item?.label?.replace(/four/i, 4)
                      : item?.label}
                  </span>

                  <div
                    className={`ruby-grid ruby-grid-lined ${
                      isQuickLinkActive ? "active" : "deactive"
                    }`}
                  >
                    <div className="ruby-row">
                      {uniqueMainCategories?.map((mainCatItem, i) => (
                        <div className="ruby-col-3" key={i}>
                          <h3 className="ruby-list-heading">
                            {mainCatItem === "1" && "Buy & Sell"}
                            {mainCatItem === "2" && "Spare Parts"}
                            {mainCatItem === "3" && "Accesories"}
                            {mainCatItem === "4" && "Services"}
                          </h3>
                          <ul className="mminner_links mminner_links2">
                            {quickLinksData?.user_info &&
                              quickLinksData?.user_info.map(
                                (linkItem, i) =>
                                  linkItem.MainCategoryId === mainCatItem && (
                                    <li key={i}>
                                      {" "}
                                      <Link
                                        to={`${navSearchProducts}?maincat=${linkItem?.MainCategoryId}&cat=${linkItem?.CategoryId}&feature=${linkItem?.Id}`}
                                        onClick={() =>
                                          dispatch(deactivateQuickLink())
                                        }
                                      >
                                        {" "}
                                        {linkItem.name}{" "}
                                      </Link>{" "}
                                    </li>
                                  )
                              )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <span className="ruby-dropdown-toggle"></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quicklinks;
