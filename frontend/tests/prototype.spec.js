import { prototypeFunctions } from "@/plugins/prototype";

describe("PrototypeFunctions", () => {
  test("addFormatFunctionToStringObject", () => {
    prototypeFunctions.addFormatFunctionToStringObject();

    let undefVariable;

    expect("L- {0}".format(undefVariable)).toBe("L- ");
    expect("L- {0}".format(null)).toBe("L- ");
    expect("L- {0}".format(1)).toBe("L- 1");
    expect("L- {0} - {1}".format("1234", "t -- end")).toBe("L- 1234 - t -- end");
    expect(() => {
      "L- {0}".format(1, 2);
    }).toThrow(prototypeFunctions.EXCEPTION_ARGUMENT_INDEX_NOT_FOUND + "(1)");
  });

  test("addToISOStringFunctionToDateObject", () => {
    prototypeFunctions.addToISOStringFunctionToDateObject();
    let dateObject = new Date("2021-02-23T10:05:54.043+05:00");
    expect(dateObject.toISOString()).toBe("2021-02-23T05:05:54.043Z");
  });

  test("addToJSONFunctionToErrorObject", () => {
    const errorMessage = "Test error object for toJSON method";

    prototypeFunctions.addToJSONFunctionToErrorObject();
    let testError = new Error(errorMessage);
    let jsonError = testError.toJSON();

    expect(jsonError.message).toBe(errorMessage);
  });
});
