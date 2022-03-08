import events from "./events/events.service.js";

// eslint-disable-next-line no-unused-vars
export default function (app) {
  app.configure(events);
}
