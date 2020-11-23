import { Network } from './Network';
import { Language } from './Language';
import { Genre } from './Genre';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Base } from './Base'

@Entity()
export class Show extends Base {
    @Column()
    name: string;

    @OneToMany(() => Genre, genre => genre.name, { cascade: true })
    genres: Genre[]

    @OneToMany(() => Language, language => language.name, { cascade: true })
    language: Language[]

    @Column()
    scheduleTime: string;

    @Column() // this probably needs to be an array at some point, maybe its own table, so that I can query by date
    scheduleDate: string;

    @Column()
    ratingAverage: string;

    @Column({ type: 'date' })
    firstAired: Date;

    @Column({ type: 'simple-json', nullable: true }) // will need to update this when I have a full list
    externalIds: {
        tvrage: string,
        thetvdb: string,
        imdb: string
    };

    @Column()
    status: string;

    @Column()
    runtime: string;

    @Column()
    premiered: string; // todo: probably update this to be an object like premier info with premierDate, and hasPremeired

    @Column()
    officialSite: string;

    @Column({ type: 'smallint' })
    weight: number;

    @Column()
    poster_path: string;

    @Column()
    backdrop_path: string;

    @Column()
    summary: string;

    @Column({ type: 'boolean' })
    airing: boolean;

    @ManyToMany(() => Network, network => network.shows)
    @JoinTable()
    networks: Network[]
};