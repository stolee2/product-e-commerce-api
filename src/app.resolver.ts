import { Query, Resolver } from '@nestjs/graphql';
import { UserType } from './graphql-types/UserType';

@Resolver()
export class AppResolver {
    @Query(() => String)
    getGraphqlEndpoint(): string {
        return 'Hello from GraphQL!';
    }

    @Query(() => UserType)
    getUser(): UserType {
        return { id: 'sad', name: 'Stole Ristov' };
    }
}
