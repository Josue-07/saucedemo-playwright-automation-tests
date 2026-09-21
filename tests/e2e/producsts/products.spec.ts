import { test } from "@playwright/test";
import { LoginPage } from "../../support/pages/login.page";
import { Ordem, ProductsPage } from "../../support/pages/products.page";

let productsPage: ProductsPage;


test.beforeEach(async ({ page }) => {
    const loginPage: LoginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    await loginPage.acessarPaginaLogin();
    await loginPage.realizarLoginComSucesso();
})

test.describe('Página de Produtos', { tag: '@produtos' }, () => {
    test('CT001 - Validar título da página de produtos', {
        tag: ['@CT001', '@regressivo', '@positivo']
    }, async () => {
        await productsPage.validarTituloDaPaginaDeProdutos();
    })

    test('CT002 - Validar botão de menu da página de produtos', {
        tag: ['@CT002', '@regressivo', '@positivo']
    }, async () => {
        await productsPage.validarBotaoDeMenuPaginaDeProdutos();
    })

    test('CT003 - Validar itens do menu da página de produtos', {
        tag: ['@CT003', '@regressivo', '@positivo']
    }, async () => {
        await productsPage.clicarBotaoDeMenuPaginaDeProdutos();
        await productsPage.validarItensDoMenuPaginaDeProdutos();
    })

    test('CT004 - Validar menu de All Items', {
        tag: ['@CT004', '@regressivo', '@positivo']
    }, async () => {
        await productsPage.clicarBotaoDeMenuPaginaDeProdutos();
        await productsPage.clicarItemMenuAllItems();
    })

    test('CT005 - Validar menu de Dynamic Catalog', {
        tag: ['@CT005', '@regressivo', '@positivo']
    }, async () => {
        await productsPage.clicarBotaoDeMenuPaginaDeProdutos();
        await productsPage.clicarItemMenuDynamicCatalog();
    })

    test('CT006 - Validar menu de About', {
        tag: ['@CT006', '@regressivo', '@positivo']
    }, async () => {
        await productsPage.clicarBotaoDeMenuPaginaDeProdutos();
        await productsPage.clicarItemMenuAbout();
    })

    test('CT007 - Validar menu de Logout', {
        tag: ['@CT007', '@regressivo', '@positivo']
    }, async () => {
        await productsPage.clicarBotaoDeMenuPaginaDeProdutos();
        await productsPage.clicarItemMenuLogout();
    })

    test('CT008 - Validar botão de carrinho da página de produtos', {
        tag: ['@CT008', '@regressivo', '@positivo']
    }, async () => {
        await productsPage.validarBotaoDeCarrinhoPaginaDeProdutos();
    })

    test('CT009 - Validar redirecionamento para a pagina de carrinho', {
        tag: ['@CT009', '@regressivo', '@positivo']
    }, async () => {
        await productsPage.clicarCarrinhoPaginaDeProdutos();
    })

    test('CT010 - Validar ordenação de produtos por nome na ordem crescete', {
        tag: ['@CT010', '@regressivo', '@positivo']
    }, async () => {
        await productsPage.validarOrdenadorDeProdutosPorNomeCrescentePaginaDeProdutos(Ordem.Crescente)

    })

    test('CT011 - Validar ordenação de produtos por nome na ordem decrescente', {
        tag: ['@CT011', '@regressivo', '@positivo']
    }, async () => {
        await productsPage.validarOrdenadorDeProdutosPorNomeDecrecentePaginaDeProdutos(Ordem.Decrescente)
    })

    test('CT012 - Validar ordenação de produtos por preco na ordem crescente', {
        tag: ['@CT012', '@regressivo', '@positivo']
    }, async () => {
        await productsPage.validarOrdenadorDeProdutosPorPrecoCrescentePaginaDeProdutos(Ordem.Crescente)
    })

      test('CT013 - Validar ordenação de produtos por preco na ordem decrescente', {
        tag: ['@CT013', '@regressivo', '@positivo']
    }, async () => {
        await productsPage.validarOrdenadorDeProdutosPorPrecoDecrescentePaginaDeProdutos(Ordem.Decrescente)
    })
})  