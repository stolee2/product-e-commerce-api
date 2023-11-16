import { ObjectType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProductCreateInput {
    @Field()
    name: string;

    @Field()
    price: number;

    @Field()
    status: string;

    @Field(() => [String])
    images: string[];
}