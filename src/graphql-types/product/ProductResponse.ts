import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class ProductResponse {
    @Field(type => ID, { nullable: true })
    id: number;

    @Field()
    name: string;

    @Field()
    price: number;

    @Field()
    status: string;

    @Field(() => [String])
    imageUrls: string[];
}
