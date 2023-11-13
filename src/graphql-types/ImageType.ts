import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ImageType {
    @Field(() => ID)
    id: string;

    @Field()
    url: string;

    @Field()
    priority: number;
}