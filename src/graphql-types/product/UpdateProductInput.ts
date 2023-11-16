import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
    @Field()
    name: string;

    @Field()
    price: number;

    @Field()
    status: string;

    @Field(() => [ID])
    images: number[];
}