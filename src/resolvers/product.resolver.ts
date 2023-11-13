import { Query, Resolver } from '@nestjs/graphql';
import { ProductType } from '../graphql-types/ProductType';

@Resolver()
export class ProductResolver {
    @Query(() => ProductType)
    product(): ProductType {
        return { id: '1', name: 'product1', price: 1, status: 'active', images: [] };
    }

    @Query(() => [ProductType])
    products(): ProductType[] {
        return [
            { id: '1', name: 'product1', price: 1, status: 'active', images: [] },
            { id: '2', name: 'product2', price: 2, status: 'active', images: [] }
        ];
    }
}
