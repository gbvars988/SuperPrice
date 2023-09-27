import { CartContext } from "../../context/CartContext";
/*
const cartTotal = () => {
  const { total, setTotal } = car();

  const updateCartTotal = (products: ICartProduct[]) => {
    const productQuantity = products.reduce(
      (sum: number, product: ICartProduct) => {
        sum += product.quantity;
        return sum;
      },
      0
    );

    const totalPrice = products.reduce((sum: number, product: ICartProduct) => {
      sum += product.supermarketPrices[0].price * product.quantity;
      return sum;
    }, 0);


    const total = {
      productQuantity,
      totalPrice,
      currencyId: 'AUD',
      currencyFormat: '$',
    };

    setTotal(total);
  };

  return {
    total,
    updateCartTotal,
  };
};

export default cartTotal;
*/