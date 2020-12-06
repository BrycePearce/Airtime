import { Column, Entity, ManyToOne } from "typeorm";
import { Base, Season } from "./index";

@Entity()
export class Episode extends Base {
    // so we can load the Seasons from an Episode
    @ManyToOne(() => Season, season => season.episodes)
    season: Season

    @Column({ type: "date" })
    airDate: Date;

    @Column()
    episodeNumber: number;

    @Column()
    seasonNumber: number;

    @Column()
    name: string;

    @Column()
    overview: string;
}