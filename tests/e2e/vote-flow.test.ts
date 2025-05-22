// tests/e2e/vote-flow.test.ts

describe("Vote Flow", () => {
  it("loads showdowns and submits a vote", () => {
    cy.visit("/compare");
    cy.get("[data-testid='showdown-card']")
      .first()
      .within(() => {
        cy.contains("button", "A").click();
      });
    cy.url().should("include", "/compare");
  });
});
