describe("Happy path – create showdown & vote", () => {
  it("logs in, creates showdown, votes, views report", () => {
    cy.viewport("iphone-6");
    cy.visit("/");

    // Assume anon auth; skip login if not required
    cy.contains("Create").click();
    cy.url().should("include", "/create");

    cy.get("input[placeholder='Title']").type("Ice cream face‑off");
    cy.get("input[placeholder='Option A']").type("Vanilla");
    cy.get("input[placeholder='Option B']").type("Chocolate");
    cy.contains("Publish Showdown").click();

    cy.contains("Vote").click();
    cy.contains("Vanilla").click(); // vote

    cy.contains("Report").click();
    cy.url().should("include", "/report");
    cy.contains("Ice cream face‑off").should("exist");
  });
});
