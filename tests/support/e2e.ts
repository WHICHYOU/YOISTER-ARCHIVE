{/*  tests/support/e2e.ts */}

Cypress.Commands.add("resetVotes", () => {
  cy.request("POST", "/api/debug/reset-votes");
});

declare global {
  namespace Cypress {
    interface Chainable {
      resetVotes(): Chainable<void>;
    }
  }
}

export {};
