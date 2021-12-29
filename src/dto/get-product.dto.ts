import { ResponseCreateProductDto } from "./create-product.dto";

export class ResponseGetProductDto extends ResponseCreateProductDto{
  product: Product
}

class Product {
  id: string;
  productName: string;
  image: string;
  price: number;
}