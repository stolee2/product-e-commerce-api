import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductInput } from '../models/product/CreateProductInput';
import { UpdateProductInput } from '../models/product/UpdateProductInput';
import { Image } from '../entities/image.entity';
import { ProductResponse } from '../models/product/ProductResponse';

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
        await this.validateProductInput(input)

        const product = this.productRepository.create(input);
        return await this.productRepository.save(product);
    }

    async updateProduct(id: number, input: UpdateProductInput): Promise<Product> {
        await this.validateProductInput(input)

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

    /** Validation for create/update mutation */
    async validateProductInput(input: CreateProductInput | UpdateProductInput) {
        // validation for imageIds
        if (input.images && input.images.length) {
            const inputImageIds = input.images;
            const allImages = await this.imageRepository.findBy({ id: In(inputImageIds) })
            const dbImagesIds = allImages.map(el => el.id.toString())

            inputImageIds.forEach(imageId => {
                if (!dbImagesIds.includes(imageId.toString())) {
                    throw new Error(`Image with ID ${imageId} not found`);
                }
            })
        }

        // Validation for status
        if (input.status && input.status !== 'active' && input.status !== 'inactive') {
            throw new Error(`Product status must be 'active' or 'inactive'`);
        }

        // Validation for negative price
        if (input.price && input.price < 0) {
            throw new Error(`Product price must be more or equal to 0`);
        }
    }
}
