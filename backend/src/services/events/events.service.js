import { Events } from "@/services/events/events.class.js";
import { before, after, error } from "@/services/events/events.hooks.js";

import createModel from "@/models/events.model.js";

export default function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  app.use("/events", new Events(options, app));
  const service = app.service("events");

  service.hooks({ before, after, error });
}
