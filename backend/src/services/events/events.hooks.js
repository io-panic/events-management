import feathersError from "@feathersjs/errors";

export class EVENTS_FIELD_CONSTRAINTS {
  static NAME_LENGTH_MIN = 4;
  static NAME_LENGTH_MAX = 32;
  static DESCRIPTION_LENGTH_MIN = 1;
  static DESCRIPTION_LENGTH_MAX = 2048;
}

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
    if (value.length < min || value.length >= max) {
      throw new feathersError.BadRequest("Length doesn't match", {
        errors: { [name]: "Length must be between " + min + " and " + max },
      });
    }

    return context;
  };
};

const isDateEndBeforeDateStart = () => {
  return async (context) => {
    let dateStart = (context.data["date_start"] || "").trim();
    let dateEnd = (context.data["date_end"] || "").trim();

    if (dateEnd != "" && dateEnd < dateStart) {
      throw new feathersError.BadRequest(
        "End date value is before start date",
        {
          errors: {
            ["date_end"]: "End date must be after start date " + dateStart,
          },
        }
      );
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
    fieldLengthMatch(
      "name",
      EVENTS_FIELD_CONSTRAINTS.NAME_LENGTH_MIN,
      EVENTS_FIELD_CONSTRAINTS.NAME_LENGTH_MAX
    ),
    fieldLengthMatch(
      "description",
      EVENTS_FIELD_CONSTRAINTS.DESCRIPTION_LENGTH_MIN,
      EVENTS_FIELD_CONSTRAINTS.DESCRIPTION_LENGTH_MAX
    ),
    isDateEndBeforeDateStart(),
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
