import events from "@/services/events/events.service.js";

export default function (app) {
  app.configure(events);
}
