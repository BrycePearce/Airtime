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
import { initializeDatabase } from "../db/index";

// endpoints
import * as Tvmaze from "./apis/tvmaze";

// types
import { Show } from './../db/entity/index';

// third party
import { utcToZonedTime } from 'date-fns-tz';
import { addDays } from "date-fns";
import { CronJob } from "cron";

const cronJob = new CronJob('* * * * *', updateDB, null, true, "America/Chicago", null, true); // currently runs every 1min
cronJob.start();

async function updateDB() {
    const currentTime = utcToZonedTime(new Date(), "America/New_York");
    const db = await initializeDatabase();
    const showRepository = db.getRepository(Show);
    const { data } = await Tvmaze.getScheduleRange(currentTime, addDays(currentTime, 6));
    console.log(data)
    // const shows = mapDataToShows(data[0] as Show[]);
    // console.log(shows)
    // await showRepository.save(shows[0])
    // shows.forEach(async (kappa) => {
    //     await showRepository.save(kappa)
    // });
    // await showRepository.save(shows);
};