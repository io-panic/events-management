import { ErrorCodes } from "@/plugins/constants";
import { UtilsFunctions } from "@/plugins/utils.js";

export class Events {
  #id = null;
  #name = "";
  #description = "";
  #date_start = null;
  #date_end = null;

  constructor({ _id = UtilsFunctions.generateUUID(), name, description, date_start, date_end }) {
    if (!UtilsFunctions.isDateISO8601(date_start)) {
      throw ErrorCodes.DATE_START_IS_REQUIRED_DATE;
    }

    this.#id = _id;
    this.#name = name;
    this.#description = description;
    this.#date_start = new Date(date_start).toISOString();
    this.#date_end = date_end == null ? null : new Date(date_end).toISOString();
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

  toJson() {
    return JSON.stringify({
      _id: this.#id,
      name: this.#name,
      description: this.#description,
      date_start: this.#date_start,
      date_end: this.#date_end
    });
  }

  static convertArrayOfDictToArrayOfObjects(array) {
    let events = [];

    for (let index in array) {
      events[events.length] = new Events(array[index]);
    }

    return events;
  }
}
