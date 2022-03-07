import { Events } from "@/plugins/data/events";
import { ErrorCodes } from "@/plugins/constants";

describe("Events", () => {
  test("An event is created with a random id", () => {
    const event = new Events({
      name: "EventName1",
      description: "EventDescription1",
      date_start: new Date().toISOString()
    });

    expect(event.name).toBe("EventName1");
    expect(event.description).toBe("EventDescription1");
  });

  test("An event is created with a specific id", () => {
    const event = new Events({
      _id: "551d148d-0ad7-4b1e-a072-da9ba99ac3e5",
      name: "EventName1",
      description: "EventDescription1",
      date_start: new Date().toISOString()
    });

    expect(event.id).toBe("551d148d-0ad7-4b1e-a072-da9ba99ac3e5");
    expect(event.name).toBe("EventName1");
    expect(event.description).toBe("EventDescription1");
  });

  test("An event must contain a date_start", () => {
    expect(() => {
      new Events({
        _id: "551d148d-0ad7-4b1e-a072-da9ba99ac3e5",
        name: "EventName1",
        description: "EventDescription1"
      });
    }).toThrow(ErrorCodes.DATE_START_IS_REQUIRED_DATE);
  });

  test("An event must contain a date_start of type string", () => {
    expect(() => {
      new Events({
        _id: "551d148d-0ad7-4b1e-a072-da9ba99ac3e5",
        name: "EventName1",
        description: "EventDescription1",
        date_start: new Date()
      });
    }).toThrow(ErrorCodes.DATE_START_IS_REQUIRED_DATE);
  });
});
