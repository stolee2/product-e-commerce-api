import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../entities/image.entity';
import { CreateImageInput } from '../graphql-types/image/CreateImageInput';
import { UpdateImageInput } from 'src/graphql-types/image/UpdateImageInput';


@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,
    ) { }

    async findAll(): Promise<Image[]> {
        return this.imageRepository.find();
    }

    async findOneById(id: number): Promise<Image> {
        const image = await this.imageRepository.findOneBy({ id });

        if (!image) {
            throw new Error(`Image with ID ${id} not found`);
        }

        return image
    }

    async createImage(input: CreateImageInput): Promise<Image> {
        const image = this.imageRepository.create(input);
        return await this.imageRepository.save(image);
    }

    async updateImage(id: number, input: UpdateImageInput): Promise<Image> {
        const existingImage = await this.imageRepository.findOneBy({ id });

        if (!existingImage) {
            throw new Error(`Image with ID ${id} not found`);
        }

        this.imageRepository.merge(existingImage, input);

        return await this.imageRepository.save(existingImage);
    }

    async deleteImage(id: number): Promise<Image> {
        const existingImage = await this.imageRepository.findOneBy({ id });

        if (!existingImage) {
            throw new Error(`Image with ID ${id} not found`);
        }

        await this.imageRepository.remove(existingImage);
        return existingImage;
    }
}
