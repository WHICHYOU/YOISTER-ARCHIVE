// tests/smoke/basic.test.ts

describe("Basic Smoke Test", () => {
  it("loads homepage", () => {
    cy.visit("/");
    cy.contains("Showdown").should("exist");
  });

  it("navigates to dashboard", () => {
    cy.visit("/dashboard/profile");
    cy.contains("Profile").should("exist");
  });
});
