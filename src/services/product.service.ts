import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductCreateInput } from '../graphql-types/product/ProductCreateInput';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    ) { }

    async findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async createProduct(input: ProductCreateInput): Promise<Product> {
        const product = this.productRepository.create(input);
        return await this.productRepository.save(product);
    }

    async updateProduct(id: number, input: ProductCreateInput): Promise<Product> {
        // Check if product exist
        const existingProduct = await this.productRepository.findOneBy({ id });

        if (!existingProduct) {
            // if not throw error
            throw new Error(`Product with ID ${id} not found`);
        }

        // Update the existing product
        this.productRepository.merge(existingProduct, input);

        // Save the updated product to the database
        return await this.productRepository.save(existingProduct);
    }

}