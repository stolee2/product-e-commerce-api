import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';
import { CreateProductInput } from '../graphql-types/product/CreateProductInput';
import { UpdateProductInput } from '../graphql-types/product/UpdateProductInput';
import { ProductResponse } from '../graphql-types/product/ProductResponse';

@Resolver('Product')
export class ProductResolver {
    constructor(private readonly productService: ProductService) { }

    // QUERIES
    @Query(() => [ProductResponse])
    async products(): Promise<ProductResponse[]> {
        return this.productService.findAll();
    }

    @Query(() => ProductResponse)
    async product(@Args('id') id: number): Promise<ProductResponse> {
        return this.productService.findOneById(id);
    }

    // MUTATIONS
    @Mutation(() => Product)
    async createProduct(@Args('input') input: CreateProductInput): Promise<Product> {
        const newProduct = await this.productService.createProduct(input);
        return newProduct
    }

    @Mutation(() => Product)
    async updateProduct(@Args('id') id: number, @Args('input') input: UpdateProductInput): Promise<Product> {
        return this.productService.updateProduct(id, input);
    }

    @Mutation(() => Product)
    async deleteProduct(@Args('id') id: number): Promise<Product> {
        return this.productService.deleteProduct(id);
    }
}
