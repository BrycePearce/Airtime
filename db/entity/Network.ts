import { Column, Entity, ManyToMany } from "typeorm";
import { Base, Show } from "./index";

@Entity()
export class Network extends Base {
    @Column()
    name: string

    @Column()
    logoPath: string

    @Column()
    countryCode: string

    @ManyToMany(() => Show, show => show.networks)
    shows: Show[]
}