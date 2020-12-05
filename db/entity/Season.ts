import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Base, Episode, Show } from "./index";

@Entity()
export class Season extends Base {
    @OneToMany(() => Episode, episode => episode.season)
    episodes: Episode[];

    // so we can load the relation from Season side
    @ManyToOne(() => Show, show => show.seasons)
    show: Show;

    @Column()
    name: string;

    @Column({ nullable: true })
    posterPath: string;

    @Column({ type: "smallint" })
    seasonNumber: number;

    @Column({ nullable: true })
    overview: string;
}