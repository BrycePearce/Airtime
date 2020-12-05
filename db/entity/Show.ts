import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Language, Network, Genre, Base, Season } from './index';

@Entity()
export class Show extends Base {
    @Column()
    name: string;

    @OneToMany(() => Genre, genre => genre.name, { cascade: true })
    genres: Genre[];

    @OneToMany(() => Language, language => language.name, { cascade: true })
    languages: Language[];

    @OneToMany(() => Season, season => season.show)
    seasons: Season[];

    @Column({ type: 'real' })
    popularity: Number;

    @Column({ type: 'date', nullable: true })
    firstAired: Date;

    @Column({ type: 'simple-json', nullable: true }) // will need to update this when I have a full list
    externalIds: {
        tmdb: Number,
        tvdb: Number,
        imdb: string,
        facebook: string,
        instagram: string,
        twitter: string
    };

    @Column()
    status: string;

    @Column()
    runtime: Number;

    @Column()
    officialSite: string;

    @Column()
    posterPath: string;

    @Column()
    numEpisodes: number;

    @Column()
    numSeasons: number;

    @Column()
    backdropPath: string;

    @Column()
    overview: string;

    @Column({ type: 'boolean' })
    airing: boolean;

    @ManyToMany(() => Network, network => network.shows)
    @JoinTable()
    networks: Network[];
};