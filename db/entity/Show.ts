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
    genres: Partial<Genre[]>

    @OneToMany(() => Language, language => language.name, { cascade: true })
    language: Partial<Genre[]>

    @Column()
    scheduleTime: string;

    @Column() // this probably needs to be an array at some point, maybe its own table, so that I can query by date
    scheduleDate: string;

    @Column()
    ratingAverage: string;

    @Column({ type: 'date' })
    firstAired: Date;

    @Column({ type: 'simple-json' }) // will need to update this when I have a full list
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
    premiered: string;

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
    networks: Partial<Network[]>
};