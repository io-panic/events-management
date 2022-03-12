import { DataFunctions } from "@/plugins/data/data.impl";

const JSON_EVENTS_URL = "/test/events.json";

export class DataFunctionsStub extends DataFunctions {
  getServiceUrl() {
    return JSON_EVENTS_URL;
  }
}
