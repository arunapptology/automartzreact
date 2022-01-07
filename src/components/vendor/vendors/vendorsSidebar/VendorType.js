const VendorType = () => {
  return (
    <>
      <ul>
        {/* {allCategoryList?.map((item) => (
            <li key={item?.id}>
              <div className="custom__checkbox">
                <input
                  type="radio"
                  id={`category_type_${item?.name}`}
                  name="category_type"
                  value={item?.value}
                  onChange={handleChange}
                  checked={selectedCategory?.value === item?.value}
                />
                <label htmlFor={`category_type_${item?.name}`}>
                  {item?.name}
                </label>
              </div>
            </li>
          ))} */}
      </ul>
    </>
  );
};

export default VendorType;
