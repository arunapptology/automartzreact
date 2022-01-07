import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSelectedCategory } from "../../../slices/searchSlice";

import { navSearchProducts } from "../../navbar/navigationSlugs";
import TopHeading from "../../ui/TopHeading";

const SearchByCategory = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { allCategoryList } = useSelector((state) => state.searchReducer);

  const handleClick = (category) => {
    history.push(`${navSearchProducts}?catgeory=${category}`);
    dispatch(getSelectedCategory(category));
  };
  return (
    <>
      <div className="search-by-cat">
        <TopHeading title="search by category" subtitle="category" />
        <div className="row">
          {allCategoryList?.map((item) => (
            <div className="col-6 col-sm-4 mb-3" key={item?.id}>
              <div
                onClick={() => handleClick(item?.value)}
                className="search-item-text"
              >
                {item?.value === "1" && (
                  <>
                    <img src="/icons/buy-and-sell.png" alt={item?.name} />
                    <h4>{item?.name}</h4>
                    <p>
                      Find the dealers near you to buy/sell your vehicle easily.
                    </p>
                  </>
                )}
                {item?.value === "2" && (
                  <>
                    <img src="../icons/car_accessories.png" alt={item?.name} />
                    <h4>{item?.name}</h4>
                    <p>
                      Search your desired auto accessories in your local area.
                    </p>
                  </>
                )}
                {item?.value === "3" && (
                  <>
                    <img src="/icons/car_spareparts.png" alt={item?.name} />
                    <h4>{item?.name}</h4>
                    <p>
                      Get details of the best spare parts shops/stores in your
                      location.
                    </p>
                  </>
                )}
                {item?.value === "4" && (
                  <>
                    <img src="/icons/service.png" alt={item?.name} />
                    <h4>{item?.name}</h4>
                    <p>
                      Avail of the best-quality auto services from your nearby
                      center.
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchByCategory;
