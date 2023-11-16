import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Image } from '../entities/image.entity';
import { ProductService } from '../services/product.service';
import { ProductResolver } from '../resolvers/product.resolver';


@Module({
    imports: [TypeOrmModule.forFeature([Product, Image])],
    providers: [ProductService, ProductResolver]
})

export class ProductModule { }
