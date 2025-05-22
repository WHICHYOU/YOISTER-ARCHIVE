// tests/api/voteApi.test.ts

describe("Vote API", () => {
  it("should accept a vote POST", () => {
    cy.request("POST", "/api/vote", {
      choice: "A",
      showdown: { optionA: "Option A", optionB: "Option B" },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.success).to.be.true;
    });
  });
});
