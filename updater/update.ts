/*
 *  Updater/DB:
 *  get like 3-5 months/seasons worth of scheduled-to-air shows from Tvmaze, starting from current month/season. (instead of seasons like AC, could do monthly tabs)
 *        - note TMDB get-tv-on-the-air gets shows for next 7 days
 *  From that show data, query other APIs for more detail tv show info
 *  (will probably need episode info here too, will have to add that relation to the DB. TMDB and others have episode info)
 *  All the above gets stored in DB
 * 
 *  Api/Client:
 *  query range for current month/season for homepage layout?
 *  on show click, query for detail page
 */

require('dotenv').config({ path: '../.env' });
import { Show } from './../db/entity/index';
import { initializeDatabase } from "../db/index";
import { utcToZonedTime } from 'date-fns-tz';
import * as Tvmaze from "./apis/tvmaze";

// types
import { CronJob } from "cron";
import { addDays } from "date-fns";

const cronJob = new CronJob('* * * * *', updateDB, null, true, "America/Chicago", null, true); // currently runs every 1min
cronJob.start();

async function updateDB() {
    const currentTime = utcToZonedTime(new Date(), "America/New_York");
    const db = await initializeDatabase();
    const showRepository = db.getRepository(Show);
    const { data } = await Tvmaze.getScheduleRange(currentTime, addDays(currentTime, 1));
    console.log(data)
    // const shows = mapDataToShows(data[0] as Show[]);
    // console.log(shows)
    // await showRepository.save(shows[0])
    // shows.forEach(async (kappa) => {
    //     await showRepository.save(kappa)
    // });
    // await showRepository.save(shows);
};


/*
[
    {
        "id": 339141,
        "url": "http://www.tvmaze.com/episodes/339141/clarence-1x26-rough-riders-elementary",
        "name": "Rough Riders Elementary",
        "season": 1,
        "number": 26,
        "type": "regular",
        "airdate": "2014-12-01",
        "airtime": "07:30",
        "airstamp": "2014-12-01T12:30:00+00:00",
        "runtime": 11,
        "image": null,
        "summary": "",
        "show": {
            "id": 5617,
            "url": "http://www.tvmaze.com/shows/5617/clarence",
            "name": "Clarence",
            "type": "Animation",
            "language": "English",
            "genres": [
                "Comedy",
                "Family"
            ],
            "status": "Ended",
            "runtime": 15,
            "premiered": "2014-02-17",
            "officialSite": null,
            "schedule": {
                "time": "16:00",
                "days": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday"
                ]
            },
            "rating": {
                "average": null
            },
            "weight": 60,
            "network": {
                "id": 11,
                "name": "Cartoon Network",
                "country": {
                    "name": "United States",
                    "code": "US",
                    "timezone": "America/New_York"
                }
            },
            "webChannel": null,
            "externals": {
                "tvrage": null,
                "thetvdb": 271421,
                "imdb": "tt3061050"
            },
            "image": {
                "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/22/56691.jpg",
                "original": "http://static.tvmaze.com/uploads/images/original_untouched/22/56691.jpg"
            },
            "summary": "<p>The series revolves around <b>Clarence</b>, an optimistic boy who wants to do everything because everything is amazing.</p>",
            "updated": 1574378362,
            "_links": {
                "self": {
                    "href": "http://api.tvmaze.com/shows/5617"
                },
                "previousepisode": {
                    "href": "http://api.tvmaze.com/episodes/1471922"
                }
            }
        },
        "_links": {
            "self": {
                "href": "http://api.tvmaze.com/episodes/339141"
            }
        }
    },
]
*/

