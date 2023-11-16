import { Field, InputType } from '@nestjs/graphql';


@InputType()
export class UpdateImageInput {
    @Field()
    url: string;

    @Field()
    priority: number;
}