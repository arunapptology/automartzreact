import CatgeoryType from "./CatgeoryType";
import VehicleBrand from "./VehicleBrand";
import VehicleModel from "./VehicleModel";
import VehicleType from "./VehicleType";

const Sidebar = () => {
  return (
    <>
      <aside className="sidebar search__sidebar shadow-sm">
        <div className="sidebar__widget">
          <h4 className="title" data-toggle="collapse" href="#catgeoryType">
            Select Catgeory
          </h4>
          <div id="catgeoryType" className="collapse multi-collapse show">
            <CatgeoryType />
          </div>
        </div>

        <div className="sidebar__widget">
          <h4
            className="title"
            data-toggle="collapse"
            data-target="#vehicleType"
          >
            Select Vehicle Type
          </h4>
          <div className="collapse multi-collapse show" id="vehicleType">
            <VehicleType />
          </div>
        </div>

        <div className="sidebar__widget">
          <h4
            className="title"
            data-toggle="collapse"
            data-target="#vehicleModel"
          >
            Select Options
          </h4>
          <div className="collapse multi-collapse show" id="vehicleModel">
            <VehicleModel />
          </div>
        </div>

        <VehicleBrand />
      </aside>
    </>
  );
};

export default Sidebar;
