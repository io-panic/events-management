import { Events } from "@/plugins/data/events";

class DataFunctions {
  // @TODO put that in a config file or somewhere more obvious
  #serviceUrl = "http://localhost:3030/events";
  #events = null;

  retrieveEvents(callback_success) {
    fetch(this.#serviceUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((dataJson) => {
        this.#events = Events.convertArrayOfDictToArrayOfObjects(dataJson.data);
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
    // @TODO remove that once implementation works
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: event.toJson()
    };

    fetch(this.#serviceUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
}

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
    // @TODO remove that once implementation works
    console.log(event.toJson());
  }
}

// @TODO find a better way to load Stub vs Real ... config file ?
export const dataFunctions = new DataFunctions();
