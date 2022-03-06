import { UtilsFunctions } from "@/plugins/utils";
import useVuelidate from "@vuelidate/core";

describe("UtilsFunctions", () => {
  test("Generate UUID", () => {
    let matchUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}(?:\/.*)?$/i;

    let uuid_1 = UtilsFunctions.generateUUID();
    let uuid_2 = UtilsFunctions.generateUUID();

    expect(uuid_1).not.toBe(uuid_2);
    expect(matchUUID.test(uuid_1)).toBeTruthy();
  });
});
