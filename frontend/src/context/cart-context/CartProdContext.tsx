import { IProduct } from '../../features/product/ProductInfo';

export interface ICartProduct extends IProduct {
    quantity: number;
}

export interface ICartTotal {
productQuantity: number;
totalPrice: number;
currencyId: string;
currencyFormat: string;
}

export interface IGetProductsResponse {
data: {
    products: IProduct[];
};
}
