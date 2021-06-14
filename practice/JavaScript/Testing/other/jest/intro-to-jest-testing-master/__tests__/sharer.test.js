const { shareDocumentWithStudents } = require("../sharer.js");

const mockLiqpayApi = jest
  .fn()
  .mockImplementation((_, __, resolve) => resolve({ data: [] }));

jest.mock("../liqpay.js", () =>
  jest.fn().mockImplementation(function mockLiqPay() {
    this.api = mockLiqpayApi;
  })
);

const mockGoogleDrivePermissionsList = jest.fn().mockResolvedValue({
  data: { permissions: [] },
});

const mockGoogleDrivePermissionsCreate = jest.fn();

jest.mock("googleapis", () => ({
  google: {
    auth: {
      JWT: jest.fn().mockImplementation(function mockJWT() {
        this.authorize = jest.fn();
        this.credentials = { access_token: "" };
      }),
    },
    drive: jest.fn().mockImplementation(() => ({
      permissions: {
        list: mockGoogleDrivePermissionsList,
        create: mockGoogleDrivePermissionsCreate,
      },
    })),
  },
}));

describe("Sharer", () => {
  const FAKE_FILE_ID = "FAKE_FILE_ID";
  const EXPECTED_DESCRIPTION = "Мастер-класс по Unit-тестированию JS";

  it("works", async () => {});

  describe("when person paid but is not in enrolled list", () => {
    const EMAIL = "some@email";

    beforeEach(() => {
      mockLiqpayApi.mockImplementation((_, __, resolve) =>
        resolve({
          data: [
            {
              description: EXPECTED_DESCRIPTION,
              order_id: `${EMAIL} /// Something`,
              status: "success",
            },
          ],
        })
      );

      mockGoogleDrivePermissionsList.mockResolvedValue({
        data: { permissions: [{ emailAddress: "some_other@email" }] },
      });
    });

    it("requests commenter access from google drive", async () => {
      await shareDocumentWithStudents(FAKE_FILE_ID);
      expect(mockGoogleDrivePermissionsCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          fileId: FAKE_FILE_ID,
          emailAddress: EMAIL,
          resource: expect.objectContaining({
            emailAddress: EMAIL,
            type: "user",
            role: "commenter",
          }),
        })
      );
    });

    it("writes to console.log on success sharing", async () => {
      const consoleLogSpy = jest.spyOn(console, "log");

      await shareDocumentWithStudents(FAKE_FILE_ID);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining(EMAIL)
      );
    });

    it("throws an error if sharing fails", async () => {
      mockGoogleDrivePermissionsCreate.mockRejectedValue(
        new Error("Unknown error")
      );

      expect(shareDocumentWithStudents(FAKE_FILE_ID)).rejects.toBeInstanceOf(
        Error
      );
    });

    it("does not reports email if sharing fails", async () => {
      const consoleLogSpy = jest.spyOn(console, "log");
      mockGoogleDrivePermissionsCreate.mockRejectedValue(
        new Error("Unknown error")
      );

      await shareDocumentWithStudents(FAKE_FILE_ID).catch(() => {});

      expect(consoleLogSpy).not.toHaveBeenCalledWith(
        expect.stringContaining(EMAIL)
      );
    });
  });

  describe("when person paid and is in enrolled list", () => {
    const EMAIL = "some@email";

    beforeEach(() => {
      mockLiqpayApi.mockImplementation((_, __, resolve) =>
        resolve({
          data: [
            {
              description: EXPECTED_DESCRIPTION,
              order_id: `${EMAIL} /// Something`,
              status: "success",
            },
          ],
        })
      );

      mockGoogleDrivePermissionsList.mockResolvedValue({
        data: { permissions: [{ emailAddress: EMAIL }] },
      });
    });

    it("does not attempts to share with this email", async () => {
      await shareDocumentWithStudents(FAKE_FILE_ID);
    });

    it("does not reports email if sharing fails", async () => {
      const consoleLogSpy = jest.spyOn(console, "log");
      mockGoogleDrivePermissionsCreate.mockRejectedValue(
        new Error("Unknown error")
      );

      await shareDocumentWithStudents(FAKE_FILE_ID).catch(() => {});

      expect(mockGoogleDrivePermissionsCreate).not.toHaveBeenCalledWith(
        expect.objectContaining({
          emailAddress: EMAIL,
        })
      );
    });
  });
});
