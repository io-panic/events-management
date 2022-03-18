import feathersError from "@feathersjs/errors";
import app from "@/app.js";

import { EVENTS_FIELD_CONSTRAINTS } from "@/services/events/events.hooks";

describe("'events' service", () => {
  it("registered the service", () => {
    const service = app.service("events");
    expect(service).toBeTruthy();
  });

  it("creates an event", async () => {
    const event = await app.service("events").create({
      _id: "630a76bc-e602-4958-9700-5b556bc5dd1a",
      name: "name #1",
      description: "description #1",
      date_start: "2022-03-06T20:45:27.745Z",
    });

    expect(event.name).toBe("name #1");
    expect(event.description).toBe("description #1");
    expect(event.date_start).toBe("2022-03-06T20:45:27.745Z");
  });

  it("creates an event with invalid date end", async () => {
    try {
      const event = await app.service("events").create({
        _id: "630a76bc-e602-4958-9700-5b556bc5dd1a",
        name: "name #1",
        description: "description #1",
        date_start: "2022-03-06T20:45:27.745Z",
        date_end: "2022-03-06T20:45:26.745Z",
      });

      expect(false).toBeTruthy();
    } catch (error) {
      expect(error instanceof feathersError.BadRequest).toBeTruthy();
    }
  });

  it("creates an invalid name event (min length)", async () => {
    try {
      let minFieldLength = EVENTS_FIELD_CONSTRAINTS.NAME_LENGTH_MIN - 1;
      let eventName = Array(minFieldLength).join("x");

      await app.service("events").create({
        _id: "630a76bc-e602-4958-9700-5b556bc5dd1b",
        name: eventName,
        description: "description #1",
        date_start: "2022-03-06T20:45:27.745Z",
      });

      expect(false).toBeTruthy();
    } catch (error) {
      expect(error instanceof feathersError.BadRequest).toBeTruthy();
    }
  });

  it("creates an invalid name event (max length)", async () => {
    try {
      let maxFieldLength = EVENTS_FIELD_CONSTRAINTS.NAME_LENGTH_MAX + 1;
      let eventName = Array(maxFieldLength).join("x");

      await app.service("events").create({
        _id: "630a76bc-e602-4958-9700-5b556bc5dd1c",
        name: eventName,
        description: "description #1",
        date_start: "2022-03-06T20:45:27.745Z",
      });

      expect(false).toBeTruthy();
    } catch (error) {
      expect(error instanceof feathersError.BadRequest).toBeTruthy();
    }
  });

  it("creates an invalid description event (min length)", async () => {
    try {
      let minFieldLength = EVENTS_FIELD_CONSTRAINTS.DESCRIPTION_LENGTH_MIN - 1;
      let description = Array(minFieldLength).join("x");

      await app.service("events").create({
        _id: "630a76bc-e602-4958-9700-5b556bc5dd1d",
        name: "Name #1",
        description: description,
        date_start: "2022-03-06T20:45:27.745Z",
      });

      expect(false).toBeTruthy();
    } catch (error) {
      expect(error instanceof feathersError.BadRequest).toBeTruthy();
    }
  });

  it("creates an invalid description event (max length)", async () => {
    try {
      let minFieldLength = EVENTS_FIELD_CONSTRAINTS.DESCRIPTION_LENGTH_MAX + 1;
      let description = Array(minFieldLength).join("x");

      await app.service("events").create({
        _id: "630a76bc-e602-4958-9700-5b556bc5dd1e",
        name: "Name #1",
        description: description,
        date_start: "2022-03-06T20:45:27.745Z",
      });

      expect(false).toBeTruthy();
    } catch (error) {
      expect(error instanceof feathersError.BadRequest).toBeTruthy();
    }
  });
});
