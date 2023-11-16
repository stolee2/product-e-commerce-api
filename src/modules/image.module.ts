import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../entities/image.entity';
import { ImageService } from '../services/image.service';
import { ImageResolver } from '../resolvers/image.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([Image])
    ],
    providers: [ImageService, ImageResolver],
})

export class ImageModule { }
