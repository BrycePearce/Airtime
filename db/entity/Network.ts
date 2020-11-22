import { Column, Entity, ManyToMany } from "typeorm";
import { Base, Show } from "./index";

@Entity()
export class Network extends Base {
    @Column()
    name: string

    @Column()
    country: string

    @Column()
    countryCode: string

    @Column()
    timezone: string

    @Column()
    language: string

    @ManyToMany(() => Show, show => show.networks)
    shows: Show[]
}