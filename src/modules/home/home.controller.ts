import express = require("express");
import logger from "../../utils/winston";
import HomeService from "./home.service";

const router: express.Router = require("express").Router();
const home = new HomeService()

interface Log {
    level: string
    message: string,
    timestamp: string
}

interface QueryOptions {
    rows?: number;
    limit?: number;
    start?: number;
    from?: Date;
    until?: Date;
    order?: 'asc' | 'desc';
    fields: any;
}

router

    /**
    * @descr Test API endpoint
    * @route GET /
    * @access public
    */

    .get("/", async (req: express.Request, res: express.Response) => {

        home.Hello().then(data => {
            res.json(data)
        })

    })

    /**
    * @descr Test API endpoint
    * @route GET /logs
    * @access private
    */

    .get("/logs", async (req: express.Request, res: express.Response) => {

        const options: QueryOptions = {
            from: new Date(String(req.query.from)),
            until: new Date(String(req.query.until)),
            order: "desc",
            fields: req.query.fields ? String(req.query.fields).split(",").map(elt => elt.trim()) : ["level", "message", "timestamp"],
            limit: Number(req.query.limit),
        }

        logger.query(options, function (err: Error, results: any) {
            if (err) {
                /* TODO: handle me */
                logger.error(err.name + " : " + err.message);
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            }
            res.status(200).json(results["dailyRotateFile"].filter((log: Log) => {

                let levelsString = String(req.query.levels).trim()

                if (levelsString.length === 0) {
                    return true
                } else {
                    let levels = levelsString.split(",").map(elt => elt.trim())
                    if (levels.includes(log.level)) {
                        return true
                    } else {
                        return false
                    }
                }
            }));
        });
    })

export = router;
