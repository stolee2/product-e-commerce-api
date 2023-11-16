import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductInput } from '../graphql-types/product/CreateProductInput';
import { UpdateProductInput } from '../graphql-types/product/UpdateProductInput';
import { Image } from '../entities/image.entity';
import { ProductResponse } from '../graphql-types/product/ProductResponse';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
        @InjectRepository(Image) private readonly imageRepository: Repository<Image>,
    ) { }

    async findAll(): Promise<ProductResponse[]> {
        const allImages = await this.imageRepository.find();
        const allProducts = await this.productRepository.find();

        return allProducts.map((product) => {
            const imageUrls = allImages.filter(image => product.images.includes(image.id))
            return {
                ...product,
                imageUrls: imageUrls.map(image => image.url)
            }
        })
    }

    async findOneById(id: number): Promise<ProductResponse> {
        const allImages = await this.imageRepository.find();
        const product = await this.productRepository.findOneBy({ id });

        if (!product) {
            throw new Error(`Product with ID ${id} not found`);
        }

        const imageUrls = allImages.filter(image => product.images.includes(image.id))

        return {
            ...product,
            imageUrls: imageUrls.map(image => image.url)
        }
    }

    async createProduct(input: CreateProductInput): Promise<Product> {
        const product = this.productRepository.create(input);
        return await this.productRepository.save(product);
    }

    async updateProduct(id: number, input: UpdateProductInput): Promise<Product> {
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

    async deleteProduct(id: number): Promise<Product> {
        const existingProduct = await this.productRepository.findOneBy({ id });

        if (!existingProduct) {
            throw new Error(`Product with ID ${id} not found`);
        }

        await this.productRepository.remove(existingProduct);
        return existingProduct;
    }
}