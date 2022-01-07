const VendorsSidebar = () => {
  return (
    <>
      <aside className="sidebar">
        <div className="sidebar__widget">
          <h4 className="title" data-toggle="collapse" href="#catgeoryType">
            Vendor Type
          </h4>
          <div id="catgeoryType" className="collapse multi-collapse show"></div>
        </div>
      </aside>
    </>
  );
};

export default VendorsSidebar;
