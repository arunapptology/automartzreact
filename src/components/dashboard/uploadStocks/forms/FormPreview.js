import { useSelector } from "react-redux";

const FormPreview = () => {
  const { formPreviewData } = useSelector((state) => state.globalReducer);
  return (
    <>
      <div className=" form__preview">
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <td>Product Name</td>
              <td>{formPreviewData?.name}</td>
            </tr>
            <tr>
              <td>Vehicle Type</td>
              <td>{formPreviewData?.type?.label}</td>
            </tr>
            <tr>
              <td>Brand</td>
              <td>{formPreviewData?.brand?.label}</td>
            </tr>
            <tr>
              <td>Model</td>
              <td>{formPreviewData?.model?.label}</td>
            </tr>
            <tr>
              <td>Featured Image</td>
              <td>
                {formPreviewData?.profile_image && (
                  <img
                    src={formPreviewData?.profile_image}
                    alt="fetatured image"
                    className="img-fluid"
                  />
                )}
              </td>
            </tr>
            <tr>
              <td>Manufacturing Year</td>
              <td>{formPreviewData?.year}</td>
            </tr>
            <tr>
              <td>Driven in Km</td>
              <td>{formPreviewData?.km}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>{formPreviewData?.price}</td>
            </tr>
            <tr>
              <td>Discount</td>
              <td>
                {formPreviewData?.discount && `${formPreviewData?.discount}%`}
              </td>
            </tr>
            <tr>
              <td>color</td>
              <td>
                {!formPreviewData?.color?.r ? (
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      background: formPreviewData?.color,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      background: `rgba(${formPreviewData?.color.r}, ${formPreviewData?.color.g}, ${formPreviewData?.color.b}, ${formPreviewData?.color.a})`,
                    }}
                  />
                )}
              </td>
            </tr>
            <tr>
              <td>type</td>
              <td>{formPreviewData?.nod}</td>
            </tr>
            <tr>
              <td>description</td>
              <td>{formPreviewData?.description}</td>
            </tr>
            <tr>
              <td>Featured Image</td>
              <td>
                {formPreviewData?.multi_product_image &&
                  formPreviewData?.multi_product_image?.map((gal_img, i) => (
                    <img
                      key={i}
                      src={gal_img}
                      alt="Gallery image"
                      className="m-1 d-inline-block"
                      style={{ width: 80 }}
                    />
                  ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FormPreview;
