// tests/api/showdownApi.test.ts

describe("Showdown API", () => {
  it("should return a list of showdowns", () => {
    cy.request("GET", "/api/showdown").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an("array");
    });
  });
});
