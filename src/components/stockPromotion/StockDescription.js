const StockDescription = ({ item }) => {
  return (
    <>
      <h4 className="subtitle">Description</h4>
      <div className="description__content">
        {item?.Description && (
          <p className="text-initial">{item?.Description}</p>
        )}
        <ul>
          {item?.brand && (
            <li>
              <strong>Brand: </strong>
              {item?.brand}
            </li>
          )}

          {item?.model && (
            <li>
              <strong>model: </strong>
              {item?.model}
            </li>
          )}
          {item?.vehicletype && (
            <li>
              <strong>Vehicle Type: </strong>
              {item?.vehicletype}
            </li>
          )}
          {item?.color && (
            <li>
              <strong>Color: </strong>
              {item?.color}
            </li>
          )}

          {item?.kmtravel && (
            <li>
              <strong>Draiven in KM: </strong>
              {item?.kmtravel}
            </li>
          )}
          {item?.yearmanufactur && (
            <li>
              <strong>manufacturing year: </strong>
              {item?.yearmanufactur}
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default StockDescription;
