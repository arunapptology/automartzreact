import Accessories from "./Accessories";
import BuySell from "./BuySell";
import Services from "./Services";
import SpareParts from "./SpareParts";

const StockDetailsTabs = () => {
  return (
    <>
      <div className="nav-box-main">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="spareParts-tab"
              data-toggle="tab"
              href="#spareParts"
              role="tab"
              aria-controls="spareParts"
              aria-selected="true"
            >
              {" "}
              Spare Parts
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="buySell-tab"
              data-toggle="tab"
              href="#buySell"
              role="tab"
              aria-controls="buySell"
              aria-selected="false"
            >
              {" "}
              Buy/Sell
            </a>
          </li>

          <li className="nav-item">
            <a
              className="nav-link"
              id="services-tab"
              data-toggle="tab"
              href="#services"
              role="tab"
              aria-controls="services"
              aria-selected="false"
            >
              {" "}
              Services
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="accessories-tab"
              data-toggle="tab"
              href="#accessories"
              role="tab"
              aria-controls="accessories"
              aria-selected="false"
            >
              {" "}
              Accessories
            </a>
          </li>
        </ul>

        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="spareParts"
            role="tabpanel"
            aria-labelledby="spareParts-tab"
          >
            <SpareParts />
          </div>
          <div
            className="tab-pane fade"
            id="buySell"
            role="tabpanel"
            aria-labelledby="buySell-tab"
          >
            <BuySell />
          </div>

          <div
            className="tab-pane fade"
            id="services"
            role="tabpanel"
            aria-labelledby="services-tab"
          >
            <Services />
          </div>

          <div
            className="tab-pane fade"
            id="accessories"
            role="tabpanel"
            aria-labelledby="accessories-tab"
          >
            <Accessories />
          </div>
        </div>
      </div>
    </>
  );
};

export default StockDetailsTabs;
