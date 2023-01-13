import route from "../src/server/_globalRoutes"
import index_server from "../src/server/";

describe("Global routes testing", () => {
    const request = require("supertest")(route);
    require("supertest")(index_server);
    test("Prometheus metrics", async () => {
        await request
            .get("/metrics")
            .expect(200)
    })

    test("Not found route", async () => {
        await request
            .get("/notfound")
            .expect(404)
    })
})