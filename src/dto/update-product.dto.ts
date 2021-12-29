import { IsNotEmpty } from 'class-validator';
import { ResponseCreateProductDto } from './create-product.dto';

export class UpdateProductDto {
  @IsNotEmpty()
  productName: string

  @IsNotEmpty()
  image: string

  @IsNotEmpty()
  price: number
}

export class ResponseUpdateDto extends ResponseCreateProductDto {}
