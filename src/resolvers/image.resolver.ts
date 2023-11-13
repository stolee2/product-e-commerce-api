import { Query, Resolver } from '@nestjs/graphql';
import { ImageType } from '../graphql-types/ImageType';

@Resolver()
export class ImageResolver {
    @Query(() => ImageType)
    image(): ImageType {
        return { id: '1', url: 'test', priority: 1000 };
    }

    @Query(() => [ImageType])
    images(): ImageType[] {
        return [
            { id: '2', url: 'test', priority: 500 },
            { id: '3', url: 'test', priority: 1000 }
        ];
    }
}
