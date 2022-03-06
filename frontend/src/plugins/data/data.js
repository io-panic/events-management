import { Events } from "@/plugins/data/events";

class DataFunctionsStub {
  #events = null;

  retrieveEvents(callback_success) {
    fetch("/test/events.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((dataJson) => {
        this.#events = Events.convertArrayOfDictToArrayOfObjects(dataJson);
        callback_success(this.#events);
      })
      .catch(function (error) {
        // @TODO -- erk - find a better way to deal with errors
        console.log(error);
      });
  }

  addEvent(event) {
    // @TODO should convert objects to JSON using private fields
    // @TODO error management ... (per field, message, ...)
    let jsonEvent = {
      id: event.id,
      name: event.name,
      description: event.description,
      date_start: event.dateStart,
      date_end: event.dateEnd
    };

    // @TODO remove that once implementation works
    console.log(jsonEvent);
  }
}

export const dataFunctions = new DataFunctionsStub();
