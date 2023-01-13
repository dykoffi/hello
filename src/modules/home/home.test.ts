import app from "../../server/_globalRoutes";

describe("Home routes tester", () => {

    const supertest = require("supertest")(app);

    it("/GET get test", async () => {

        await supertest
            .get("/")
            .expect("Content-Type", /json/)
            .expect(200)

    });

    it("/GET logs", async () => {

        await supertest
            .get("/logs")
            .expect("Content-Type", /json/)
            .expect(200)

    });
});