const assert = require("assert");
const isRequestAjaxOrApi = require("../utils/isRequestAjaxOrApi");

describe("utils - isRequestAjaxOrApi", () => {
  describe("when request accepts html and is not an XMLHttpRequest", () => {
    it("should return false", () => {
      const request = {
        accepts: () => true,
        xhr: false
      };
      const result = isRequestAjaxOrApi(request);
      const expected = false;
      assert.strictEqual(result, expected);
    });
  });

  describe("when request doesn't accept html and is not an XMLHttpRequest", () => {
    it("should return true", () => {
      const request = {
        accepts: () => false,
        xhr: false
      };
      const result = isRequestAjaxOrApi(request);
      const expected = true;
      assert.strictEqual(result, expected);
    });
  });

  describe("when request accepts html and is an XMLHttpRequest", () => {
    it("should return true", () => {
      const request = {
        accepts: () => true,
        xhr: true
      };
      const result = isRequestAjaxOrApi(request);
      const expected = true;
      assert.strictEqual(result, expected);
    });
  });
});
