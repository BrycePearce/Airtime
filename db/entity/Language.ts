import { Column, Entity } from "typeorm";
import { Base } from "./Base";

@Entity()
export class Language extends Base {
    @Column({
        length: 50,
        nullable: true,
    })
    name: string
}