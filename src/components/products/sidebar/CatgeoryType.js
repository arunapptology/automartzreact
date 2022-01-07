import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { getSelectedCategory } from "../../../slices/searchSlice";
import { navSearchProducts } from "../../navbar/navigationSlugs";

const CatgeoryType = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const { allCategoryList, selectedCategory } = useSelector(
    (state) => state.searchReducer
  );

  const handleChange = (e) => {
    const { value } = e?.target;
    dispatch(getSelectedCategory(value));
    history.push(navSearchProducts);
  };

  useEffect(() => {
    if (params?.mainCat) {
      dispatch(getSelectedCategory(params?.mainCat));
    }

    if (params?.catgeory) {
      dispatch(getSelectedCategory(params?.catgeory));
    }
  }, [params?.mainCat, params?.catgeory]);

  return (
    <>
      <ul>
        {allCategoryList?.map((item) => (
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
        ))}
      </ul>
    </>
  );
};

export default CatgeoryType;
