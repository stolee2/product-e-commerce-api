import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserType {
    @Field()
    id: string;

    @Field()
    name: string;

    // Other fields...

    // Constructor and methods if needed
}

