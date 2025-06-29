/// <reference types="cypress" />

// Variáveis globais para nome e email aleatórios
let randomName;
let randomEmail;
const password = "SenhaForte123";

// Gera nome e email aleatórios antes de todos os testes
before(() => {
  const randomSuffix = Math.floor(Math.random() * 100000);
  randomName = `Usuário Teste ${randomSuffix}`;
  randomEmail = `usuario.teste${randomSuffix}@exemplo.com`;
});

describe("Teste se backend está online", () => {
  it("Consegue buscar mentores no backend", () => {
    cy.visit("/buscar?search=Frontend");
    cy.contains("Ver perfil completo", {matchCase: false}).should("exist");
  });
});

// Teste: Cadastro de Usuário
describe("Cadastro de Usuário", () => {
  it("Usuário realiza cadastro com sucesso", () => {
    cy.visit("/cadastro");
    cy.get("#name").type(randomName);
    cy.get("#email").type(randomEmail);
    cy.get("#senha").type(password);
    cy.get("button").contains("Registrar").click();
    cy.contains("sucesso", { matchCase: false });
    cy.url().should("include", "/login");
  });
});

// Teste: Login de Usuário
describe("Login de Usuário", () => {
  it("Usuário realiza login com sucesso", () => {
    cy.visit("/login");
    cy.get('input[name="email"]').type(randomEmail);
    cy.get('input[name="password"]').type(password);
    cy.get("button").contains("Logar").click();
    cy.contains("sucesso", { matchCase: false });
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});

// Teste: Cadastro de Usuário como Mentor
describe("Cadastro de Usuário como Mentor", () => {
  before(() => {
    // Realiza login antes do cadastro de mentor
    cy.visit("/login");
    cy.get('input[name="email"]').type(randomEmail);
    cy.get('input[name="password"]').type(password);
    cy.get("button").contains("Logar").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
  it("Usuário cadastra-se como mentor com sucesso", () => {
    cy.visit("/cadastro_mentor");
    cy.get('input[name="preco"]').type("100");
    cy.get('input[name="minutos"]').type("30");
    cy.get('input[name="quantidade"]').type("5");
    cy.get('textarea[name="biografia"]').type(
      "Biografia de teste para mentor."
    );
    cy.get('textarea[name="curriculo"]').type(
      "Currículo de teste para mentor."
    );
    cy.get("button").contains("Cadastrar").click();
    cy.contains("sucesso", { matchCase: false });
    cy.url().should("include", "/buscar");
  });
});

describe("Mentor cadastrado consegue ser buscado", () => {
    it("Consegue buscar mentor recém cadastrado", () => {
        cy.visit("/buscar");
        cy.contains(randomName)
    })
})
