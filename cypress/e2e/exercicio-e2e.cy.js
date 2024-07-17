/// <reference types="cypress" />
import produtosPage from "../support/page_objects/produtos.page.js";

context("Exercicio - Testes End-to-end - Fluxo de pedido", () => {
  /*  Como cliente
      Quero acessar a Loja EBAC
      Para fazer um pedido de 4 produtos
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
    produtosPage.visitarURL();
  });

  it("Deve fazer um pedido na loja Ebac Shop de ponta a ponta", () => {
    cy.get(
      ".topbar-inner > :nth-child(1) > .list-inline > :nth-child(2) > a"
    ).click();
    cy.fixture("perfil").then((dados) => {
      cy.login(dados.usuario, dados.senha);
    });

    //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações
    cy.fixture("produtos").then((dados) => {
      for (let i = 0; i < 4; i++) {
        produtosPage.buscarProduto(dados[i].nomeProduto);
        produtosPage.adicionarAoCarrinho(
          dados[i].tamanho,
          dados[i].cor,
          dados[i].quantidade
        );
      }
    });
    cy.get(".woocommerce-message > .button").click();
    cy.get(".checkout-button").click();
    cy.get("#terms").check();
    cy.get("#place_order").click();
    cy.wait(6000);
    cy.get(".woocommerce-notice").should(
      "contain",
      "Obrigado. Seu pedido foi recebido."
    );
  });
});
