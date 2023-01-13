import express = require("express");

import app from "./app";
import swaggerDocument from "../docs/_index";
import prometheus from "../utils/prometheus";

app.use("/", require("../modules/home/home.controller.ts"));


app.use("/metrics", async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) => {
    res.setHeader("Content-Type", prometheus.contentType)
    res.send(await prometheus.metrics())
}
);

app.use("/swagger.json", (
    req: express.Request,
    res: express.Response) => {
    res.status(200).json(swaggerDocument);
});

app.use("/docs", (
    req: express.Request,
    res: express.Response) => {
    res.send(`<!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <script type="module" src="/public/rapidoc-min.js"></script>
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
      </head>
      <body>
        <rapi-doc id="thedoc" 
            spec-url="/swagger.json" 
            show-header="false" 
            allow-server-selection="false"
            schema-style="table"
            layout="row"
            bg-color="#f7f7f7"
            font-size="largest"
            text-color="" 
            nav-bg-color="#0a1e46" 
            nav-text-color="#a9b7d0" 
            nav-hover-bg-color="#333f54" 
            nav-hover-text-color="#fff" 
            nav-accent-color="#f87070" 
            primary-color="#213b6e"
            render-style="read" 
            theme="light">
        </rapi-doc>
      </body>
    </html>`)
});

app.use((
    req: express.Request,
    res: express.Response) => {
    res.status(404).json({ error: "NotFound", message: "This route doesn't exist" });
});
export default app;