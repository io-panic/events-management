import feathersError from "@feathersjs/errors";

const NAME_LENGTH_MIN = 4;
const NAME_LENGTH_MAX = 32;
const DESCRIPTION_LENGTH_MIN = 1;
const DESCRIPTION_LENGTH_MAX = 2048;

const setTimestamp = (name) => {
  return async (context) => {
    context.data[name] = new Date().toISOString();

    return context;
  };
};

const isMatchISO8601 = (name) => {
  return async (context) => {
    let value = (context.data[name] || "").trim();
    let matchPattern =
      value === "" ||
      /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i.test(
        value
      );

    if (!matchPattern) {
      throw new feathersError.BadRequest("Invalid field", {
        errors: { [name]: "Date must match ISO 8601 format" },
      });
    }

    return context;
  };
};

const fieldLengthMatch = (name, min, max) => {
  return async (context) => {
    let value = (context.data[name] || "").trim();
    if (value.length < min || value.length > max) {
      throw new feathersError.BadRequest("Length doesn't match", {
        errors: { [name]: "Length must be between " + min + " and " + max },
      });
    }

    return context;
  };
};

export const before = {
  all: [],
  find: [],
  get: [],
  create: [
    setTimestamp("createdAt"),
    isMatchISO8601("date_start"),
    isMatchISO8601("date_end"),
    fieldLengthMatch("name", NAME_LENGTH_MIN, NAME_LENGTH_MAX),
    fieldLengthMatch(
      "description",
      DESCRIPTION_LENGTH_MIN,
      DESCRIPTION_LENGTH_MAX
    ),
  ],
  update: [setTimestamp("updatedAt")],
  patch: [],
  remove: [],
};

export const after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: [],
};

export const error = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: [],
};
