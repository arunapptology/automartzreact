import { Fragment } from "react";
const PageTitle = ({ title }) => {
  return (
    <Fragment>
      <h2 className="page__title">{title}</h2>
    </Fragment>
  );
};

export default PageTitle;
