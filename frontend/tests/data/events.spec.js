import { Events } from "@/plugins/data/events";

describe("Events", () => {
  test("An event is created with a random id", () => {
    const event = new Events({ name: "EventName1", description: "EventDescription1" });

    expect(event.name).toBe("EventName1");
    expect(event.description).toBe("EventDescription1");
  });

  test("An event is created with a specific id", () => {
    const event = new Events({
      id: "551d148d-0ad7-4b1e-a072-da9ba99ac3e5",
      name: "EventName1",
      description: "EventDescription1"
    });

    expect(event.id).toBe("551d148d-0ad7-4b1e-a072-da9ba99ac3e5");
    expect(event.name).toBe("EventName1");
    expect(event.description).toBe("EventDescription1");
  });
});
