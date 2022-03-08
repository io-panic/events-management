// Initializes the `events` service on path `/events`
import { Events } from "./events.class.js";
import createModel from "../../models/events.model.js";
import { before, after, error } from "./events.hooks.js";

export default function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/events", new Events(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("events");

  service.hooks({ before, after, error });
}
