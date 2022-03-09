import { join } from "path";
import favicon from "serve-favicon";
import compress from "compression";
import helmet from "helmet";
import cors from "cors";
import logger from "@/logger.js";

import feathers from "@feathersjs/feathers";
import configuration from "@feathersjs/configuration";
import express from "@feathersjs/express";

import middleware from "@/middleware/index.js";
import services from "@/services/index.js";
import { before, after, error } from "@/app.hooks.js";
import channels from "@/channels.js";

const app = express(feathers());

app.configure(configuration());

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(join(app.get("public"), "favicon.ico")));

app.use("/", express.static(app.get("public")));

app.configure(express.rest());
app.configure(middleware);
app.configure(services);
app.configure(channels);

app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks({ before, after, error });

export default app;
