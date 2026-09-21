import { Page, expect, Locator } from "@playwright/test";
import { ProductUtils } from '../../e2e/utils/products.util'


export enum Ordem {
    Crescente = 'crescente',
    Decrescente = 'decrescente',
}

export class ProductsPage {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clicarBotaoDeMenuPaginaDeProdutos() {
        const botaoDeMenu = this.page.locator('#react-burger-menu-btn');
        await botaoDeMenu.click();
    }
    async clicarCarrinhoPaginaDeProdutos() {
        const botaoDeCarrinho = this.page.locator('#shopping_cart_container');
        await botaoDeCarrinho.click();
        await expect(this.page).toHaveURL('/cart.html');
    }

    async clicarItemMenuAllItems() {
        const itemMenuAllItems = this.page.locator('#inventory_sidebar_link');
        await expect(itemMenuAllItems).toBeEnabled();
        await itemMenuAllItems.click();
        await expect(this.page).toHaveURL('/inventory.html');

    }

    async clicarItemMenuDynamicCatalog() {
        const itemMenuDynamicCatalog = this.page.locator('#dynamic_catalog_sidebar_link');
        await expect(itemMenuDynamicCatalog).toBeEnabled();
        await itemMenuDynamicCatalog.click();

        const subMenuDynamicCatalog = this.page.locator('#dynamic_catalog_submenu');
        await expect(subMenuDynamicCatalog).toBeVisible();
    }

    async clicarItemMenuAbout() {
        const itemMenuAbout = this.page.locator('#about_sidebar_link');
        await expect(itemMenuAbout).toBeEnabled();
        await itemMenuAbout.click();
        await expect(this.page).toHaveURL('https://saucelabs.com/');
    }

    async clicarItemMenuLogout() {
        const itemMenuLogout = this.page.locator('#logout_sidebar_link');
        await expect(itemMenuLogout).toBeEnabled();
        await itemMenuLogout.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com');
    }

    async selecionarOrdenadorDeProdutos(valueOpition: string): Promise<Locator> {
        const ordernadorDeProdutos = this.page.locator('select[data-test="product-sort-container"]');
        await expect(ordernadorDeProdutos).toBeVisible();
        await ordernadorDeProdutos.selectOption(valueOpition);
        return ordernadorDeProdutos
    }


    async validarTituloDaPaginaDeProdutos() {
        const tituloDaPagina = this.page.locator("div[data-test='primary-header'] div[class='app_logo']");

        await expect(tituloDaPagina).toBeVisible();
        await expect(tituloDaPagina).toHaveText('Swag Labs');
    }

    async validarBotaoDeMenuPaginaDeProdutos() {
        const botaoDeMenu = this.page.locator('#react-burger-menu-btn');
        await expect(botaoDeMenu).toBeVisible();
    }

    async validarItensDoMenuPaginaDeProdutos() {
        const todosOsItensDoMenu = this.page.locator('.bm-item-list a');
        await expect(todosOsItensDoMenu).toHaveCount(5);

        const nomeDosItensDoMenuEsperado = ['All Items', 'Dynamic Catalog', 'Logout', 'Reset App State', 'About'];

        for (let item of await todosOsItensDoMenu.allTextContents()) {
            expect(nomeDosItensDoMenuEsperado).toContain(item);
        }

    }

    async validarItemMenuDeProdutosLogout() {
        const itemMenuLogout = this.page.locator('#logout_sidebar_link');
        await expect(itemMenuLogout).toBeVisible();
        await expect(itemMenuLogout).toHaveText('Logout');

        await itemMenuLogout.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com');
    }

    async validarItemMenuDeProdutosResetAppState() {
        const itemMenuResetAppState = this.page.locator('#reset_sidebar_link');
        await expect(itemMenuResetAppState).toBeVisible();
        await expect(itemMenuResetAppState).toHaveText('Reset App State');
    }

