import { UtilsFunctions } from "@/plugins/utils.js";

export class Events {
  #id = null;
  #name = "";
  #description = "";
  #date_start = null;
  #date_end = null;

  constructor({ id = UtilsFunctions.generateUUID(), name, description, date_start, date_end }) {
    this.#id = id;
    this.#name = name;
    this.#description = description;
    this.#date_start = date_start;
    this.#date_end = date_end;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get description() {
    return this.#description;
  }

  get dateStart() {
    return this.#date_start;
  }

  get dateEnd() {
    return this.#date_end;
  }

  static convertArrayOfDictToArrayOfObjects(array) {
    let events = [];

    for (let index in array) {
      events[events.length] = new Events(array[index]);
    }

    return events;
  }
}
