import React from "react";
import { useParams } from "react-router-dom";

type Props = {};

const ProductPage = (props: Props) => {
  return <div>ProductPage {useParams().productID}</div>;
};

export default ProductPage;
