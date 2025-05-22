// tests/api/evolutionApi.test.ts

describe("Evolution API", () => {
  it("retrieves evolution for a user", () => {
    cy.request("GET", "/api/evolution?userId=test-user").then((res) => {
      expect(res.status).to.eq(200);
    });
  });
});
