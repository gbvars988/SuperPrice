import React from "react";

type Props = {
  product: IProduct;
};

interface IProduct {
  ProductID: number;
  Name: string;
  Weight: number;
  ImageURL: string;
  Price: number;
  SupermarketName: string;
}

const HProductCard = (props: Props) => {
  return (
    <div>
      {props.product.Name} {props.product.SupermarketName}
    </div>
  );
};

export default HProductCard;
