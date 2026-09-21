import { Page, expect } from "@playwright/test";
import { LoginFormModel } from "../fixtures/login-model/login-form.model";
import { loginSelectors } from "../elements/login.elements";

export class LoginPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async acessarPaginaLogin() {
        await this.page.goto('/');
    }

    async preencherFormularioDeLogin(formLogin: LoginFormModel) {
        await this.page.fill(loginSelectors.inputUsername, formLogin.username);
        await this.page.fill(loginSelectors.inputPassword, formLogin.password);
        await this.page.click(loginSelectors.buttonLogin);
    }

    async realizarLoginComSucesso(formLogin: LoginFormModel = { username: 'standard_user', password: 'secret_sauce' }) {
        await this.preencherFormularioDeLogin(formLogin);
        await expect(this.page).toHaveURL('/inventory.html');
    }

    async validarMensagemDeErroCredenciaisInvalidas() {
        await this.validarMensagemDeErroPageLogin('Epic sadface: Username and password do not match any user in this service')
    }

    async validarMensagemDeErroUsernameVazio() {
        await this.validarMensagemDeErroPageLogin('Epic sadface: Username is required')
    }

    async validarMensagemDeErroPasswordVazio() {
        await this.validarMensagemDeErroPageLogin('Epic sadface: Password is required')
    }

    async validarMensagemDeErroUsuarioBloqueado() {
        await this.validarMensagemDeErroPageLogin('Epic sadface: Sorry, this user has been locked out.')
    }

    private async validarMensagemDeErroPageLogin(mensagemDeErroEsperada: string) {
        const mensagemDeErroRecebida = this.page.locator(loginSelectors.mensagemDeErroElement);
        await expect(mensagemDeErroRecebida).toHaveText(mensagemDeErroEsperada);

    }

}