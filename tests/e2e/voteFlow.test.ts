// End-to-end test for voting flow
describe("Voting flow", () => {
  it("should allow a user to vote and see results", () => {
    cy.visit("/compare");
    cy.contains("Vote for Apple").click();
    cy.contains("Your vote has been recorded").should("be.visible");
  });
});
