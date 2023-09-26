import { Container, Box
} from '@chakra-ui/react';

import { ICartProduct } from '../../context/cart-context/CartProdContext'
import CartProduct from './CartProduct';

interface IProps {
  products: ICartProduct[];
}

const CartProducts = ({ products }: IProps) => {
  return (
    <Container>
      {products?.length ? (
        products.map((p) => <CartProduct product={p} key={p.name} />)
      ) : (
        <Box>
          Add some products in the cart <br />
          :)
        </Box>
      )}
    </Container>
  );
};

export default CartProducts;