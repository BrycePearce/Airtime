require('dotenv').config({ path: '../.env' });
import { initializeDatabase } from "../db/index";
import * as constants from "./constants";
import fs from 'fs';

// endpoints
import * as Tmdb from "./apis/tmdb";

// types
import { Show } from './../db/entity/index';

// third party
import { utcToZonedTime } from 'date-fns-tz';
import { addDays } from "date-fns";
import { CronJob } from "cron";


// const cronJob = new CronJob('* * * * *', updateDB, null, true, constants.timezone, null, true); // currently runs every 1min
// cronJob.start();

async function updateDB() {
    const currentTime = utcToZonedTime(new Date(), constants.timezone);
    const db = await initializeDatabase();
    const showRepository = db.getRepository(Show);
    const shows = await Tmdb.getScheduleRange(currentTime, addDays(currentTime, 1));
    shows.forEach(async (show) => {
        try {
            await showRepository.save(show);
        } catch (ex) {
            fs.appendFile("malformedShows.json", `${JSON.stringify(show)},`, () => { });
            return;
        }
    });
};

updateDB();