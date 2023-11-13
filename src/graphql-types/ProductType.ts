import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ProductType {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    price: number;

    @Field()
    status: 'active' | 'inactive';

    @Field(type => [String], { nullable: true })
    images?: string[];
}