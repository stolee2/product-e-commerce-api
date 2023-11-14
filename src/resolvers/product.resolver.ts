import { Query, Resolver } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';

@Resolver('Product')
export class ProductResolver {
    constructor(private readonly productService: ProductService) { }

    @Query(() => [Product])
    async products(): Promise<Product[]> {
        return this.productService.findAll();
    }
}
