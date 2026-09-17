import { Page, expect } from "@playwright/test";
import { LoginFormModel } from "../fixtures/login-model/login-form.model";    

export class LoginPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async acessarPaginaLogin() {
        await this.page.goto('/');
    }

    async preencherFormularioDeLogin(formLogin: LoginFormModel) {
        await this.page.fill('#user-name', formLogin.username);
        await this.page.fill('#password', formLogin.password);
        await this.page.click('#login-button');
    }

    async validarLoginComSucesso() {
        await expect(this.page).toHaveURL('/inventory.html');
    }

    async validarMensagemDeErroCredenciaisInvalidas() {
        const mensagemDeErro = this.page.locator('[data-test="error"]');
        await expect(mensagemDeErro).toHaveText('Epic sadface: Username and password do not match any user in this service');
    }

    async validarMensagemDeErroUsernameVazio() {
        const mensagemDeErro = this.page.locator('[data-test="error"]');
        await expect(mensagemDeErro).toHaveText('Epic sadface: Username is required');
    }

    async validarMensagemDeErroPasswordVazio() {
        const mensagemDeErro = this.page.locator('[data-test="error"]');
        await expect(mensagemDeErro).toHaveText('Epic sadface: Password is required');
    }

    async validarMensagemDeErroUsuarioBloqueado() {
        const mensagemDeErro = this.page.locator('[data-test="error"]');
        await expect(mensagemDeErro).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    }

}