    async validarItemMenuDeProdutosAbout() {
        const itemMenuAbout = this.page.locator('#about_sidebar_link');
        await expect(itemMenuAbout).toBeVisible();
        await expect(itemMenuAbout).toHaveText('About');

        await itemMenuAbout.click();
        await expect(this.page).toHaveURL('https://saucelabs.com');
    }



    async validarBotaoDeCarrinhoPaginaDeProdutos() {
        const botaoDeCarrinho = this.page.locator('#shopping_cart_container');
        await expect(botaoDeCarrinho).toBeVisible();
    }

    async validarOrdenadorDeProdutosPorNomeCrescentePaginaDeProdutos(ordem: Ordem) {
        const ordenadorDeProdutos = await this.selecionarOrdenadorDeProdutos('az')

        const opcoesDoOrdenador = ordenadorDeProdutos.locator('option:first-child');
        await expect(opcoesDoOrdenador).toHaveText('Name (A to Z)');

        const elementosDosProdutos = this.page.locator('.inventory_item_name');
        await this.verificarOrdenacaoDeProdutosPorNome(elementosDosProdutos, ordem);
    }

    async validarOrdenadorDeProdutosPorNomeDecrecentePaginaDeProdutos(ordem: Ordem) {
        const ordenadorDeProdutos = await this.selecionarOrdenadorDeProdutos('za')
        await expect(ordenadorDeProdutos).toBeVisible();

        const opcoesDoOrdenador = ordenadorDeProdutos.locator('option:nth-child(2)');
        await expect(opcoesDoOrdenador).toHaveText('Name (Z to A)');

        const elementosDosProdutos = this.page.locator('.inventory_item_name');
        await this.verificarOrdenacaoDeProdutosPorNome(elementosDosProdutos, ordem);
    }

    async validarOrdenadorDeProdutosPorPrecoCrescentePaginaDeProdutos(ordem: Ordem) {
        const ordenadorDeProdutos = await this.selecionarOrdenadorDeProdutos('lohi')
        await expect(ordenadorDeProdutos).toBeVisible();

        const opcoesDoOrdenador = ordenadorDeProdutos.locator('option:nth-child(3)');
        await expect(opcoesDoOrdenador).toHaveText('Price (low to high)');

        const elementosDosProdutos = this.page.locator('.inventory_item_price');
        await this.verificarOrdenacaoDeProdutosPorPreco(elementosDosProdutos, ordem);
    }

      async validarOrdenadorDeProdutosPorPrecoDecrescentePaginaDeProdutos(ordem: Ordem) {
        const ordenadorDeProdutos = await this.selecionarOrdenadorDeProdutos('hilo')
        await expect(ordenadorDeProdutos).toBeVisible();

        const opcoesDoOrdenador = ordenadorDeProdutos.locator('option:nth-child(4)');
        await expect(opcoesDoOrdenador).toHaveText('Price (high to low)');

        const elementosDosProdutos = this.page.locator('.inventory_item_price');
        await this.verificarOrdenacaoDeProdutosPorPreco(elementosDosProdutos, ordem);
    }

    private async verificarOrdenacaoDeProdutosPorNome(elemento: Locator, ordem: Ordem) {

        const valoresObtidos = await elemento.allTextContents();

        if (ordem === Ordem.Decrescente) {
            const nomesDosProdutosOdemInversa = [...valoresObtidos].sort((a, b) => b.localeCompare(a));
            expect(valoresObtidos).toEqual(nomesDosProdutosOdemInversa);

        } else {
            const nomesDosProdutosOrdenados = [...valoresObtidos].sort((a, b) => a.localeCompare(b));
            expect(valoresObtidos).toEqual(nomesDosProdutosOrdenados);
        }
    }

    private async verificarOrdenacaoDeProdutosPorPreco(elemento: Locator, ordem: Ordem) {
        const precosText = await elemento.allTextContents();

        const precos = ProductUtils.convertPrecosStringToDecimal(precosText);

        const precosOrdenados = [...precos].sort((a, b) => {
            return ordem === Ordem.Crescente ? a - b : b - a;
        })

        expect(precos).toEqual(precosOrdenados);

    }


}
