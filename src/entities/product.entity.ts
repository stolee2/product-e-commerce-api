import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Product {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    price: number;

    @Field()
    @Column({ default: 'active' })
    status: string;

    @Field(() => [String])
    @Column("text", { array: true })
    images: string[];
}
