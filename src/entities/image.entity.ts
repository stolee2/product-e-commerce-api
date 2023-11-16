import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Image {
    @Field(type => ID, { nullable: true })
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    url: string;

    @Field()
    @Column({ default: 1000 })
    priority: number;
}