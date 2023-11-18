import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    price: number;

    @Field({ nullable: true })
    status: string;

    @Field(() => [ID], { nullable: true })
    images: number[];
}
