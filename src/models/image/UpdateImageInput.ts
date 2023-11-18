import { Field, InputType } from '@nestjs/graphql';


@InputType()
export class UpdateImageInput {
    @Field({ nullable: true })
    url: string;

    @Field({ nullable: true })
    priority: number;
}