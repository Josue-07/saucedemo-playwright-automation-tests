import { test } from '@playwright/test';
import { LoginPage } from '../../support/pages/login.page';
import { LoginFormModel } from '../../support/fixtures/login-model/login-form.model';
import dataLogin from '../../support/fixtures/login-model/login.data.json';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.acessarPaginaLogin();
})

test.describe('Página de Login', { tag: '@login' }, () => {

    test('CT001 - Realizar login com credenciais válidas', {
        tag: ['@CT001', '@smoke', '@positivo']
    }, async () => {

        const formLoginSucesso: LoginFormModel = dataLogin.credenciaisValidas;

        await loginPage.realizarLoginComSucesso(formLoginSucesso);
    })

    test('CT002 - Realizar login com credenciais inválidas', {
        tag: ['@CT002', '@regressivo', '@negativo']
    }, async () => {

        const formLoginInvalido: LoginFormModel = dataLogin.credenciaisInvalidas;

        await loginPage.preencherFormularioDeLogin(formLoginInvalido);
        await loginPage.validarMensagemDeErroCredenciaisInvalidas();

    })

    test('CT003 - Realizar login com username vazio', {
        tag: ['@CT003', '@regressivo', '@negativo']
    }, async () => {
        const formLoginUsernameVazio: LoginFormModel = dataLogin.usernameVazio;

        await loginPage.preencherFormularioDeLogin(formLoginUsernameVazio);
        await loginPage.validarMensagemDeErroUsernameVazio();
    })

    test('CT004 - Realizar login com password vazio', {
        tag: ['@CT004', '@regressivo', '@negativo']
    }, async () => {
        const formLoginPasswordVazio: LoginFormModel = dataLogin.passwordVazio;

        await loginPage.preencherFormularioDeLogin(formLoginPasswordVazio);
        await loginPage.validarMensagemDeErroPasswordVazio();
    })

    test('CT005 - Realizar login com usuário bloqueado', {
        tag: ['@CT005', '@regressivo', '@negativo']
    }, async () => {
        const formLoginUsuarioBloqueado: LoginFormModel = dataLogin.usuarioSemAcesso;

        await loginPage.preencherFormularioDeLogin(formLoginUsuarioBloqueado);
        await loginPage.validarMensagemDeErroUsuarioBloqueado();
    })

})