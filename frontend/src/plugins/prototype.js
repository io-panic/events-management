class PrototypeFunctions {
  addFormatFunctionToStringObject() {
    String.prototype.format = function () {
      let a = this;
      for (let k in arguments) {
        a = a.replace("{" + k + "}", arguments[k]);
      }
      return a;
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
