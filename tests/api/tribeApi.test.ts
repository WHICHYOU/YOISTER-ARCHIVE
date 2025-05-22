// tests/api/tribeApi.test.ts

describe("Tribe API", () => {
  it("creates and fetches a tribe", () => {
    cy.request("POST", "/api/tribe", {
      name: "Test Tribe",
      tags: ["test"],
    }).then((res) => {
      expect(res.status).to.eq(200);
    });

    cy.request("GET", "/api/tribe").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an("array");
    });
  });
});
