import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductDto, ResponseCreateProductDto } from './dto/create-product.dto';
import { ResponseDeleteDto } from './dto/delete-product.dto';
import { ResponseGetAllProductDto } from './dto/get-all-product.dto';
import { ResponseGetProductDto } from './dto/get-product.dto';
import { ConnenctionDto } from './dto/status-check.dto';
import { ResponseUpdateDto, UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product';
import {
  notFoundException,
  successConstant,
} from './utils/constants/error.constants';
import { FilterException } from './utils/exceptions/filter-exception';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Product)
    private readonly productRepo: typeof Product,
  ) {}

  async statusCheck(): Promise<ConnenctionDto> {
    return {
      ...successConstant,
      environment: process.env.ENVIRONMENT,
      statusServer: 'ACTIVE',
    };
  }

  async getAllProduct(): Promise<ResponseGetAllProductDto> {
    try {
      const products = await this.productRepo.findAll({
        attributes: ['id', 'productName', 'image', 'price'],
      });
      return {
        ...successConstant,
        products,
      };
    } catch (error) {
      throw new FilterException(error);
    }
  }

  async getProduct(productId: string): Promise<ResponseGetProductDto> {
    try {
      const product = await this.productRepo.findOne({
        where: {
          id: productId,
        },
        attributes: ['id', 'productName', 'image', 'price'],
      });
      if (!product) {
        throw new NotFoundException(notFoundException);
      }
      return {
        ...successConstant,
        product,
      };
    } catch (error) {
      throw new FilterException(error);
    }
  }

  async createProduct(
    productDto: ProductDto,
  ): Promise<ResponseCreateProductDto> {
    try {
      const { productName, image, price } = productDto;
      const newProductData = {
        productName,
        image,
        price,
      };
      await this.productRepo.create(newProductData);

      return successConstant;
    } catch (error) {
      throw new FilterException(error);
    }
  }

  async updateProduct(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ResponseUpdateDto> {
    try {
      await this.productRepo.update(updateProductDto, {
        where: {
          id: productId,
        },
      });
      return successConstant;
    } catch (error) {
      throw new FilterException(error);
    }
  }

  async deleteProduct(productId: string): Promise<ResponseDeleteDto> {
    try {
      await this.productRepo.destroy({ where: { id: productId } });

      return successConstant;
    } catch (error) {
      throw new FilterException(error);
    }
  }
}
