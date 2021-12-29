import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductDto, ResponseCreateProductDto } from './dto/create-product.dto';
import { ResponseDeleteDto } from './dto/delete-product.dto';
import { ResponseGetAllProductDto } from './dto/get-all-product.dto';
import { ResponseGetProductDto } from './dto/get-product.dto';
import { ConnenctionDto } from './dto/status-check.dto';
import { ResponseUpdateDto, UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from './utils/auth/jwt-auth.guard';
import { RoleGuard } from './utils/auth/role.guard';
import { Public } from './utils/decorators/public.decorator';
import { ADMIN, Role } from './utils/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  async statusCheck(): Promise<ConnenctionDto> {
    return this.appService.statusCheck();
  }

  @Get('products')
  async getAllProduct(): Promise<ResponseGetAllProductDto> {
    return this.appService.getAllProduct()
  }

  @Role(ADMIN)
  @Post('product')
  async createProduct(@Body() productDto: ProductDto): Promise<ResponseCreateProductDto> {
    return this.appService.createProduct(productDto)
  }

  @Role(ADMIN)
  @Get('product/:productId')
  async getProduct(@Param() product: any): Promise<ResponseGetProductDto> {
    return this.appService.getProduct(product.productId)
  }

  @Role(ADMIN)
  @Patch('product/:productId')
  async updateProduct(@Param() product: any, @Body() updateProductDto: UpdateProductDto): Promise<ResponseUpdateDto> {
    return this.appService.updateProduct(product.productId, updateProductDto)
  }

  @Role(ADMIN)
  @Delete('product/:productId')
  async deleteProduct(@Param() product: any): Promise<ResponseDeleteDto> {
    return this.appService.deleteProduct(product.productId)
  }
}
