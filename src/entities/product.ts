import { Column, DataType, Length, Table } from 'sequelize-typescript';
import BaseModel from './baseModel';

@Table({ tableName: 'products' })
export class Product extends BaseModel {
  @Length({ max: 50, min: 6 })
  @Column(DataType.STRING)
  productName: string;

  @Column
  image: string;

  @Column
  price: number;

}
