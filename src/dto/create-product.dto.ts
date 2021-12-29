import { IsNotEmpty } from "class-validator";

export class ProductDto {

  @IsNotEmpty()
  productName: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  price: number;
}

export class ResponseCreateProductDto{
  errorCode: number;
  message: string;
}