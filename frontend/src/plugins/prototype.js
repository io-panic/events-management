class PrototypeFunctions {
  EXCEPTION_ARGUMENT_INDEX_NOT_FOUND = "Argument index cannot be found: ";

  addFormatFunctionToStringObject() {
    const vm = this;

    String.prototype.format = function () {
      let stringToFormat = this;

      Object.keys(arguments).forEach((index) => {
        let value = arguments[index] == null ? "" : arguments[index];

        let replaceString = "{" + index + "}";
        if (stringToFormat.indexOf(replaceString) >= 0) {
          stringToFormat = stringToFormat.replace(replaceString, value);
        } else {
          throw vm.EXCEPTION_ARGUMENT_INDEX_NOT_FOUND + "(" + index + ")";
        }
      });

      return stringToFormat;
    };
  }

  addToISOStringFunctionToDateObject() {
    const caller = this;

    Date.prototype.toISOString = function () {
      return (
        this.getUTCFullYear() +
        "-" +
        caller._padZeroToNumber(this.getUTCMonth() + 1) +
        "-" +
        caller._padZeroToNumber(this.getUTCDate()) +
        "T" +
        caller._padZeroToNumber(this.getUTCHours()) +
        ":" +
        caller._padZeroToNumber(this.getUTCMinutes()) +
        ":" +
        caller._padZeroToNumber(this.getUTCSeconds()) +
        "." +
        String((this.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5) +
        "Z"
      );
    };
  }

  addToJSONFunctionToErrorObject() {
    if (!("toJSON" in Error.prototype)) {
      Object.defineProperty(Error.prototype, "toJSON", {
        value: function () {
          var alt = {};

          Object.getOwnPropertyNames(this).forEach(function (key) {
            alt[key] = this[key];
          }, this);

          return alt;
        },
        configurable: true,
        writable: true
      });
    }
  }

  _padZeroToNumber(numberValue) {
    let numberString = String(numberValue);
    return numberString.length === 1 ? "0" + numberString : numberString;
  }
}

export const prototypeFunctions = new PrototypeFunctions();
