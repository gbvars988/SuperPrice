import React from "react";

type Props = {
  product: IProduct;
};

interface IProduct {
  productID: string;
  name: string;
  weight: number;
  imageURL: string;
  price: number;
  supermarketName: string;
}

const HProductCard = (props: Props) => {
  return (
    <div>
      {props.product.name} {props.product.supermarketName}
    </div>
  );
};

export default HProductCard;
