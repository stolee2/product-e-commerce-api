import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { ImageService } from '../services/image.service';
import { Image } from '../entities/image.entity'
import { CreateImageInput } from '../models/image/CreateImageInput';
import { UpdateImageInput } from '../models/image/UpdateImageInput';

@Resolver('Image')
export class ImageResolver {
    constructor(private readonly imageService: ImageService) { }

    // QUERIES
    @Query(() => [Image])
    async images(): Promise<Image[]> {
        return this.imageService.findAll();
    }

    @Query(() => Image)
    async image(@Args('id') id: number): Promise<Image> {
        return this.imageService.findOneById(id);
    }

    // MUTATIONS
    @Mutation(() => Image)
    async createImage(@Args('input') input: CreateImageInput): Promise<Image> {
        const newProduct = await this.imageService.createImage(input);
        return newProduct
    }

    @Mutation(() => Image)
    async updateImage(@Args('id') id: number, @Args('input') input: UpdateImageInput): Promise<Image> {
        return this.imageService.updateImage(id, input);
    }

    @Mutation(() => Image)
    async deleteImage(@Args('id') id: number): Promise<Image> {
        return this.imageService.deleteImage(id);
    }
}
