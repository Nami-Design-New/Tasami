import { describe, expect, it } from "vitest";

import { registerSchema } from "./register-schema";

describe("registerSchema name validation", () => {
  const schema = registerSchema((key) => key);

  describe.each(["firstName", "middleName"])("%s", (fieldName) => {
    it("accepts Arabic letters", async () => {
      await expect(
        schema.validateAt(fieldName, { [fieldName]: "محمد" }),
      ).resolves.toBe("محمد");
    });

    it("accepts Arabic letters with diacritics", async () => {
      await expect(
        schema.validateAt(fieldName, { [fieldName]: "مُحَمَّد" }),
      ).resolves.toBe("مُحَمَّد");
    });

    it("continues to accept Latin letters and spaces", async () => {
      await expect(
        schema.validateAt(fieldName, { [fieldName]: "Mohamed Ali" }),
      ).resolves.toBe("Mohamed Ali");
    });

    it.each(["محمد123", "محمد@"])("rejects invalid name %s", async (name) => {
      await expect(
        schema.validateAt(fieldName, { [fieldName]: name }),
      ).rejects.toThrow();
    });
  });
});
