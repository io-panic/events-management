import { ErrorCodes } from "@/plugins/constants";
import { UtilsFunctions } from "@/plugins/utils";

describe("UtilsFunctions", () => {
  test("Generate UUID", () => {
    let matchUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}(?:\/.*)?$/i;

    let uuid_1 = UtilsFunctions.generateUUID();
    let uuid_2 = UtilsFunctions.generateUUID();

    expect(uuid_1).not.toBe(uuid_2);
    expect(matchUUID.test(uuid_1)).toBeTruthy();
  });

  test("Convert UTC date to local date", () => {
    let localDate = new Date();
    let localDateString = UtilsFunctions.getLocalDate(localDate);

    expect(UtilsFunctions.getLocalDate(null)).toBeNull();
    expect(localDateString).not.toBe(localDate.toISOString());
  });

  test("Local date parameter must be a valid date", () => {
    expect(() => {
      UtilsFunctions.getLocalDate("random string");
    }).toThrow(ErrorCodes.DATE_START_IS_REQUIRED_DATE);
  });

  test("is Date String ISO8601 conform", () => {
    let dateString = new Date().toISOString();

    expect(UtilsFunctions.isDateISO8601(dateString)).toBeTruthy();
    expect(UtilsFunctions.isDateISO8601("...")).toBeFalsy();
    // @TODO tests for more cases...
  });
});
