import { ErrorCodes } from "@/plugins/constants";

export class UtilsFunctions {
  static isDevelopmentEnvironment() {
    let currentEnvironment = import.meta.env.MODE;
    return currentEnvironment === "development";
  }

  // public domain MIT
  static generateUUID() {
    let d = new Date().getTime();
    let d2 = (typeof performance !== "undefined" && performance.now && performance.now() * 1000) || 0;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      let r = Math.random() * 16;
      if (d > 0) {
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }

      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  static fetchJson({ url, options, timeoutAfterMs = 3000 }) {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => controller.abort(), timeoutAfterMs);

    options = options == null ? {} : options;
    Object.assign(options, { signal: controller.signal });

    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            reject(new Error("HTTP error " + response.status));
          }
        })
        .then((dataJson) => {
          clearTimeout(timeoutId);
          resolve(dataJson.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  static isStringDateISO8601(dateString) {
    return /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i.test(dateString);
  }

  static getFormattedDate(stringDate) {
    return "{0}T{1}".format(stringDate.substring(0, 10), stringDate.substring(11, 16));
  }

  static getLocalDate(dateValue) {
    if (dateValue == null) {
      return null;
    }

    if (!(dateValue instanceof Date)) {
      throw ErrorCodes.DATE_START_IS_REQUIRED_DATE;
    }

    let offsetZone = dateValue.getTimezoneOffset() * 60 * 1000;
    let localDateTime = dateValue - offsetZone;

    return new Date(localDateTime).toISOString();
  }

  static async sleep(ms) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }

  static sleepFor(sleepDuration) {
    var now = new Date().getTime();
    while (new Date().getTime() < now + sleepDuration) {
      // waiting...
    }
  }
}
