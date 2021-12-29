import { ResponseCreateProductDto } from "./create-product.dto";

export class ResponseGetAllProductDto extends ResponseCreateProductDto{
  products: Product[]
}

class Product {
  id: string;
  productName: string;
  image: string;
  price: number;
}

