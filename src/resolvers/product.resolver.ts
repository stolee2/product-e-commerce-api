import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';
import { ProductCreateInput } from '../graphql-types/product/ProductCreateInput';

@Resolver('Product')
export class ProductResolver {
    constructor(private readonly productService: ProductService) { }

    // QUERIES
    @Query(() => [Product])
    async products(): Promise<Product[]> {
        return this.productService.findAll();
    }

    // MUTATIONS
    @Mutation(() => Product)
    async createProduct(@Args('input') input: ProductCreateInput): Promise<Product> {
        const newProduct = await this.productService.createProduct(input);
        return newProduct
    }

    @Mutation(() => Product)
    async updateProduct(@Args('id') id: number, @Args('input') input: ProductCreateInput): Promise<Product> {
        return this.productService.updateProduct(id, input);
    }
}
